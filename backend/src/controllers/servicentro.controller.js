"use strict"

const { handleError } = require("../utils/errorHandler");
const ServicentroService = require('../services/servicentro.service');
const { respondSuccess, respondError } = require("../utils/resHandler");

async function getServicentros(req, res) {
    try {
        const [servicentros, errorServicentros] = await ServicentroService.getServicentros();
        if (errorServicentros) return respondError(req, res, 404, errorServicentros);

        servicentros.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, servicentros);
    } catch (error) {
        handleError(error, "servicentro.controller -> getServicentros");
        respondError(req, res, 500, error.message);
    }
}

async function createServicentro(req, res) {
    try {
        const { body } = req;
        const [newServicentro, errorServicentro] = await ServicentroService.createServicentro(body);

        if (errorServicentro) return respondError(req, res, 400, errorServicentro);
        if (!newServicentro) {
            return respondError(req, res, 400, "No se creo el servicentro");
        }

        respondSuccess(req, res, 201, "Servicentro creado exitosamente");
    } catch (error) {
        handleError(error, "servicentro.controller -> createServicentro");
        respondError(req, res, 500, "No se creo el servicentro");
    }
}

async function getServicentroById(req, res) {
    try {
        const { params } = req;
        const [servicentro, errorServicentro] = await ServicentroService.getServicentroById(params.id);
        if (errorServicentro) return respondError(req, res, 404, errorServicentro);

        respondSuccess(req, res, 200, servicentro);
    } catch (error) {
        handleError(error, "servicentro.controller -> getServicentroById");
        respondError(req, res, 500, error.message);
    }
}

async function updateServicentro(req, res) {
    try {
        const { params, body } = req;
        const [servicentro, errorServicentro] = await ServicentroService.updateServicentro(params.id, body);
        if (errorServicentro) return respondError(req, res, 404, errorServicentro);

        respondSuccess(req, res, 200, "Servicentro actualizado exitosamente");
    } catch (error) {
        handleError(error, "servicentro.controller -> updateServicentro");
        respondError(req, res, 500, error.message);
    }
}

async function deleteServicentro(req, res) {
    try {
        const { params } = req;
        const [servicentro, errorServicentro] = await ServicentroService.deleteServicentro(params.id);
        if (errorServicentro) return respondError(req, res, 404, errorServicentro);

        respondSuccess(req, res, 200, "Servicentro eliminado exitosamente");
    } catch (error) {
        handleError(error, "servicentro.controller -> deleteServicentro");
        respondError(req, res, 500, error.message);
    }
}

module.exports = {
    getServicentros,
    createServicentro,
    getServicentroById,
    updateServicentro,
    deleteServicentro
};