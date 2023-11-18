const { getAllInternshipDiary,createInternshipDiary,getSingleInternshipDiary,deleteInternshipDiary,updateInternshipDiary} = require("../controllers/internshipDiaryController");
const express = require('express')

const router = express.Router()
router.get('/', getAllInternshipDiary);
router.post('/', createInternshipDiary);
router.get('/:id', getSingleInternshipDiary)
router.delete('/:id', deleteInternshipDiary)
router.patch('/:id', updateInternshipDiary)

module.exports = router;