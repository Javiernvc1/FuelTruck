"use strict"

const { handleError } = require("../utils/errorHandler");
const EmpresaService = require('../services/empresa.service');
const { respondSuccess, respondError } = require("../utils/resHandler");

async function getEmpresas(req, res) {
    try {
        const [empresas, errorEmpresas] = await EmpresaService.getEmpresas();
        if (errorEmpresas) return respondError(req, res, 404, errorEmpresas);

        empresas.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, empresas);
    } catch (error) {
        handleError(error, "empresa.controller -> getEmpresas");
        respondError(req, res, 500, error.message);
    }
}

async function createEmpresa(req, res) {
    try {
        const { body } = req;
        const [newEmpresa, errorEmpresa] = await EmpresaService.createEmpresa(body);

        if (errorEmpresa) return respondError(req, res, 400, errorEmpresa);
        if (!newEmpresa) {
            return respondError(req, res, 400, "No se creo la empresa");
        }

        respondSuccess(req, res, 201, "Empresa creada exitosamente");
    } catch (error) {
        handleError(error, "empresa.controller -> createEmpresa");
        respondError(req, res, 500, "No se creo la empresa");
    }
}

async function getEmpresaById(req, res) {
    try {
        const { params } = req;
        const [empresa, errorEmpresa] = await EmpresaService.getEmpresaById(params.id);
        if (errorEmpresa) return respondError(req, res, 404, errorEmpresa);

        respondSuccess(req, res, 200, empresa);
    } catch (error) {
        handleError(error, "empresa.controller -> getEmpresaById");
        respondError(req, res, 500, error.message);
    }
}

async function updateEmpresa(req, res) {
    try {
        const { params, body } = req;
        const [empresa, errorEmpresa] = await EmpresaService.updateEmpresa(params.id, body);
        if (errorEmpresa) return respondError(req, res, 404, errorEmpresa);

        respondSuccess(req, res, 200, "Empresa actualizada exitosamente");
    } catch (error) {
        handleError(error, "empresa.controller -> updateEmpresa");
        respondError(req, res, 500, error.message);
    }
}

async function deleteEmpresa(req, res) {
    try {
        const { params } = req;
        const [empresa, errorEmpresa] = await EmpresaService.deleteEmpresa(params.id);
        if (errorEmpresa) return respondError(req, res, 404, errorEmpresa);

        respondSuccess(req, res, 200, "Empresa eliminada exitosamente");
    } catch (error) {
        handleError(error, "empresa.controller -> deleteEmpresa");
        respondError(req, res, 500, error.message);
    }
}

module.exports = {
    getEmpresas,
    createEmpresa,
    getEmpresaById,
    updateEmpresa,
    deleteEmpresa
};