const {getAllInternshipData,createInternshipData} = require("../controllers/InternshipController");
const express = require('express')

const router = express.Router()

router.get('/',getAllInternshipData);
router.post('/',createInternshipData);

module.exports = router;