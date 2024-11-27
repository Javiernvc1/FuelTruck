const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/factura.controller.js');

const authenticationMiddleware = require('../middlewares/authentication.middleware.js');
const authorizationMiddleware = require('../middlewares/authorization.middleware.js');

router.use(authenticationMiddleware);

router.get('/', authorizationMiddleware.isAdmin, facturaController.getFacturas);
router.post('/', authorizationMiddleware.isAdmin, facturaController.createFactura);
router.get('/litros', authorizationMiddleware.isAdmin, facturaController.getLitrosAll);
router.get('/:id', authorizationMiddleware.isAdmin, facturaController.getFacturaById);
router.put('/:id', authorizationMiddleware.isAdmin, facturaController.updateFactura);
router.delete('/:id', authorizationMiddleware.isAdmin, facturaController.deleteFactura);

module.exports = router;