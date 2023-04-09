const { Double } = require("mongodb");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Service = new Schema( {
    service_name: {
        type: String
    },

    service_price: {
        type: String
    }
}, {
    collection: 'service'
});

module.exports = mongoose.model('Service', Service);