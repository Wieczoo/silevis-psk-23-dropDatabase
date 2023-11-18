const {getAllInternshipData,createInternshipData,getSingleInternshipData,deleteInternshipData,updateInternshipData,getSingleInternshipDataByIndex} = require("../controllers/InternshipController");
const express = require('express')

const router = express.Router()

router.get('/',getAllInternshipData);
router.get('/index/:index',getSingleInternshipDataByIndex);
router.post('/',createInternshipData);
router.get('/:id', getSingleInternshipData)
router.delete('/:id', deleteInternshipData)
router.patch('/:id', updateInternshipData)

module.exports = router;