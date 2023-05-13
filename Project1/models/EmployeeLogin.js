const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeloginSchema = new Schema ({

    email: {
        type: String,
        required: true,
    },
    

    password: {
        type: String,
        required: true,
    },

    acctype: {
        type: String,
        required: true,
    },
    image: {
        type: String,

    },


    reggdate: {
        type: Date,
        default: Date.now,
    },

 
}, {
    collection: 'accounts'
});

module.exports  =mongoose.model ('accounts', employeeloginSchema);