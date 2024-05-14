const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viajes.controller.js');

const authenticationMiddleware = require('../middlewares/authentication.middleware.js');
const authorizationMiddleware = require('../middlewares/authorization.middleware.js');

router.use(authenticationMiddleware);

router.get('/', authorizationMiddleware.isAdmin, viajeController.getViajes);
router.post('/', authorizationMiddleware.isAdmin, viajeController.createViaje);
router.get('/:id', authorizationMiddleware.isAdmin, viajeController.getViajeById);
router.put('/:id', authorizationMiddleware.isAdmin, viajeController.updateViaje);
router.delete('/:id', authorizationMiddleware.isAdmin, viajeController.deleteViaje);

module.exports = router;