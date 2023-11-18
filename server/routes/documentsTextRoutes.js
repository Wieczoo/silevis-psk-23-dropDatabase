const {getDocumentTemplates,
    createDocumentTemplates,
    getSingleDocumentTemplates,
    deleteDocumentTemplates,
    updateDocumentTemplates} = require("../controllers/DocumentTextController");
const express = require('express')

const router = express.Router()
router.get('/', getDocumentTemplates);
router.post('/', createDocumentTemplates);
router.get('/:id', getSingleDocumentTemplates)
router.delete('/:id', deleteDocumentTemplates)
router.patch('/:id', updateDocumentTemplates)

module.exports = router;