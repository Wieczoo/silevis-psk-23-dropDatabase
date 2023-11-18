const DocumentTemplatesModel = require("../models/documentTemplatesModel");
const mongoose = require('mongoose');
const ObjectId  = require('mongodb').ObjectId;
const getAllDocumentTemplates = async (req, res) => {
    const allDocumentTemplatesModel = await DocumentTemplatesModel.find({});
    return res.status(200).json(allDocumentTemplatesModel);
  }


  const createDocumentTemplates = async (req, res) => {
    const {title,textOrder} = req.body;
    const _id = new ObjectId()
    try {
        const DocumentTemplates = await DocumentTemplatesModel.create({_id,title,textOrder})
        res.status(200).json(DocumentTemplates)
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
  }
  const getSingleDocumentTemplates = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    const DocumentTemplates = await DocumentTemplatesModel.findById(id)
  
    if (!DocumentTemplates) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    res.status(200).json(DocumentTemplates)
  };

  const deleteSingleDocumentTemplates = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const DocumentTemplates = await DocumentTemplatesModel.findOneAndDelete({_id: id})
  
    if(!DocumentTemplates) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(DocumentTemplates)
  };

  const updateDocumentTemplates = async (req, res) => {
const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const DocumentTemplates = await DocumentTemplatesModel.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!DocumentTemplates) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(DocumentTemplates)
  };


module.exports = {
    getAllDocumentTemplates,createDocumentTemplates,getSingleDocumentTemplates,deleteSingleDocumentTemplates,updateDocumentTemplates
}