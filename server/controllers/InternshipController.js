const InternshipDataModel = require("../models/InternshipDataModel");
const mongoose = require('mongoose');
const ObjectId  = require('mongodb').ObjectId;
const getAllInternshipData = async (req, res) => {
    const allInternshipDataModel = await InternshipDataModel.find({});
    console.log(allInternshipDataModel);
    return res.status(200).json(allInternshipDataModel);

  }

  const createInternshipData = async (req, res) => {
    console.log(req.body);
    let internshipDataModel = req.body;
     internshipDataModel._id =  new ObjectId();
    
   
    const newInternshipDataModel = new InternshipDataModel(internshipDataModel)
    await newInternshipDataModel.save();
    res.status(200).send(newInternshipDataModel);
  //const internshipDataInstance = new InternshipDataModel(newInternshipData);

  }

module.exports = {getAllInternshipData,createInternshipData}