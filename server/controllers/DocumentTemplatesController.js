const DocumentTexts = require("../models/documentTemplatesModel");
const mongoose = require('mongoose');

const getDocumentTemplates = async (req, res) => {
    const documentTemplate = await DocumentTexts.find({}).sort({createdAt: -1})
  
    res.status(200).json(documentTemplate)
    //res.status(200);
  }


  const createDocumentTemplates = async (req, res) => {
    const {title} = req.body;
    console.log(req.body);
    try {
     
      const DocumentTexts = await DocumentTexts.create({title})
      res.status(200).json(DocumentTexts)
    } catch (error) {
      res.status(400).json(error)
    }
  }
  
module.exports = {
  getDocumentTemplates,createDocumentTemplates
}