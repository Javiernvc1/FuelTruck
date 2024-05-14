"use strict"

const { handleError } = require("../utils/errorHandler");
const CiudadService = require('../services/ciudad.service');
const {respondSuccess, respondError} = require('../utils/resHandler');

async function getCiudades(req, res) {
    try {
        const [ciudades, errorCiudades] = await CiudadService.getCiudades();
        if (errorCiudades) return respondError(req, res, 404, errorCiudades);

        ciudades.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, ciudades);
    } catch (error) {
        handleError(error, "ciudad.controller -> getCiudades");
        respondError(req, res, 500, error.message);
    }
}

async function createCiudad(req, res) {
    try {
        const { body } = req;
        if (!body || !body.nombre || !body.regionId) {
            return respondError(req, res, 400, "Datos de entrada inválidos");
        }

        const [newCiudad, errorCiudad] = await CiudadService.createCiudad(body);

        if (errorCiudad) return respondError(req, res, 400, errorCiudad);
        if (!newCiudad) {
            return respondError(req, res, 400, "No se creo la ciudad");
        }

        respondSuccess(req, res, 201, newCiudad);
    } catch (error) {
        handleError(error, "ciudad.controller -> createCiudad");
        respondError(req, res, 500, "No se creo la ciudad");
    }
}

async function getCiudadById(req, res) {
    try {
        const { params } = req;
        if (!params || !params.id) {
            return respondError(req, res, 400, "Datos de entrada inválidos");
        }

        const [ciudad, errorCiudad] = await CiudadService.getCiudadById(params.id);
        if (errorCiudad) return respondError(req, res, 404, errorCiudad);

        respondSuccess(req, res, 200, ciudad);
    } catch (error) {
        handleError(error, "ciudad.controller -> getCiudadById");
        respondError(req, res, 500, error.message);
    }
}

async function updateCiudad(req, res) {
    try {
        const { params, body } = req;
        if (!params || !params.id || !body || !body.nombre || !body.regionId) {
            return respondError(req, res, 400, "Datos de entrada inválidos");
        }

        const [ciudad, errorCiudad] = await CiudadService.updateCiudad(params.id, body);
        if (errorCiudad) return respondError(req, res, 404, errorCiudad);

        respondSuccess(req, res, 200, ciudad);
    } catch (error) {
        handleError(error, "ciudad.controller -> updateCiudad");
        respondError(req, res, 500, error.message);
    }
}

async function deleteCiudad(req, res) {
    try {
        const { params } = req;
        if (!params || !params.id) {
            return respondError(req, res, 400, "Datos de entrada inválidos");
        }

        const [ciudad, errorCiudad] = await CiudadService.deleteCiudad(params.id);
        if (errorCiudad) return respondError(req, res, 404, errorCiudad);

        respondSuccess(req, res, 200, ciudad);
    } catch (error) {
        handleError(error, "ciudad.controller -> deleteCiudad");
        respondError(req, res, 500, error.message);
    }
}

module.exports = {
    getCiudades,
    createCiudad,
    getCiudadById,
    updateCiudad,
    deleteCiudad
};