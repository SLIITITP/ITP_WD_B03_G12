const { Double } = require("mongodb");



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema ({

    name: {
        type: String,
        required: true
    },
    

    lname: {
        type: String,
        required: true
    },

    NIC: {
        type: String,
        required: true
    },

    phoneno: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    birthday: {
    type: String,
    required: true
   },

    jobrole: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'employee'
});

module.exports  =mongoose.model ('employee', employeeSchema);