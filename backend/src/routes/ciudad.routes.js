const express = require('express');
const router = express.Router();
const ciudadController = require('../controllers/ciudad.controller.js');

const authenticationMiddleware = require('../middlewares/authentication.middleware.js');
const authorizationMiddleware = require('../middlewares/authorization.middleware.js');

router.use(authenticationMiddleware);

router.get('/', authorizationMiddleware.isAdmin, ciudadController.getCiudades);
router.post('/', authorizationMiddleware.isAdmin, ciudadController.createCiudad);
router.get('/:id', authorizationMiddleware.isAdmin, ciudadController.getCiudadById);
router.put('/:id', authorizationMiddleware.isAdmin, ciudadController.updateCiudad);
router.delete('/:id', authorizationMiddleware.isAdmin, ciudadController.deleteCiudad);

module.exports = router;
