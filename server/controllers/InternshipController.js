const InternshipDataModel = require("../models/InternshipDataModel");
const mongoose = require('mongoose');
const ObjectId  = require('mongodb').ObjectId;
const getAllInternshipData = async (req, res) => {
    const allInternshipDataModel = await InternshipDataModel.find({});
    console.log(allInternshipDataModel);
    return res.status(200).json(allInternshipDataModel);

  }

  const createInternshipData = async (req, res) => {
  
    let internshipDataModel = req.body;
     internshipDataModel._id =  new ObjectId();
    
   
    const newInternshipDataModel = new InternshipDataModel(internshipDataModel)
    await newInternshipDataModel.save();
    res.status(200).send(newInternshipDataModel);
 
  }

  const getSingleInternshipDataByIndex = async(req, res) => {
    const { index } = req.params

    
  
    const InternshipData = await InternshipDataModel.find({ 'student.index': index })
  
    if (!InternshipData) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    res.status(200).json(InternshipData)
  }

  const getSingleInternshipData = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    const InternshipData = await InternshipDataModel.findById(id)
  
    if (!InternshipData) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    res.status(200).json(InternshipData)
  };

  const deleteInternshipData = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const InternshipData = await InternshipDataModel.findOneAndDelete({_id: id})
  
    if(!InternshipData) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(InternshipData)
  };

  const updateInternshipData = async (req, res) => {
const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const InternshipData = await InternshipDataModel.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!InternshipData) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(InternshipData)
  };

module.exports = {getAllInternshipData,createInternshipData,getSingleInternshipData,deleteInternshipData,updateInternshipData,getSingleInternshipDataByIndex}