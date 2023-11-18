const mongoose = require('mongoose');

const internshipDataSchema = new mongoose.Schema({
    _id:{type: mongoose.Schema.Types.ObjectId,required: true},
    student: {
        name: {
            type: String,
            required: false
          },
        surname: {
            type: String,
            required: false
          },
        index: {
            type: String,
            required: false
          },
          pesel: {
            type: String,
            required: false
          },
          fieldOfStudy: {
            type: String,
            required: false
          },
          faculty:{
            type: String,
            required: false
          },
          formOfStudy:{
            type: String,
            required: false
          },
          year:{
            type: String,
            required: false
          },

    },
    company: {
        name: {
            type: String,
            required: false
          },
        city: {
            type: String,
            required: false
          },
        street: {
            type: String,
            required: false
          },
        krs: {
            type: String,
            required: false
          },
        nip: {
            type: String,
            required: false
          },
        regon: {
            type: String,
            required: false
          },
        supervisor: {
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
        }
    },
    university: {
        supervisor: {
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
              },
              supervisorFaculty:{
                type: String,
                required: false
              }
        }
    },
    apprenticeships:{
        startDate: {
            type: String,
            required: false
          },
        endDate: {
            type: String,
            required: false
          }
    },
    currentStatus:{
            type: String,
            required: false
          },
    applianceType:{
            type: Number,
            required: false
          },
    dean:{
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    form:{
      type: Array,
      required: false
    },
    form1State:{
      type: String,
      required: false
    },
    form2:{
      type: Array,
      required: false
    },
    form2State:{
      type: String,
      required: false
    }
});

// Model mongoose na podstawie schematu
const InternshipDataModel = mongoose.model('InternshipData', internshipDataSchema,'InternshipData');

// Eksport modelu
module.exports = InternshipDataModel;