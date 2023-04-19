const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema ({
    name: {
        type: String
    } ,

    description: {
        type: String
    } ,
    
   
}, {
    collection: 'category'
});


module.exports  =mongoose.model ('Category', CategorySchema);