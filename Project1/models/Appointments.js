

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Appointment = new Schema({


    name : {
        type : String,
        required: true
        
    },
    email:{
        type:String,
        required: true
        
    },
    phone:{
        type:String,
        required: true
        
    },

    petName:{
        type:String,
        required: true
        
    },

    Species:{
        type:String,
        
    },

    Breed:{
        type:String,
        
    },
    Reason:{
        type:String,
        required: true
        
   
    },
   note:{
        type:String,
        
    },

    reggdate: {
        type: Date,
        default: Date.now,
    },
},

{
        collection: 'appointment'
}
    
    );
    
    module.exports = mongoose.model ('Appointment', Appointment)