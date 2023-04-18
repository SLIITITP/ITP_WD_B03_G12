

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AnimalType = new Schema ({

    animal_type: {
        type: String,
    } ,

}, 
{
    collection: 'animaltype'
}

);

module.exports = mongoose.mode ('AnimalType', AnimalType)