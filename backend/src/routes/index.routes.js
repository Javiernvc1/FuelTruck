"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

const camionRoutes = require("./camion.routes.js");
const ciudadRoutes = require("./ciudad.routes.js");
const viajeRoutes = require("./viajes.routes.js");
const tipocargaRoutes = require("./tipocarga.routes.js");
const empresaRoutes = require("./empresa.routes.js");
const facturaRoutes = require("./factura.routes.js");
const regionRoutes = require("./region.routes.js");
const servicentroRoutes = require("./servicentro.routes.js");
/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

router.use("/camiones", authenticationMiddleware, camionRoutes);

router.use("/ciudades", authenticationMiddleware, ciudadRoutes);

router.use("/viajes", authenticationMiddleware, viajeRoutes);

router.use("/tipocargas", authenticationMiddleware, tipocargaRoutes);

router.use("/empresas", authenticationMiddleware, empresaRoutes);

router.use("/facturas", authenticationMiddleware, facturaRoutes);

router.use("/regiones", authenticationMiddleware, regionRoutes);

router.use("/servicentros", authenticationMiddleware, servicentroRoutes);

// Exporta el enrutador
module.exports = router;
