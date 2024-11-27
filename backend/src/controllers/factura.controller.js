"use strict"

const { handleError } = require("../utils/errorHandler");
const FacturaService = require('../services/factura.service');
const { respondSuccess, respondError } = require("../utils/resHandler");

async function getFacturas(req, res) {
    try {
        const [facturas, errorFacturas] = await FacturaService.getFacturas();
        if (errorFacturas) return respondError(req, res, 404, errorFacturas);

        facturas.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, facturas);
    } catch (error) {
        handleError(error, "factura.controller -> getFacturas");
        respondError(req, res, 500, error.message);
    }
}

async function createFactura(req, res) {
    try {
        const { body } = req;
        const [newFactura, errorFactura] = await FacturaService.createFactura(body);

        if (errorFactura) return respondError(req, res, 400, errorFactura);
        if (!newFactura) {
            return respondError(req, res, 400, "No se creo la factura");
        }

        respondSuccess(req, res, 201, "Factura creada exitosamente");
    } catch (error) {
        handleError(error, "factura.controller -> createFactura");
        respondError(req, res, 500, "No se creo la factura");
    }
}

async function getFacturaById(req, res) {
    try {
        const { params } = req;
        console.log('params: ', params);
        const [factura, errorFactura] = await FacturaService.getFacturaById(params.id);
        if (errorFactura) return respondError(req, res, 404, errorFactura);

        respondSuccess(req, res, 200, factura);
    } catch (error) {
        handleError(error, "factura.controller -> getFacturaById");
        respondError(req, res, 500, error.message);
    }
}

async function updateFactura(req, res) {
    try {
        const { params, body } = req;
        const [factura, errorFactura] = await FacturaService.updateFactura(params.id, body);
        if (errorFactura) return respondError(req, res, 404, errorFactura);

        respondSuccess(req, res, 200, "Factura actualizada exitosamente");
    } catch (error) {
        handleError(error, "factura.controller -> updateFactura");
        respondError(req, res, 500, error.message);
    }
}

async function deleteFactura(req, res) {
    try {
        const { params } = req;
        const [factura, errorFactura] = await FacturaService.deleteFactura(params.id);
        if (errorFactura) return respondError(req, res, 404, errorFactura);

        respondSuccess(req, res, 200, "Factura eliminada exitosamente");
    } catch (error) {
        handleError(error, "factura.controller -> deleteFactura");
        respondError(req, res, 500, error.message);
    }
}

async function getLitrosAll (req, res) {
    try {
        const [litros, errorLitros] = await FacturaService.getLitrosAll();
        if (errorLitros) return respondError(req, res, 404, errorLitros);

        litros.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, litros);
    } catch (error) {
        handleError(error, "factura.controller -> getLitrosAll");
        respondError(req, res, 500, error.message);
    }
}


module.exports = {
    getFacturas,
    createFactura,
    getFacturaById,
    updateFactura,
    deleteFactura,
    getLitrosAll
};