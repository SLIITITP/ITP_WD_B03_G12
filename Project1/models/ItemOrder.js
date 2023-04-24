const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemOrder = new Schema( {

    orderId: {
        type: String
    },

    itemId: {
        type: String
    },

   
}, {
    collection: 'itemOrder'
});

module.exports = mongoose.model('ItemOrder', ItemOrder);