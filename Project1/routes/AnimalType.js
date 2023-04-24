const express = require('express');
const animaltypeRoutes = express.Router(); 

let  AnimalType = require ( "../models/AnimalType");

//insert
animaltypeRoutes.route('/add').post(async function(req,res) {
    try {
        const today = new Date();
        const animaltypeData = {
          animal_type: req.body.animal_type,
         
        };
  
        const animal_type = await AnimalType.findOne({ animal_type: req.body.animal_type });
  
        if (!animal_type) {
        let animal_type = new AnimalType(req.body);
        animal_type.save()
            .then(service => {
                res.status(200).json({'animaltype': 'animaltype added succesfully'});
            })
            .catch (err => {
                res.status(400).send ("Unable to save")
            })
        }
        else {
          res.json({ error: "AnimalType already added" });
        }
      } catch (err) {
        res.send("error" + err);
      }
  })
  

//read
animaltypeRoutes.route('/').get(async function (req, res) {
    try{
        const animaltype = await AnimalType.find();
        res.json(animaltype);
    }
    catch{
        console.log(err);
    }
})

//readOne
animaltypeRoutes.route('/:id').get(async function (req, res) {
    try{
        const animaltype = await AnimalType.find({_id: req.params.id});
        res.json(animaltype);
    }
    catch{
        console.log(err);
    }
  });

//delete
animaltypeRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const animaltype = await AnimalType.findByIdAndRemove({ _id: req.params.id });
      if (animaltype) {
        res.json('Successfully removed');
      } else {
        res.json('Animaltype not found');
      }
    } catch (err) {
      res.json(err);
    }
  });

// Update 
animaltypeRoutes.route('/update/:id').put(async (req, res) => {
    try {
      const animaltype = await AnimalType.findById(req.params.id);
  
      if (!animaltype) {
        return res.status(404).json({ error: 'AnimalType not found' });
      }
  
      animaltype.animal_type = req.body.animal_type;
      
  
      await animaltype.save();
      res.json(animaltype);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });  

  //count
  animaltypeRoutes.route('/get/count').get(async function (req, res) {
  try {
    const count = await AnimalType.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
  });
  


module.exports = animaltypeRoutes;