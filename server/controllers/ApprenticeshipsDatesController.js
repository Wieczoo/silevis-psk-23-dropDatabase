const ApprenticeshipsDatesModel = require("../models/apprenticeshipsDates");
const mongoose = require('mongoose');
const ObjectId  = require('mongodb').ObjectId;
const getAllApprenticeshipsDates = async (req, res) => {
    const allApprenticeshipsDatesModel = await ApprenticeshipsDatesModel.find({});
    return res.status(200).json(allApprenticeshipsDatesModel);
  }


  const createApprenticeshipsDates = async (req, res) => {
    const {startDate, endDate} = req.body
    const _id = new ObjectId()
    try {
        const workout = await ApprenticeshipsDatesModel.create({ _id,startDate, endDate})
        res.status(200).json(workout)
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
  }
  const getSingleApprenticeshipsDates = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    const ApprenticeshipsDates = await ApprenticeshipsDatesModel.findById(id)
  
    if (!ApprenticeshipsDates) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    res.status(200).json(ApprenticeshipsDates)
  };

  const deleteApprenticeshipsDates = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const ApprenticeshipsDates = await ApprenticeshipsDatesModel.findOneAndDelete({_id: id})
  
    if(!ApprenticeshipsDates) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(ApprenticeshipsDates)
  };

  const updateApprenticeshipsDates = async (req, res) => {
const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const ApprenticeshipsDates = await ApprenticeshipsDatesModel.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!ApprenticeshipsDates) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(ApprenticeshipsDates)
  };


module.exports = {
    getAllApprenticeshipsDates,createApprenticeshipsDates,getSingleApprenticeshipsDates,deleteApprenticeshipsDates,updateApprenticeshipsDates
}