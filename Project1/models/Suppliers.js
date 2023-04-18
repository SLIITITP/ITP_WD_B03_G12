const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SupplierSchema = new Schema ({
    company_name: {
        type: String
    } ,

    person1_first_name: {
        type: String
    } ,
    
    person1_last_name: {
        type: String
    },

    Person2_first_name: {
        type: String
    } ,
    
    Person2_last_name: {
        type: String
    },

    email1: {
        type: String,
        required: true
    },

    email2: {
        type: String
       
    },

    contact_no1: {
        type: String,
        required: true
    },

    contact_no2: {
        type: String
       
    },

   registerd_date: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'supplier'
});


module.exports  =mongoose.model ('Supplier', SupplierSchema);