"use strict"

const { handleError } = require("../utils/errorHandler");
const ViajeService = require('../services/viajes.service');
const { respondSuccess, respondError } = require("../utils/resHandler");

async function getViajes(req, res) {
    try {
        const [viajes, errorViajes] = await ViajeService.getViajes();
        if (errorViajes) return respondError(req, res, 404, errorViajes);

        viajes.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, viajes);
    } catch (error) {
        handleError(error, "viaje.controller -> getViajes");
        respondError(req, res, 500, error.message);
    }
}

async function createViaje(req, res) {
    try {
        const { body } = req;
        const [newViaje, errorViaje] = await ViajeService.createViaje(body);

        if (errorViaje) return respondError(req, res, 400, errorViaje);
        if (!newViaje) {
            return respondError(req, res, 400, "No se creo el viaje");
        }

        respondSuccess(req, res, 201, "Viaje creado exitosamente");
    } catch (error) {
        handleError(error, "viaje.controller -> createViaje");
        respondError(req, res, 500, "No se creo el viaje");
    }
}

async function getViajeById(req, res) {
    try {
        const { params } = req;
        const [viaje, errorViaje] = await ViajeService.getViajeById(params.id);
        if (errorViaje) return respondError(req, res, 404, errorViaje);

        respondSuccess(req, res, 200, viaje);
    } catch (error) {
        handleError(error, "viaje.controller -> getViajeById");
        respondError(req, res, 500, error.message);
    }
}

async function updateViaje(req, res) {
    try {
        const { params, body } = req;
        const [viaje, errorViaje] = await ViajeService.updateViaje(params.id, body);
        if (errorViaje) return respondError(req, res, 404, errorViaje);

        respondSuccess(req, res, 200, "Viaje actualizado exitosamente");
    } catch (error) {
        handleError(error, "viaje.controller -> updateViaje");
        respondError(req, res, 500, error.message);
    }
}

async function deleteViaje(req, res) {
    try {
        const { params } = req;
        const [viaje, errorViaje] = await ViajeService.deleteViaje(params.id);
        if (errorViaje) return respondError(req, res, 404, errorViaje);

        respondSuccess(req, res, 200, "Viaje eliminado exitosamente");
    } catch (error) {
        handleError(error, "viaje.controller -> deleteViaje");
        respondError(req, res, 500, error.message);
    }
}

module.exports = {
    getViajes,
    createViaje,
    getViajeById,
    updateViaje,
    deleteViaje
};