"use strict";
const User = require("../models/user.model");
const Role = require("../models/role.model");
const { respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

async function isAdmin(req, res, next) {
  try {
    const user = await User.findOne({ 
      where: { email: req.email },
    });

    if (!user) {
      return respondError(
        req,
        res,
        401,
        "Usuario no encontrado",
      );
    }

    const roles = [user.roleId];

    if (roles.includes("admin")) {
      next();
      return;
    }

    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de administrador para realizar esta acción",
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isAdmin");
  }
}

module.exports = {
  isAdmin,
};