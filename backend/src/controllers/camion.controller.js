"use strict"

const { handleError } = require("../utils/errorHandler");
const CamionService = require('../services/camion.service');
const {respondSuccess, respondError} = require('../utils/resHandler');

async function getCamiones(req, res) {
    try {
        const [camiones, errorCamiones] = await CamionService.getCamiones();
        if (errorCamiones) return respondError(req, res, 404, errorCamiones);

        camiones.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, camiones);
    } catch (error) {
        handleError(error, "camion.controller -> getCamiones");
        respondError(req, res, 500, error.message);
    }
}

async function createCamion(req, res) {
    try {
        const { body } = req;
        if (!body || !body.patente || !body.marca || !body.modelo || !body.userId) {
            return respondError(req, res, 400, "Datos de entrada inválidos");
        }

        const [newCamion, errorCamion] = await CamionService.createCamion(body);

        if (errorCamion) return respondError(req, res, 400, errorCamion);
        if (!newCamion) {
            return respondError(req, res, 400, "No se creo el camion");
        }

        respondSuccess(req, res, 201, newCamion);
    } catch (error) {
        handleError(error, "camion.controller -> createCamion");
        respondError(req, res, 500, "No se creo el camion");
    }
}

async function getCamionById(req, res) {
    try {
        const { params } = req;
        if (!params || !params.id) {
            return respondError(req, res, 400, "Datos de entrada inválidos");
        }

        const [camion, errorCamion] = await CamionService.getCamionById(params.id);
        if (errorCamion) return respondError(req, res, 404, errorCamion);

        respondSuccess(req, res, 200, camion);
    } catch (error) {
        handleError(error, "camion.controller -> getCamionById");
        respondError(req, res, 500, error.message);
    }
}

async function updateCamion(req, res) {
    try {
        const { params, body } = req;
        if (!params || !params.id || !body || !body.marca || !body.modelo || !body.userId) {
            return respondError(req, res, 400, "Datos de entrada inválidos");
        }

        const [camion, errorCamion] = await CamionService.updateCamion(params.id, body);
        if (errorCamion) return respondError(req, res, 404, errorCamion);

        respondSuccess(req, res, 200, camion);
    } catch (error) {
        handleError(error, "camion.controller -> updateCamion");
        respondError(req, res, 500, error.message);
    }
}

async function deleteCamion(req, res) {
    try {
        const { params } = req;
        if (!params || !params.id) {
            return respondError(req, res, 400, "Datos de entrada inválidos");
        }

        const [camion, errorCamion] = await CamionService.deleteCamion(params.id);
        if (errorCamion) return respondError(req, res, 404, errorCamion);

        respondSuccess(req, res, 200, camion);
    } catch (error) {
        handleError(error, "camion.controller -> deleteCamion");
        respondError(req, res, 500, error.message);
    }
}

module.exports = {
    getCamiones,
    createCamion,
    getCamionById,
    updateCamion,
    deleteCamion
};