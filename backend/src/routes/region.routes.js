const express = require('express');
const router = express.Router();
const regionController = require('../controllers/region.controller.js');

const authenticationMiddleware = require('../middlewares/authentication.middleware.js');
const authorizationMiddleware = require('../middlewares/authorization.middleware.js');

router.use(authenticationMiddleware);

router.get('/', authorizationMiddleware.isAdmin, regionController.getRegiones);
router.post('/', authorizationMiddleware.isAdmin, regionController.createRegion);
router.get('/:id', authorizationMiddleware.isAdmin, regionController.getRegionById);
router.put('/:id', authorizationMiddleware.isAdmin, regionController.updateRegion);
router.delete('/:id', authorizationMiddleware.isAdmin, regionController.deleteRegion);

module.exports = router;

