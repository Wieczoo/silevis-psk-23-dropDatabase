const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentTextsSchema = new Schema ({
    _id: {
        type: Schema.Types.UUID
    },
    documentStaticText: {
        pl:{
            type: String,
            required: true
          },
        en:{
            type: String,
            required: true
          }
    } 
});



module.exports = mongoose.model('DocumentTexts', documentTextsSchema)