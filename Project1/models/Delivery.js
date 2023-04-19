const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Delivery = new Schema( {
    orderId: {
        type: String
    },

    addressLine1: {
        type: String
    },

    addressLine2: {
        type: String
    },

    city: {
        type: String,
        
    },
    postalCode: {
        type: String,
        
    }

   
}, {
    collection: 'delivery'
});

module.exports = mongoose.model('Delivery', Delivery);