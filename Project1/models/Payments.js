const { Double } = require("mongodb");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Payement = new Schema ({

    item_name: {
        type: String,
    } ,
    
    item_price: {
        type: Double,
        required: true
    },

    total: {
        type: Double
    },

    date: {
        type: Date,
        default: Date.now
    }
}, 
{
    collection: 'payment'
}

);

module.exports = mongoose.mode ('Payment', Payment)