const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Prescription = new Schema( {
    prescription_DoctorID: {
        type: String
    },

    prescription_PetID: {
        type: String
    },

    prescription_Illness: {
        type: String,
    },

    prescription_Medicine: {
        type: String,
    },

    prescription_Date: {
        type: Date,
        default: Date.now
    },


}, {
    collection: 'prescription'
});

module.exports = mongoose.model('Prescription', Prescription);