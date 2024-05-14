"use strict";
const { handleError } = require("../utils/errorHandler");
const Region = require('../models/region.model.js');

async function getRegiones() {
    try {
        const regiones = await Region.findAll();

        if (!regiones) return [null, "No hay regiones"];

        return [regiones, null];
    } catch (error) {
        handleError(error, "region.service -> getRegiones");
    }
}

async function createRegion(region) {
    try {
        const { nombre } = region;

        await Region.create({
            nombre
        });

        return [null, "Region creada exitosamente"];
    } catch (error) {
        handleError(error, "region.service -> createRegion");
    }
}

async function getRegionById(id) {
    try {
        const region = await Region.findByPk(id);

        if (!region) return [null, "La region no existe"];

        return [region, null];
    } catch (error) {
        handleError(error, "region.service -> getRegionById");
    }
}

async function updateRegion(id, region) {
    try {
        const { nombre } = region;

        await Region.update({
            nombre
        }, {
            where: { id_region: id }
        });

        return [null, "Region actualizada exitosamente"];
    } catch (error) {
        handleError(error, "region.service -> updateRegion");
    }
}

async function deleteRegion(id) {
    try {
        const regionFound = await Region.findByPk(id);
        if (!regionFound) return [null, "La region no existe"];

        await Region.destroy({
            where: { id_region: id }
        });

        return [null, "Region eliminada exitosamente"];
    } catch (error) {
        handleError(error, "region.service -> deleteRegion");
    }
}

module.exports = {
    getRegiones,
    createRegion,
    getRegionById,
    updateRegion,
    deleteRegion
};