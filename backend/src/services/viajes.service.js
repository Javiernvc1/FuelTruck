"use strict";
const { handleError } = require("../utils/errorHandler");
const Viaje = require('../models/viajes.model.js');

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
        const { fecha, tipo_carga, distancia, combustible_inicio, combustible_final, empresaId, userId, camionId } = viaje;

        await Viaje.create({
            fecha,
            tipo_carga,
            distancia,
            combustible_inicio,
            combustible_final,
            empresaId,
            userId,
            camionId
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

module.exports = {
    getViajes,
    createViaje,
    getViajeById,
    updateViaje,
    deleteViaje
};