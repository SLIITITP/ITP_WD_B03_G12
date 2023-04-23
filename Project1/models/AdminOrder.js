const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AdminOrder = new Schema( {
    orderId: {
        type: String
    },

    orderStates: {
        type: String
    },

    orderDate: {
        type: Date,
        default: Date.now
    },
    selectedItem: {
        type: String
    },
    selectedItemQty: {
        type: String
    },
    totalPrice: {
        type: String
    },
    paymentMethod: {
        type: String
    },

   
}, {
    collection: 'AdminOrder'
});

module.exports = mongoose.model('AdminOrder', AdminOrder);