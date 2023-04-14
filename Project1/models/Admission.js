const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Admission = new Schema({
    owner_name: {
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

    special_notes: {
        type: String,
    } ,
    
    admitted_date: {
        type: Date,
        default: Date.now
    } 
},

{
    collection:'admission'

}
);
module.exports =mongoose.model('Admission',Admission)