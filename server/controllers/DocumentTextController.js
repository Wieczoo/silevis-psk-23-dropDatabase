const DocumentTextModel = require("../models/DocumentTextModel");
const mongoose = require('mongoose');
const ObjectId  = require('mongodb').ObjectId;
const getDocumentTemplates = async (req, res) => {
    const allDocumentTextModel = await DocumentTextModel.find({});
    console.log(allDocumentTextModel);
    return res.status(200).json(allDocumentTextModel);

  }


  const createDocumentTemplates = async (req, res) => {
    try {
      console.log(req.body);
    console.log('1');
    let newDocumentTexts = {};
    newDocumentTexts._id =  new ObjectId();
    newDocumentTexts.title =  req.body.title;
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
  const getSingleDocumentTemplates = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    const DocumentText = await DocumentTextModel.findById(id)
  
    if (!DocumentText) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    res.status(200).json(DocumentText)
  };
  const deleteDocumentTemplates = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const DocumentText = await DocumentTextModel.findOneAndDelete({_id: id})
  
    if(!DocumentText) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(DocumentText)
  };

  const updateDocumentTemplates = async (req, res) => {
const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }
console.log(req.body);
  const DocumentText = await DocumentTextModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        'documentStaticText.en': req.body.en,
        'documentStaticText.pl': req.body.pl
      },
      title: req.body.title
    },
    { upsert: true, new: true }
  );

  if (!DocumentText) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(DocumentText)
  };


module.exports = {
  getDocumentTemplates,createDocumentTemplates,getSingleDocumentTemplates,deleteDocumentTemplates,updateDocumentTemplates
}