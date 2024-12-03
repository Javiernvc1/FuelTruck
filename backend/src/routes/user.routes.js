"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");
const multer = require("multer");
const upload = multer();
/** Controlador de usuarios */
const usuarioController = require("../controllers/user.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);
// Define las rutas para los usuarios
router.get("/", authorizationMiddleware.isAdmin, usuarioController.getUsers);
router.post("/",upload.none(), authorizationMiddleware.isAdmin, usuarioController.createUser);
router.get("/:id", usuarioController.getUserById);
router.get("/rut/:rut", usuarioController.getUserByRut);
router.get("/role/:role", usuarioController.getUserByRole);
router.put(
  "/:id",
  authorizationMiddleware.isAdmin,
  usuarioController.updateUser,
);
router.delete(
  "/:id",
  authorizationMiddleware.isAdmin,
  usuarioController.deleteUser,
);

// Exporta el enrutador
module.exports = router;
