const { getAllInternshipDiary,createInternshipDiary,getSingleInternshipDiary,deleteInternshipDiary,updateInternshipDiary,getSingleInternshipDiaryByIndex} = require("../controllers/internshipDiaryController");
const express = require('express')

const router = express.Router()
router.get('/', getAllInternshipDiary);
router.post('/', createInternshipDiary);
router.get('/index/:index',getSingleInternshipDiaryByIndex)
router.get('/:id', getSingleInternshipDiary)
router.delete('/:id', deleteInternshipDiary)
router.patch('/:id', updateInternshipDiary)

module.exports = router;