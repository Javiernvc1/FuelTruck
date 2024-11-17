"use strict";
const { handleError } = require("../utils/errorHandler");
const Camion = require('../models/camion.model.js');
const User = require('../models/user.model.js');

async function getCamiones() {
    try {
        const camiones = await Camion.findAll({});

        if (!camiones) return [null, "No hay camiones"];

        return [camiones, null];
    } catch (error) {
        handleError(error, "camion.service -> getCamiones");
    }
}

async function createCamion(camion) {
    try {
        const { patente, marca, modelo, gasto_medio, userId } = camion;

        const userFound = await User.findOne({ where: { rut:userId } } );
        if (!userFound) return [null, "El usuario no existe"];

        await Camion.create({
            patente,
            marca,
            modelo,
            gasto_medio,
            userId
        });

        return [null, "Camión creado exitosamente"];
    } catch (error) {
        handleError(error, "camion.service -> createCamion");
    }
}

async function getCamionById(patente) {
    try {
        const camion = await Camion.findByPk(patente, {});

        if (!camion) return [null, "El camión no existe"];

        return [camion, null];
    } catch (error) {
        handleError(error, "camion.service -> getCamionById");
    }
}

async function updateCamion(patente, camion) {
    try {
        const { marca, modelo, userId } = camion;

        const camionFound = await Camion.findByPk(patente);
        if (!camionFound) return [null, "El camión no existe"];

        const userFound = await User.findByPk(userId);
        if (!userFound) return [null, "El usuario no existe"];

        await camionFound.update({
            marca,
            modelo,
            userId
        });

        return [null, "Camión actualizado exitosamente"];
    } catch (error) {
        handleError(error, "camion.service -> updateCamion");
    }
}

async function deleteCamion(patente) {
    try {
        const camionFound = await Camion.findByPk(patente);
        if (!camionFound) return [null, "El camión no existe"];

        await camionFound.destroy();

        return [null, "Camión eliminado exitosamente"];
    } catch (error) {
        handleError(error, "camion.service -> deleteCamion");
    }
}

module.exports = {
    getCamiones,
    createCamion,
    getCamionById,
    updateCamion,
    deleteCamion
};