const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viajes.controller.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const authenticationMiddleware = require('../middlewares/authentication.middleware.js');
const authorizationMiddleware = require('../middlewares/authorization.middleware.js');

router.use(authenticationMiddleware);

router.get('/',  viajeController.getViajes);
router.post('/', upload.fields([{ name: 'combustible_inicio', maxCount: 1 }, 
            { name: 'combustible_final', maxCount: 1 }]), 
             viajeController.createViaje);
router.get('/:id',  viajeController.getViajeById);
router.put('/:id',  viajeController.updateViaje);
router.delete('/:id',  viajeController.deleteViaje);
router.get('/estimate/:camionId',  viajeController.estimateFuelConsumption);
router.get('/estimate/:viajeId/specific',  viajeController.estimateFuelConsumptionForSpecificTrip);
router.get('/irregularities', authorizationMiddleware.isAdmin, viajeController.checkForIrregularities);

module.exports = router;