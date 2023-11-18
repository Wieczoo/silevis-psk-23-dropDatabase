const {getAllApprenticeshipsDates,
    getSingleApprenticeshipsDates,
    updateApprenticeshipsDates,
    deleteApprenticeshipsDates,
    createApprenticeshipsDates} = require("../controllers/ApprenticeshipsDatesController");
const express = require('express')

const router = express.Router()
router.get('/', getAllApprenticeshipsDates);
router.post('/', createApprenticeshipsDates);
router.get('/:id', getSingleApprenticeshipsDates)
router.delete('/:id', deleteApprenticeshipsDates)
router.patch('/:id', updateApprenticeshipsDates)

module.exports = router;