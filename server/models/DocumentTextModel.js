const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentTextsSchema = new Schema ({
    _id: {type: mongoose.Schema.Types.ObjectId,
required: true},
title: {
    type: String,
    required: true
  },
    documentStaticText: {
        en:{
            type: String,
            required: true
          },
        pl:{
            type: String,
            required: true
          }
    } 
});
module.exports = mongoose.model('DocumentTextModel', documentTextsSchema, 'documentTexts')