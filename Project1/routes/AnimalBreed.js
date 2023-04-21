const express = require('express');
const animalbreedRoutes = express.Router(); 

let  AnimalBreed = require ( "../models/AnimalBreed");

//insert
animalbreedRoutes.route('/add').post(async function(req,res) {
    try {
        const today = new Date();
        const animalbreedData = {
          animal_breed: req.body.animal_breed,
         
        };
  
        const animal_breed = await AnimalBreed.findOne({ animal_breed: req.body.animal_breed });
  
        if (!animal_breed) {
        let animal_breed = new AnimalBreed(req.body);
        animal_breed.save()
            .then(animalbreed => {
                res.status(200).json({'animalbreed': 'animalbreed added succesfully'});
            })
            .catch (err => {
                res.status(400).send ("Unable to save")
            })
        }
        else {
          res.json({ error: "AnimalBreed already added" });
        }
      } catch (err) {
        res.send("error" + err);
      }
  })


//read
animalbreedRoutes.route('/').get(async function (req, res) {
    try{
        const animalbreed = await AnimalBreed.find();
        res.json(animalbreed);
    }
    catch{
        console.log(err);
    }
})

//readOne
animalbreedRoutes.route('/:id').get(async function (req, res) {
    try{
        const animalbreed = await AnimalBreed.find({_id: req.params.id});
        res.json(animalbreed);
    }
    catch{
        console.log(err);
    }
  });

//delete
animalbreedRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const animalbreed = await AnimalBreed.findByIdAndRemove({ _id: req.params.id });
      if (animalbreed) {
        res.json('Successfully removed');
      } else {
        res.json('AnimalBreed not found');
      }
    } catch (err) {
      res.json(err);
    }
  });

  
// Update 
animalbreedRoutes.route('/update/:id').put(async (req, res) => {
    try {
      const animalbreed = await AnimalBreed.findById(req.params.id);
  
      if (!animalbreed) {
        return res.status(404).json({ error: 'AnimalBreed not found' });
      }
  
      animalbreed.animal_breed = req.body.animal_breed;
     
      
  
      await animalbreed.save();
      res.json(animalbreed);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });  


module.exports = animalbreedRoutes;

