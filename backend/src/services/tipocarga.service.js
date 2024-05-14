"use strict";
const { handleError } = require("../utils/errorHandler");
const TipoCarga = require('../models/tipocarga.model.js');

async function getTiposCarga() {
    try {
        const tiposCarga = await TipoCarga.findAll();

        if (!tiposCarga) return [null, "No hay tipos de carga"];

        return [tiposCarga, null];
    } catch (error) {
        handleError(error, "tipocarga.service -> getTiposCarga");
    }
}

async function createTipoCarga(tipoCarga) {
    try {
        const { nombre, viajeId } = tipoCarga;

        await TipoCarga.create({
            nombre,
            viajeId
        });

        return [null, "Tipo de carga creado exitosamente"];
    } catch (error) {
        handleError(error, "tipocarga.service -> createTipoCarga");
    }
}

async function getTipoCargaById(id) {
    try {
        const tipoCarga = await TipoCarga.findByPk(id);

        if (!tipoCarga) return [null, "El tipo de carga no existe"];

        return [tipoCarga, null];
    } catch (error) {
        handleError(error, "tipocarga.service -> getTipoCargaById");
    }
}

async function updateTipoCarga(id, tipoCarga) {
    try {
        const { nombre, viajeId } = tipoCarga;

        await TipoCarga.update({
            nombre,
            viajeId
        }, {
            where: { id_tipo: id }
        });

        return [null, "Tipo de carga actualizado exitosamente"];
    } catch (error) {
        handleError(error, "tipocarga.service -> updateTipoCarga");
    }
}

async function deleteTipoCarga(id) {
    try {
        const tipoCargaFound = await TipoCarga.findByPk(id);
        if (!tipoCargaFound) return [null, "El tipo de carga no existe"];

        await TipoCarga.destroy({
            where: { id_tipo: id }
        });

        return [null, "Tipo de carga eliminado exitosamente"];
    } catch (error) {
        handleError(error, "tipocarga.service -> deleteTipoCarga");
    }
}

module.exports = {
    getTiposCarga,
    createTipoCarga,
    getTipoCargaById,
    updateTipoCarga,
    deleteTipoCarga
};