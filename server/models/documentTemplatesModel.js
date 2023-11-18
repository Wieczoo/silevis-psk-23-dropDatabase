const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentTemplatesSchema = new Schema ({
    _id: {type: mongoose.Schema.Types.ObjectId,
required: true},
title:{
    type: String,
    required: true
  },
    textOrder:{
        type: Array,
        required: true
      }
});
module.exports = mongoose.model('DocumentTemplatesModel', documentTemplatesSchema,'documentTemplates')