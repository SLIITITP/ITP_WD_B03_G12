
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schedule = new Schema({


    name: {
        type: String,
        required: true
    },
    

    lname: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
},
    {
        collection: 'schedule'
    }
    
    );
    
    module.exports = mongoose.model ('schedule', schedule)