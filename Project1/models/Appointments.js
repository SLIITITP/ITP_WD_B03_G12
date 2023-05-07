

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Appointment = new Schema({


    name : {
        type : String,
        
    },
    email:{
        type:String,
        
    },
    phone:{
        type:String,
        
    },

    petName:{
        type:String,
        
    },

    Species:{
        type:String,
        
    },

    Breed:{
        type:String,
        
    },
    Reason:{
        type:String,
        
   
    },
    note:{
        type:String,
        
    }
},

{
        collection: 'appointment'
}
    
    );
    
    module.exports = mongoose.model ('Appointment', Appointment)