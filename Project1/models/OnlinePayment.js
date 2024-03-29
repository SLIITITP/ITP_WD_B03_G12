const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OnlinePayment = new Schema( {

    orderId: {
        type: String
    },

    customerId: {
        type: String
    },

    totalPrice: {
        type: String
    },
    paymentMethod: {
        type: String
    },

    cardNumber: {
        type: String
    },
    validThru: {
        type: String
    },
    cvc: {
        type: String
    },

   
   
}, {
    collection: 'onlinePayment'
});

module.exports = mongoose.model('OnlinePayment', OnlinePayment);