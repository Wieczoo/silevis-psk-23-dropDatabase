const {getAllUniversitySupervisor,createUniversitySupervisor,getSingleUniversitySupervisor,deleteUniversitySupervisor,updateUniversitySupervisor} = require('../controllers/universitySupervisorController')
const express = require('express')

const router = express.Router()
router.get('/', getAllUniversitySupervisor);
router.post('/', createUniversitySupervisor);
router.get('/:id', getSingleUniversitySupervisor)
router.delete('/:id', deleteUniversitySupervisor)
router.patch('/:id', updateUniversitySupervisor)

module.exports = router;