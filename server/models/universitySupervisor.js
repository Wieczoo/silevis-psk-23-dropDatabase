const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const universitySupervisorSchema = new Schema ({
    _id: {type: mongoose.Schema.Types.ObjectId,
required: true},
  name: {
    type: String,
    required: false
  },
surname: {
    type: String,
    required: false
  },
tel: {
    type: String,
    required: false
  },
email: {
    type: String,
    required: false
  }
});
module.exports = mongoose.model('universitySupervisorModel', universitySupervisorSchema, 'universitySupervisor')