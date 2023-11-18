const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const internshipDiarySchema = new Schema ({
    _id: {type: mongoose.Schema.Types.ObjectId,
required: true},
index: {
    type: String,
    required: true
  },
    diary: [
        {
            day: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
        ]
});
module.exports = mongoose.model('InternshipDiaryModel', internshipDiarySchema, 'internshipDiary')