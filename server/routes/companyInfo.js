const {getCompanyInfo} = require("../controllers/companyInfoController");
const express = require('express')

const router = express.Router()
router.get('/companyinfo/:nip', getCompanyInfo);

module.exports = router;