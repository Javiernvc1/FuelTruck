"use strict";
const { handleError } = require("../utils/errorHandler");
const Factura = require('../models/factura.model.js');
const Servicentro = require('../models/servicentro.model.js');
async function getFacturas() {
    try {
        const facturas = await Factura.findAll();
        console.log('facturas: ', facturas);
        if (!facturas || facturas.length === 0) return [0, null];

        return [facturas, null];
    } catch (error) {
        handleError(error, "factura.service -> getFacturas");
    }
}

async function createFactura(factura) {
    try {
        const { monto, fecha, litros, camionId, userId, servicentroId, ubicacion } = factura;
        console.log('factura: ', factura);
        await Factura.create({
            monto,
            fecha,
            litros,
            camionId,
            userId,
            servicentroId,
            ubicacion
        });

        return [null, "Factura creada exitosamente"];
    } catch (error) {
        handleError(error, "factura.service -> createFactura");
    }
}

async function getFacturaById(id) {
    try {
        console.log('id: ', id);
        const factura = await Factura.findByPk(id);

        if (!factura) return [null, "La factura no existe"];

        return [factura, null];
    } catch (error) {
        handleError(error, "factura.service -> getFacturaById");
    }
}

async function updateFactura(id, factura) {
    try {
        const { monto, fecha, camionId, userId, servicentroId, ubicacion } = factura;

        const facturaFound = await Factura.findByPk(id);
        if (!facturaFound) return [null, "La factura no existe"];

        await Factura.update({
            monto,
            fecha,
            litros,
            camionId,
            userId,
            servicentroId,
            ubicacion
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
async function getLitrosAll() {
    try {
        let result = await Factura.sum('litros');
        if (result === null) {
            result = 0;
        }
        
        return [result, null];
    } catch (error) {
        handleError(error, "factura.service -> getLitrosAll");
        return [null, error.message];
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
