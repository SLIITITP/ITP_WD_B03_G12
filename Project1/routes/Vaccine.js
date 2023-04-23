const express = require('express');
const vaccineRoutes = express.Router(); 

let Vaccine = require ( "../models/Vaccine");

//insert
vaccineRoutes.route('/add').post(function(req,res) {
    let service = new Service(req.body);
    vaccine.save()
        .then(service => {
            res.status(200).json({'service': 'service added succesfully'});
        })
        .catch (err => {
            res.status(400).send ("Unable to save")
        })
})

//read
vaccineRoutes.route('/').get(async function (req, res) {
    try{
        const vaccine = await Vaccine.find();
        res.json(vaccine);
    }
    catch (err){
        console.log(err);
    }
})

//readOne
vaccineRoutes.route('/:id').get(async function (req, res) {
    try{
        const vaccine = await Vaccine.find({_id: req.params.id});
        res.json(vaccine);
    }
    catch (err) {
        console.log(err);
    }
  });
  





//delete
vaccineRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const vaccine = await Vaccine.findByIdAndRemove({ _id: req.params.id });
      if (vaccine) {
        res.json('Successfully removed');
      } else {
        res.json('Vaccine not found');
      }
    } catch (err) {
      res.json(err);
    }
  });
  

// Update 
vaccineRoutes.route('/update/:id').put(async (req, res) => {
    try {
      const vaccine = await Vaccine.findById(req.params.id);
  
      if (!vaccine) {
        return res.status(404).json({ error: 'Vaccine not found' });
      }
  
      vaccine.vaccination_Name = req.body.vaccination_Name;
      vaccine.vaccine_Description = req.body.vaccine_Description;
      
      await vaccine.save();
      res.json(vaccine);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //count
  vaccineRoutes.route('/get/count').get(async function (req, res) {
  try {
    const count = await Vaccine.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


module.exports = vaccineRoutes;
