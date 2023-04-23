const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MedicalRecords = new Schema( {
    issued_doctor_ID: {
        type: String
    },

    description: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    },
}, {
    collection: 'medicalrecords'
});

module.exports = mongoose.model('MedicalRecords', MedicalRecords);