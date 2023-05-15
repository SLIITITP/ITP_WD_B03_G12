const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Income = new Schema( {
    type: {
        type: String
    },

    total: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'income'
});

module.exports = mongoose.model('Income', Income);