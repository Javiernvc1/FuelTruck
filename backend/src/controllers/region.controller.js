"use strict"

const { handleError } = require("../utils/errorHandler");
const RegionService = require('../services/region.service');
const { respondSuccess, respondError } = require("../utils/resHandler");

async function getRegiones(req, res) {
    try {
        const [regiones, errorRegiones] = await RegionService.getRegiones();
        if (errorRegiones) return respondError(req, res, 404, errorRegiones);

        regiones.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, regiones);
    } catch (error) {
        handleError(error, "region.controller -> getRegiones");
        respondError(req, res, 500, error.message);
    }
}

async function createRegion(req, res) {
    try {
        const { body } = req;
        const [newRegion, errorRegion] = await RegionService.createRegion(body);

        if (errorRegion) return respondError(req, res, 400, errorRegion);
        if (!newRegion) {
            return respondError(req, res, 400, "No se creo la region");
        }

        respondSuccess(req, res, 201, "Region creada exitosamente");
    } catch (error) {
        handleError(error, "region.controller -> createRegion");
        respondError(req, res, 500, "No se creo la region");
    }
}

async function getRegionById(req, res) {
    try {
        const { params } = req;
        const [region, errorRegion] = await RegionService.getRegionById(params.id);
        if (errorRegion) return respondError(req, res, 404, errorRegion);

        respondSuccess(req, res, 200, region);
    } catch (error) {
        handleError(error, "region.controller -> getRegionById");
        respondError(req, res, 500, error.message);
    }
}

async function updateRegion(req, res) {
    try {
        const { params, body } = req;
        const [region, errorRegion] = await RegionService.updateRegion(params.id, body);
        if (errorRegion) return respondError(req, res, 404, errorRegion);

        respondSuccess(req, res, 200, "Region actualizada exitosamente");
    } catch (error) {
        handleError(error, "region.controller -> updateRegion");
        respondError(req, res, 500, error.message);
    }
}

async function deleteRegion(req, res) {
    try {
        const { params } = req;
        const [region, errorRegion] = await RegionService.deleteRegion(params.id);
        if (errorRegion) return respondError(req, res, 404, errorRegion);

        respondSuccess(req, res, 200, "Region eliminada exitosamente");
    } catch (error) {
        handleError(error, "region.controller -> deleteRegion");
        respondError(req, res, 500, error.message);
    }
}

module.exports = {
    getRegiones,
    createRegion,
    getRegionById,
    updateRegion,
    deleteRegion
};