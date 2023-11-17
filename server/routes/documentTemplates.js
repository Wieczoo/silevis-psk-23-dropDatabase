const {getDocumentTemplates,createDocumentTemplates} = require("../controllers/DocumentTemplatesController");
const express = require('express')

const router = express.Router()
router.get('/', getDocumentTemplates);
router.post('/', createDocumentTemplates);
// router.get('/test', (req, res) => {
//     res.send('Hello !')
// });

module.exports = router;