const express = require('express');
const router = express.Router();
const obatController = require('../controllers/obatController');
const validateObat = require("../middleware/obatValidate");

router.get('/', obatController.getAllObat);

router.get('/:id', obatController.getObatById);

router.post('/', validateObat, obatController.addObat);

router.put('/:id', validateObat, obatController.updateObat);

router.delete('/:id', obatController.deleteObat);

module.exports = router;