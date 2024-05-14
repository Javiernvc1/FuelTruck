const express = require("express");
const router = express.Router();
const camionController = require("../controllers/camion.controller.js");

const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

router.use(authenticationMiddleware);

router.get("/", authorizationMiddleware.isAdmin, camionController.getCamiones);
router.post("/", authorizationMiddleware.isAdmin,camionController.createCamion);
router.get("/:id", authorizationMiddleware.isAdmin, camionController.getCamionById);
router.put("/:id", authorizationMiddleware.isAdmin, camionController.updateCamion);
router.delete("/:id", authorizationMiddleware.isAdmin, camionController.deleteCamion);

module.exports = router;