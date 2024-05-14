"use strict";
const { handleError } = require("../utils/errorHandler");
const Servicentro = require('../models/Servicentro.model.js');

async function getServicentros() {
    try {
        const servicentros = await Servicentro.findAll();

        if (!servicentros) return [null, "No hay servicentros"];

        return [servicentros, null];
    } catch (error) {
        handleError(error, "servicentro.service -> getServicentros");
    }
}

async function createServicentro(servicentro) {
    try {
        const { nombre_servicentro, valor_combustible } = servicentro;

        await Servicentro.create({
            nombre_servicentro,
            valor_combustible
        });

        return [null, "Servicentro creado exitosamente"];
    } catch (error) {
        handleError(error, "servicentro.service -> createServicentro");
    }
}

async function getServicentroById(id) {
    try {
        const servicentro = await Servicentro.findByPk(id);

        if (!servicentro) return [null, "El servicentro no existe"];

        return [servicentro, null];
    } catch (error) {
        handleError(error, "servicentro.service -> getServicentroById");
    }
}

async function updateServicentro(id, servicentro) {
    try {
        const { nombre_servicentro, valor_combustible } = servicentro;

        await Servicentro.update({
            nombre_servicentro,
            valor_combustible
        }, {
            where: { id_servicentro: id }
        });

        return [null, "Servicentro actualizado exitosamente"];
    } catch (error) {
        handleError(error, "servicentro.service -> updateServicentro");
    }
}

async function deleteServicentro(id) {
    try {
        const servicentroFound = await Servicentro.findByPk(id);
        if (!servicentroFound) return [null, "El servicentro no existe"];

        await Servicentro.destroy({
            where: { id_servicentro: id }
        });

        return [null, "Servicentro eliminado exitosamente"];
    } catch (error) {
        handleError(error, "servicentro.service -> deleteServicentro");
    }
}

module.exports = {
    getServicentros,
    createServicentro,
    getServicentroById,
    updateServicentro,
    deleteServicentro
};