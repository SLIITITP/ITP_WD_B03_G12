const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AnimalBreed = new Schema ({

    animal_breed: {
        type: String,
    } ,

}, 
{
    collection: 'animalbreed'
}

);

module.exports = mongoose.model ('AnimalBreed', AnimalBreed)