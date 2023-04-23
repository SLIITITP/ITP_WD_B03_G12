const { Double } = require("mongodb");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema ({

    

    name: {
        type: String
    } ,

    category: {
        type: String
    } ,
    
    price: {
        type: String,
        required: true
    },

    Supplier: {
        type: String,
        required: true
    } ,
    
    description: {
        type: String
       
    },

    qty: {
        type: String,
        required: true
    },

   manufacture_date: {
        type: Date,
      
    },

    expire_date: {
        type: Date,
        
    },
}, {
    collection: 'item'
});


module.exports  =mongoose.model ('Item', ItemSchema);