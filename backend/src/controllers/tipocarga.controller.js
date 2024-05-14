"use strict"

const { handleError } = require("../utils/errorHandler");
const TipoCargaService = require('../services/tipocarga.service');
const { respondSuccess, respondError } = require("../utils/resHandler");

async function getTiposCarga(req, res) {
    try {
        const [tiposCarga, errorTiposCarga] = await TipoCargaService.getTiposCarga();
        if (errorTiposCarga) return respondError(req, res, 404, errorTiposCarga);

        tiposCarga.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, tiposCarga);
    } catch (error) {
        handleError(error, "tipocarga.controller -> getTiposCarga");
        respondError(req, res, 500, error.message);
    }
}

async function createTipoCarga(req, res) {
    try {
        const { body } = req;
        const [newTipoCarga, errorTipoCarga] = await TipoCargaService.createTipoCarga(body);

        if (errorTipoCarga) return respondError(req, res, 400, errorTipoCarga);
        if (!newTipoCarga) {
            return respondError(req, res, 400, "No se creo el tipo de carga");
        }

        respondSuccess(req, res, 201, "Tipo de carga creado exitosamente");
    } catch (error) {
        handleError(error, "tipocarga.controller -> createTipoCarga");
        respondError(req, res, 500, "No se creo el tipo de carga");
    }
}

async function getTipoCargaById(req, res) {
    try {
        const { params } = req;
        const [tipoCarga, errorTipoCarga] = await TipoCargaService.getTipoCargaById(params.id);
        if (errorTipoCarga) return respondError(req, res, 404, errorTipoCarga);

        respondSuccess(req, res, 200, tipoCarga);
    } catch (error) {
        handleError(error, "tipocarga.controller -> getTipoCargaById");
        respondError(req, res, 500, error.message);
    }
}

async function updateTipoCarga(req, res) {
    try {
        const { params, body } = req;
        const [tipoCarga, errorTipoCarga] = await TipoCargaService.updateTipoCarga(params.id, body);
        if (errorTipoCarga) return respondError(req, res, 404, errorTipoCarga);

        respondSuccess(req, res, 200, "Tipo de carga actualizado exitosamente");
    } catch (error) {
        handleError(error, "tipocarga.controller -> updateTipoCarga");
        respondError(req, res, 500, error.message);
    }
}

async function deleteTipoCarga(req, res) {
    try {
        const { params } = req;
        const [tipoCarga, errorTipoCarga] = await TipoCargaService.deleteTipoCarga(params.id);
        if (errorTipoCarga) return respondError(req, res, 404, errorTipoCarga);

        respondSuccess(req, res, 200, "Tipo de carga eliminado exitosamente");
    } catch (error) {
        handleError(error, "tipocarga.controller -> deleteTipoCarga");
        respondError(req, res, 500, error.message);
    }
}

module.exports = {
    getTiposCarga,
    createTipoCarga,
    getTipoCargaById,
    updateTipoCarga,
    deleteTipoCarga
};