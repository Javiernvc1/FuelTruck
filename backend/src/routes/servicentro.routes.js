const express = require('express');
const router = express.Router();
const servicentroController = require('../controllers/servicentro.controller.js');

const authenticationMiddleware = require('../middlewares/authentication.middleware.js');
const authorizationMiddleware = require('../middlewares/authorization.middleware.js');

router.use(authenticationMiddleware);

router.get('/', authorizationMiddleware.isAdmin, servicentroController.getServicentros);
router.post('/', authorizationMiddleware.isAdmin, servicentroController.createServicentro);
router.get('/:id', authorizationMiddleware.isAdmin, servicentroController.getServicentroById);
router.put('/:id', authorizationMiddleware.isAdmin, servicentroController.updateServicentro);
router.delete('/:id', authorizationMiddleware.isAdmin, servicentroController.deleteServicentro);

module.exports = router;