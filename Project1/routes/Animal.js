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

//read
animalRoutes.route('/').get(async function (req, res) {
    try{
        const animal = await Animal.find();
        res.json(animal);
    }
    catch{
        console.log(err);
    }
})

//readOne
animalRoutes.route('/:id').get(async function (req, res) {
    try{
        const animal = await Animal.find({_id: req.params.id});
        res.json(animal);
    }
    catch{
        console.log(err);
    }
  });

//delete
animalRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const animal = await Animal.findByIdAndRemove({ _id: req.params.id });
      if (animal) {
        res.json('Successfully removed');
      } else {
        res.json('Animal not found');
      }
    } catch (err) {
      res.json(err);
    }
  });

// Update 
animalRoutes.route('/update/:id').put(async (req, res) => {
    try {
      const animal = await Animal.findById(req.params.id);
  
      if (!animal) {
        return res.status(404).json({ error: 'Animal not found' });
      }
  
      animal.animal_name = req.body.animal_name;
      animal.animal_type = req.body.animal_type;
      animal.animal_breed = req.body.animal_breed;
      animal.animal_gender = req.body.animal_gender;
      animal.DOB = req.body.DOB;
  
      await animal.save();
      res.json(animal);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });  

  //count
animal.route('/get/count').get(async function (req, res) {
  try {
    const count = await Animal.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
  });
  
    
  


module.exports = animalRoutes;