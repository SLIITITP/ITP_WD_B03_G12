const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Order = new Schema( {
    itemStates: {
        type: String
    },

    orderDate: {
        type: Date,
        default: Date.now
    }

   
}, {
    collection: 'Order'
});

module.exports = mongoose.model('Order', Order);