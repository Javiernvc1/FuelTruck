"use strict";
const { handleError } = require("../utils/errorHandler");
const Ciudad = require('../models/Ciudad.model.js');

async function getCiudades() {
    try {
        const ciudades = await Ciudad.findAll();

        if (!ciudades) return [null, "No hay ciudades"];

        return [ciudades, null];
    } catch (error) {
        handleError(error, "ciudad.service -> getCiudades");
    }
}

async function createCiudad(ciudad) {
    try {
        const { nombre, regionId } = ciudad;

        await Ciudad.create({
            nombre,
            regionId
        });

        return [null, "Ciudad creada exitosamente"];
    } catch (error) {
        handleError(error, "ciudad.service -> createCiudad");
    }
}

async function getCiudadById(id) {
    try {
        const ciudad = await Ciudad.findByPk(id);

        if (!ciudad) return [null, "La ciudad no existe"];

        return [ciudad, null];
    } catch (error) {
        handleError(error, "ciudad.service -> getCiudadById");
    }
}

async function updateCiudad(id, ciudad) {
    try {
        const { nombre, regionId } = ciudad;

        const ciudadFound = await Ciudad.findByPk(id);
        if (!ciudadFound) return [null, "La ciudad no existe"];

        await Ciudad.update({
            nombre,
            regionId
        }, {
            where: { id_ciudad: id }
        });

        return [null, "Ciudad actualizada exitosamente"];
    } catch (error) {
        handleError(error, "ciudad.service -> updateCiudad");
    }
}

async function deleteCiudad(id) {
    try {
        const ciudad = await Ciudad.findByPk(id);

        if (!ciudad) return [null, "La ciudad no existe"];

        await Ciudad.destroy({
            where: { id_ciudad: id }
        });

        return [null, "Ciudad eliminada exitosamente"];
    } catch (error) {
        handleError(error, "ciudad.service -> deleteCiudad");
    }
}

module.exports = {
    getCiudades,
    createCiudad,
    getCiudadById,
    updateCiudad,
    deleteCiudad
};