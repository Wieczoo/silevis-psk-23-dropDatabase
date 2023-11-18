const universitySupervisorModel = require("../models/universitySupervisor");
const mongoose = require('mongoose');
const ObjectId  = require('mongodb').ObjectId;
const getAllUniversitySupervisor = async (req, res) => {
    const allUniversitySupervisorModel = await universitySupervisorModel.find({});
    return res.status(200).json(allUniversitySupervisorModel);
  }


  const createUniversitySupervisor = async (req, res) => {
    const {name,surname,tel,email} = req.body;
    const _id = new ObjectId()
    try {
        const universitySupervisor = await universitySupervisorModel.create({_id,name,surname,tel,email})
        res.status(200).json(universitySupervisor)
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
  }
  const getSingleUniversitySupervisor = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    const universitySupervisor = await universitySupervisorModel.findById(id)
  
    if (!universitySupervisor) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    res.status(200).json(universitySupervisor)
  };

  const deleteUniversitySupervisor = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const universitySupervisor = await universitySupervisorModel.findOneAndDelete({_id: id})
  
    if(!universitySupervisor) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(universitySupervisor)
  };

  const updateUniversitySupervisor = async (req, res) => {
const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const universitySupervisor = await universitySupervisorModel.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!universitySupervisor) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(universitySupervisor)
  };


module.exports = {
    getAllUniversitySupervisor,createUniversitySupervisor,getSingleUniversitySupervisor,deleteUniversitySupervisor,updateUniversitySupervisor
}