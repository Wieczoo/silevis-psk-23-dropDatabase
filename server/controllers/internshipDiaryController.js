const InternshipDiaryModel = require("../models/IntershipDiary");
const mongoose = require('mongoose');
const ObjectId  = require('mongodb').ObjectId;
const getAllInternshipDiary = async (req, res) => {
    const allInternshipDiaryModel = await InternshipDiaryModel.find({});
    return res.status(200).json(allInternshipDiaryModel);
  }


  const getSingleInternshipDiaryByIndex = async(req, res) => {
    const { index } = req.params

    const InternshipDiary = await InternshipDiaryModel.find({ 'index': index })
  
    if (!InternshipDiary) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    res.status(200).json(InternshipDiary)
  }

  const createInternshipDiary = async (req, res) => {
    const {index,diary} = req.body;
    const _id = new ObjectId()
    try {
        const InternshipDiary = await InternshipDiaryModel.create({_id,index,diary})
        res.status(200).json(InternshipDiary)
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
  }
  const getSingleInternshipDiary = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    const InternshipDiary = await InternshipDiaryModel.findById(id)
  
    if (!InternshipDiary) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    res.status(200).json(InternshipDiary)
  };

  const deleteInternshipDiary = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const InternshipDiary = await InternshipDiaryModel.findOneAndDelete({_id: id})
  
    if(!InternshipDiary) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(InternshipDiary)
  };

  const updateInternshipDiary = async (req, res) => {
const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const InternshipDiary = await InternshipDiaryModel.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!InternshipDiary) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(InternshipDiary)
  };


module.exports = {
    getAllInternshipDiary,createInternshipDiary,getSingleInternshipDiary,deleteInternshipDiary,updateInternshipDiary,getSingleInternshipDiaryByIndex
}