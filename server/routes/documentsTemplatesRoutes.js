const {getAllDocumentTemplates,createDocumentTemplates,getSingleDocumentTemplates,deleteSingleDocumentTemplates,updateDocumentTemplates} = require("../controllers/DocumentTemplatesController");
const express = require('express')

const router = express.Router()
router.get('/', getAllDocumentTemplates);
router.post('/', createDocumentTemplates);
router.get('/:id', getSingleDocumentTemplates)
router.delete('/:id', deleteSingleDocumentTemplates)
router.patch('/:id', updateDocumentTemplates)

module.exports = router;