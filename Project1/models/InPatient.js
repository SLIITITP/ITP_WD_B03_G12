const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let InPatient = new Schema({

    first_name: {
        type: String,
    } ,

    last_name: {
        type: String,
    } ,

    contact_no: {
        type: String,
    } ,

    weight: {
        type: String,
    } ,

    diagnosis: {
        type: String,
    } ,

    shelter_type :{
        type: String,
    },

    special_notes: {
        type: String,
    } ,

    shelter_no:{
        type:String,

    },
   status: {
        type: String,
    } ,
     admitted_date: {
        type: Date,
        default: Date.now
     } 

},

{
    collection:'inpatient'

}
);
module.exports =mongoose.model('InPatient',InPatient)