const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresa.controller.js');

const authenticationMiddleware = require('../middlewares/authentication.middleware.js');
const authorizationMiddleware = require('../middlewares/authorization.middleware.js');

router.use(authenticationMiddleware);

router.get('/', authorizationMiddleware.isAdmin, empresaController.getEmpresas);
router.post('/', authorizationMiddleware.isAdmin, empresaController.createEmpresa);
router.get('/:id', authorizationMiddleware.isAdmin, empresaController.getEmpresaById);
router.put('/:id', authorizationMiddleware.isAdmin, empresaController.updateEmpresa);
router.delete('/:id', authorizationMiddleware.isAdmin, empresaController.deleteEmpresa);

module.exports = router;