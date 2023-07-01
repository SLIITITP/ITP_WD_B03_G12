const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({

    first_name: {
        type: String,
    } ,
    
    last_name: {
        type: String,
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    pet_details: [{
        animal_name: {
            type: String,
        } ,
        
        animal_type: {
            type: String
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
    
        reg_date: {
            type: Date,
            default: Date.now
        },
        
        vaccine: {
            type: Array,
            default: []
        }
    }]}

);

module.exports = User =mongoose.model ('users', UserSchema);