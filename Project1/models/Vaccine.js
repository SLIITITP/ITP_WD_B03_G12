const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Vaccine = new Schema( {
    vaccination_Name: {
        type: String
    },

    vaccine_Description: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'vaccine'
});

module.exports = mongoose.model('Vaccine', Vaccine);