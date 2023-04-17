const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Animal = new Schema ({

    animal_name: {
        type: String,
    } ,
    
    animal_type: {
        type: String,
        required: true
    },

    animal_breed: {
        type: String
    },

    animal_gender: {
        type: String,
    
    },

    DOB: {
        type: Date,
        
    },


    date: {
        type: Date,
        default: Date.now
    }

}, 
{
    collection: 'animal'
}

);

module.exports = mongoose.mode ('Animal', Animal)