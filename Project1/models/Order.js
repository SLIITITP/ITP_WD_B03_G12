const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Order = new Schema( {
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
    }

   
}, {
    collection: 'Order'
});

module.exports = mongoose.model('Order', Order);