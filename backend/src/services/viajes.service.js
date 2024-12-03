"use strict";
const { handleError } = require("../utils/errorHandler");
const Viaje = require('../models/viajes.model.js');
const nodemailer = require('nodemailer');
const Camion = require('../models/camion.model.js');
const Notificacion = require('../models/notificacion.model.js');
const User = require('../models/user.model.js');
const Empresa = require('../models/empresa.model.js');

async function getViajes() {
    try {
        const viajes = await Viaje.findAll();

        if (!viajes) return [null, "No hay viajes"];

        return [viajes, null];
    } catch (error) {
        handleError(error, "viaje.service -> getViajes");
    }
}



async function createViaje(viaje) {
    try {
        console.log("VIAJE",viaje);
        const { fecha, tipo_carga, distancia, combustible_inicio, combustible_final, empresaId, userId, camionId, odometro_inicio, odometro_final, destino, estado } = viaje;

        // Verificar que los valores de empresaId, userId y camionId existen en las tablas correspondientes
        const empresa = await Empresa.findByPk(empresaId);
        const user = await User.findByPk(userId);
        const camion = await Camion.findByPk(camionId);

        if (!empresa) {
            return [null, `La empresa con ID ${empresaId} no existe`];
        }
        if (!user) {
            return [null, `El usuario con ID ${userId} no existe`];
        }
        if (!camion) {
            return [null, `El camión con ID ${camionId} no existe`];
        }

        await Viaje.create({
            fecha,
            tipo_carga,
            distancia,
            combustible_inicio, // Ya es un string base64
            combustible_final, // Ya es un string base64
            empresaId: empresa.nombre_empresa,
            userId: user.rut,
            camionId: camion.patente,
            odometro_inicio,
            odometro_final,
            destino,
            estado
        });

        return [null, "Viaje creado exitosamente"];
    } catch (error) {
        handleError(error, "viaje.service -> createViaje");
    }
}

async function getViajeById(id) {
    try {
        const viaje = await Viaje.findByPk(id);

        if (!viaje) return [null, "El viaje no existe"];

        return [viaje, null];
    } catch (error) {
        handleError(error, "viaje.service -> getViajeById");
    }
}

async function updateViaje(id, viaje) {
    try {
        const { fecha, tipo_carga, distancia, combustible_inicio, combustible_final, empresaId, userId, camionId } = viaje;

        await Viaje.update({
            fecha,
            tipo_carga,
            distancia,
            combustible_inicio,
            combustible_final,
            empresaId,
            userId,
            camionId
        }, {
            where: { id_viaje: id }
        });

        return [null, "Viaje actualizado exitosamente"];
    } catch (error) {
        handleError(error, "viaje.service -> updateViaje");
    }
}

async function deleteViaje(id) {
    try {
        const viajeFound = await Viaje.findByPk(id);
        if (!viajeFound) return [null, "El viaje no existe"];

        await Viaje.destroy({
            where: { id_viaje: id }
        });

        return [null, "Viaje eliminado exitosamente"];
    } catch (error) {
        handleError(error, "viaje.service -> deleteViaje");
    }
}

async function estimateFuelConsumption(camionId) {
    try {
        const viajes = await Viaje.findAll({ where: { camionId } });
        let totalEstimatedFuelConsumption = 0;

        for (const viaje of viajes) {
            const camion = await Camion.findOne({ where: { patente: camionId } });
            const estimatedFuelConsumption = viaje.distancia * camion.gasto_medio;
            totalEstimatedFuelConsumption += estimatedFuelConsumption;
        }

        const averageEstimatedFuelConsumption = totalEstimatedFuelConsumption / viajes.length;

        return averageEstimatedFuelConsumption;
    } catch (error) {
        handleError(error, "viaje.service -> estimateFuelConsumption");
    }
}

async function estimateFuelConsumptionForSpecificTrip(id_viaje) {
    try {
        const viaje = await Viaje.findByPk(id_viaje);
        if (!viaje) return [null, "El viaje no existe"];

        const camion = await Camion.findOne({ where: { patente: viaje.camionId } });
        if (!camion) return [null, "El camión no existe"];

        const estimatedFuelConsumption = viaje.distancia * camion.gasto_medio;

        return estimatedFuelConsumption;
    } catch (error) {
        handleError(error, "viaje.service -> estimateFuelConsumptionForSpecificTrip");
    }
}


const DISTANCE_TOLERANCE = 10; // Tolerancia de distancia en km

async function checkForIrregularities(id_viaje) {
    try {
        const viaje = await Viaje.findByPk(id_viaje);
        if (!viaje) return [null, "El viaje no existe"];

        const distancia_real = viaje.odometro_final - viaje.odometro_inicio;

        if (distancia_real > viaje.distancia + DISTANCE_TOLERANCE) {

            const mensaje = `El viaje ${id_viaje} ha recorrido una distancia mayor a la fijada originalmente,
            además de exceder la tolerancia de ${DISTANCE_TOLERANCE} km`;
            sendEmailNotification('Irregularidad detectada', mensaje);
            const notificacion = await createNotification(mensaje);
            return notificacion;

            sendEmailNotification('Irregularidad detectada', `El viaje ${id_viaje} ha recorrido una distancia mayor a la fijada originalmente,
            además de exceder la tolerancia de ${DISTANCE_TOLERANCE} km`);

        }
    } catch (error) {
        handleError(error, "viaje.service -> checkForIrregularities");
    }
}



async function sendEmailNotification(subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Utiliza el servicio de Gmail
        auth: {
            user: '', // Tu correo electrónico
            pass: 'nmkf xtcw kkrg jiao' // Tu contraseña
        }
    });

    let mailOptions = {
        from: 'Sistema', // Tu correo electrónico
        to: '', // Correo electrónico del administrador
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}


async function createNotification(mensaje) {
    try {
        const notificacion = await Notificacion.create({ mensaje: mensaje });
        return notificacion;
    } catch (error) {
        handleError(error, "notificacion.service -> createNotification");
    }
}







module.exports = {
    getViajes,
    createViaje,
    getViajeById,
    updateViaje,
    deleteViaje,
    estimateFuelConsumption,
    estimateFuelConsumptionForSpecificTrip,
    checkForIrregularities,
    sendEmailNotification,
    createNotification,
    sendEmailNotification

};