const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Prescription = new Schema( {
    DoctorID: {
        type: String
    },

    PetID: {
        type: String
    },

    PetName: {
        type: String
    },

    Illness: {
        type: String,
    },

    Medicine: {
        type: String,
    },

    Date: {
        type: Date,
        default: Date.now
    },


}, {
    collection: 'prescription'
});

module.exports = mongoose.model('Prescription', Prescription);