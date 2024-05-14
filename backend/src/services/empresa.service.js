"use strict";
const { handleError } = require("../utils/errorHandler");
const Empresa = require('../models/Empresa.model.js');

async function getEmpresas() {
    try {
        const empresas = await Empresa.findAll();

        if (!empresas) return [null, "No hay empresas"];

        return [empresas, null];
    } catch (error) {
        handleError(error, "empresa.service -> getEmpresas");
    }
}

async function createEmpresa(empresa) {
    try {
        const { nombre_empresa, direccion, telefono, email } = empresa;

        await Empresa.create({
            nombre_empresa,
            direccion,
            telefono,
            email
        });

        return [null, "Empresa creada exitosamente"];
    } catch (error) {
        handleError(error, "empresa.service -> createEmpresa");
    }
}

async function getEmpresaById(id) {
    try {
        const empresa = await Empresa.findByPk(id);

        if (!empresa) return [null, "La empresa no existe"];

        return [empresa, null];
    } catch (error) {
        handleError(error, "empresa.service -> getEmpresaById");
    }
}

async function updateEmpresa(id, empresa) {
    try {
        const { nombre_empresa, direccion, telefono, email } = empresa;

        const empresaFound = await Empresa.findByPk(id);
        if (!empresaFound) return [null, "La empresa no existe"];

        await Empresa.update({
            nombre_empresa,
            direccion,
            telefono,
            email
        }, {
            where: { id_empresa: id }
        });

        return [null, "Empresa actualizada exitosamente"];
    } catch (error) {
        handleError(error, "empresa.service -> updateEmpresa");
    }
}

async function deleteEmpresa(id) {
    try {
        const empresa = await Empresa.findByPk(id);
        if (!empresa) return [null, "La empresa no existe"];

        await Empresa.destroy({
            where: { id_empresa: id }
        });

        return [null, "Empresa eliminada exitosamente"];
    } catch (error) {
        handleError(error, "empresa.service -> deleteEmpresa");
    }
}

module.exports = {
    getEmpresas,
    createEmpresa,
    getEmpresaById,
    updateEmpresa,
    deleteEmpresa
};