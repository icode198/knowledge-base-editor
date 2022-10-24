const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiseaseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  diseaseName: {
    type: String,
    required: true
  },
  diseaseDesc: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  riskFactors: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      riskFactorName: {
        type: String,
        required: true
      },
      riskFactorDesc: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  symptoms: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      symptomName: {
        type: String,
        required: true
      },
      symptomDesc: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('disease', DiseaseSchema);
