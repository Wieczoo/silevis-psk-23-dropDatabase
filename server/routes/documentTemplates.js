const {getDocumentTemplates,createDocumentTemplates} = require("../controllers/DocumentTemplatesController");
const express = require('express')

const router = express.Router()
router.get('/', getDocumentTemplates)
router.post('/', createDocumentTemplates)


module.exports = router;