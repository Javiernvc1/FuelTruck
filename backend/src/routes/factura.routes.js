const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/factura.controller.js');

const authenticationMiddleware = require('../middlewares/authentication.middleware.js');
const authorizationMiddleware = require('../middlewares/authorization.middleware.js');

router.use(authenticationMiddleware);

router.get('/',  facturaController.getFacturas);
router.post('/',  facturaController.createFactura);
router.get('/litros', facturaController.getLitrosAll);
router.get('/:id', facturaController.getFacturaById);
router.put('/:id', facturaController.updateFactura);
router.delete('/:id', facturaController.deleteFactura);

module.exports = router;