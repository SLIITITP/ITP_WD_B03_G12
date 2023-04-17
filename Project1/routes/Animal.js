const express = require('express');
const animalRoutes = express.Router(); 

let  Animal = require ( "../models/Animal");

//insert
animalRoutes.route('/add').post(function(req,res) {
    let animal = new Animal(req.body);
    animal.save()
        .then( animal => {
            res.status(200).json({' animal': ' Animal added succesfully'});
        })
        .catch (err => {
            res.status(400).send ("Unable to save")
        })
})


module.exports = animalRoutes;