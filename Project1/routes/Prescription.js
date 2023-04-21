const express = require('express');
const prescriptionRoutes = express.Router(); 

let Prescription = require ( "../models/Prescription");

//insert
prescriptionRoutes.route('/add').post(function(req,res) {
    let prescription = new Prescription (req.body);
    prescription.save()
        .then(prescription => {
            res.status(200).json({'prescription': 'prescription added succesfully'});
        })
        .catch (err => {
            res.status(400).send ("Unable to save")
        })
})

//read
prescriptionRoutes.route('/').get(async function (req, res) {
    try{
        const prescription = await Prescription.find();
        res.json(prescription);
    }
    catch (err){
        console.log(err);
    }
})

//readOne
prescriptionRoutes.route('/:id').get(async function (req, res) {
    try{
        const prescription = await Prescription.find({_id: req.params.id});
        res.json(prescription);
    }
    catch (err) {
        console.log(err);
    }
  });
  





//delete
prescriptionRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const prescription = await Prescription.findByIdAndRemove({ _id: req.params.id });
      if (prescription) {
        res.json('Successfully removed');
      } else {
        res.json('Prescription not found');
      }
    } catch (err) {
      res.json(err);
    }
  });
  

// Update 
prescriptionRoutes.route('/update/:id').put(async (req, res) => {
    try {
      const prescription = await Prescription.findById(req.params.id);
  
      if (!prescription) {
        return res.status(404).json({ error: 'Prescription not found' });
      }
  
  
      prescription.prescription_DoctorID = req.body.prescription_DoctorID;
      prescription.prescription_PetID = req.body.prescription_PetID;
      prescription.prescription_Illness = req.body.prescription_Illness;
      prescription.prescription_Medicine = req.body.prescription_Medicine;
     
      await prescription.save();
      res.json(prescription);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //count
prescriptionRoutes.route('/get/count').get(async function (req, res) {
  try {
    const count = await Prescription.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).send("Prescription error");
  }
});


module.exports = prescriptionRoutes;
