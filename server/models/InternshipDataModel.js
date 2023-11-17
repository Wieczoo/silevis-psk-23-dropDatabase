const mongoose = require('mongoose');

// Schemat dla studenta
const studentSchema = new mongoose.Schema({
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
      }
});

// Schemat dla firmy
const companySchema = new mongoose.Schema({
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
});

// Schemat dla uczelni
const universitySupervisor = new mongoose.Schema({
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
});

// Schemat dla praktyk
const apprenticeshipsSchema = new mongoose.Schema({
    startDate: {
        type: String,
        required: false
      },
    endDate: {
        type: String,
        required: false
      }
});

// Schemat dla całego obiektu
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
          }
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
    }
});

// Model mongoose na podstawie schematu
const InternshipDataModel = mongoose.model('InternshipData', internshipDataSchema,'InternshipData');

// Eksport modelu
module.exports = InternshipDataModel;