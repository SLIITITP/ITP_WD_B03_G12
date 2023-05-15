const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Payment = new Schema ({

    pay_total: {
        type: String,
    },

    pay_services: {
        type: Array,
        default: [],
    },

    pay_cashierName: {
        type: String,
    },

    pay_date: { 
        type: Date,
        default: Date.now,
    },
}, 
{
    collection: 'payment'
}

);



module.exports = mongoose.model ('Payment', Payment)