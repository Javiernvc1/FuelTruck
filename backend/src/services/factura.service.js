"use strict";
const { handleError } = require("../utils/errorHandler");
const Factura = require('../models/factura.model.js');

async function getFacturas() {
    try {
        const facturas = await Factura.findAll();

        if (!facturas) return [null, "No hay facturas"];

        return [facturas, null];
    } catch (error) {
        handleError(error, "factura.service -> getFacturas");
    }
}

async function createFactura(factura) {
    try {
        const { monto, fecha, camionId, userId, servicentroId } = factura;

        await Factura.create({
            monto,
            fecha,
            camionId,
            userId,
            servicentroId
        });

        return [null, "Factura creada exitosamente"];
    } catch (error) {
        handleError(error, "factura.service -> createFactura");
    }
}

async function getFacturaById(id) {
    try {
        const factura = await Factura.findByPk(id);

        if (!factura) return [null, "La factura no existe"];

        return [factura, null];
    } catch (error) {
        handleError(error, "factura.service -> getFacturaById");
    }
}

async function updateFactura(id, factura) {
    try {
        const { monto, fecha, camionId, userId, servicentroId } = factura;

        const facturaFound = await Factura.findByPk(id);
        if (!facturaFound) return [null, "La factura no existe"];

        await Factura.update({
            monto,
            fecha,
            camionId,
            userId,
            servicentroId
        }, {
            where: { id_factura: id }
        });

        return [null, "Factura actualizada exitosamente"];
    } catch (error) {
        handleError(error, "factura.service -> updateFactura");
    }
}

async function deleteFactura(id) {
    try {
        const factura = await Factura.findByPk(id);

        if (!factura) return [null, "La factura no existe"];

        await Factura.destroy({
            where: { id_factura: id }
        });

        return [null, "Factura eliminada exitosamente"];
    } catch (error) {
        handleError(error, "factura.service -> deleteFactura");
    }
}

module.exports = {
    getFacturas,
    createFactura,
    getFacturaById,
    updateFactura,
    deleteFactura
};
