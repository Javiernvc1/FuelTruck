const express = require('express');
const router = express.Router();
const tipocargaController = require('../controllers/tipocarga.controller.js');

const authenticationMiddleware = require('../middlewares/authentication.middleware.js');
const authorizationMiddleware = require('../middlewares/authorization.middleware.js');

router.use(authenticationMiddleware);

router.get('/', authorizationMiddleware.isAdmin, tipocargaController.getTiposCarga);
router.post('/', authorizationMiddleware.isAdmin, tipocargaController.createTipoCarga);
router.get('/:id', authorizationMiddleware.isAdmin, tipocargaController.getTipoCargaById);
router.put('/:id', authorizationMiddleware.isAdmin, tipocargaController.updateTipoCarga);
router.delete('/:id', authorizationMiddleware.isAdmin, tipocargaController.deleteTipoCarga);

module.exports = router;