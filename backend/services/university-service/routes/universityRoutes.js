const express = require('express');
const router = express.Router();
const universityController = require('../controller/universityController');

router.post('/', universityController.createUniversity);
router.get('/', universityController.getAllUniversities);
router.get('/:id', universityController.getUniversityById);
router.put('/:id', universityController.updateUniversity);
router.delete('/:id', universityController.deleteUniversity);

module.exports = router;