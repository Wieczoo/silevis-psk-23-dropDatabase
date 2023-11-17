const DocumentTextModel = require("../models/documentTemplatesModel");
const mongoose = require('mongoose');
const ObjectId  = require('mongodb').ObjectId;
const getDocumentTemplates = async (req, res) => {
    const allDocumentTextModel = await DocumentTextModel.find({});
    console.log(allDocumentTextModel);
    return res.status(200).json(allDocumentTextModel);

  }


  const createDocumentTemplates = async (req, res) => {
    try {
      console.log(typeof(req.body));
    console.log('1');
    let newDocumentTexts = {};
    newDocumentTexts._id =  new ObjectId();
    newDocumentTexts.documentStaticText = {};
    newDocumentTexts.documentStaticText.pl = req.body.documentStaticText.pl;
    newDocumentTexts.documentStaticText.en = req.body.documentStaticText.en;
    const newDocumentTextsa = new DocumentTextModel(newDocumentTexts)
    await newDocumentTextsa.save();
    res.status(200).send(newDocumentTextsa);
    } catch (error) {
      res.status(400).json(error)
    }
  }
  
module.exports = {
  getDocumentTemplates,createDocumentTemplates
}