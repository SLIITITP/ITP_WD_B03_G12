const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Shelters = new schema({

    shelter_id : {
        type:String,
    },

    shelter_type : {
        type:String,
    },

    special_details : {
        type:String,
    }

    
},
{
    collection : 'shelters'
}


);
module.exports = mongoose.model('Shelters',Shelters )
