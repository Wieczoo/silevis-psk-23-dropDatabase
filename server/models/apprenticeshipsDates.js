const mongoose = require('mongoose');

// Schemat dla studenta
const apprenticeshipsDatesSchema = new mongoose.Schema({
        _id: {type: mongoose.Schema.Types.ObjectId,
        required: true},
        startDate: {
            type: String,
            required: false
          },
        endDate: {
            type: String,
            required: false
          }
    }
);

// Model mongoose na podstawie schematu
const ApprenticeshipsDatesModel = mongoose.model('ApprenticeshipsDates', apprenticeshipsDatesSchema,'ApprenticeshipsDates');

// Eksport modelu
module.exports = ApprenticeshipsDatesModel;