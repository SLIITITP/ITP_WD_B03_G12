const express = require('express');
const medicalrecordslRoutes = express.Router(); 

let MedicalRecords = require ( "../models/MedicalRecords");

//insert
medicalrecordslRoutes.route('/add').post(function(req,res) {
    let medicalrecords = new MedicalRecords(req.body);
    medicalrecords.save()
        .then(medicalrecords => {
            res.status(200).json({'medicalrecords': 'medicalrecords added succesfully'});
        })
        .catch (err => {
            res.status(400).send ("Unable to save")
        })
})

//read
medicalrecordslRoutes.route('/').get(async function (req, res) {
    try{
        const medicalrecords = await MedicalRecords.find();
        res.json(medicalrecords);
    }
    catch (err){
        console.log(err);
    }
})

//readOne
medicalrecordslRoutes.route('/:id').get(async function (req, res) {
    try{
        const medicalrecords = await MedicalRecords.find({_id: req.params.id});
        res.json(medicalrecords);
    }
    catch (err) {
        console.log(err);
    }
  });
  





//delete
medicalrecordslRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const medicalrecords = await MedicalRecords.findByIdAndRemove({ _id: req.params.id });
      if (medicalrecords) {
        res.json('Successfully removed');
      } else {
        res.json('MedicalRecords not found');
      }
    } catch (err) {
      res.json(err);
    }
  });
  

// Update 
medicalrecordslRoutes.route('/update/:id').put(async (req, res) => {
    try {
      const medicalrecords = await MedicalRecords.findById(req.params.id);
  
      if (!medicalrecords) {
        return res.status(404).json({ error: 'MedicalRecords not found' });
      }
  
      medicalrecords.issued_doctor_ID = req.body.issued_doctor_ID;
      medicalrecords.description = req.body.description;
      
      await medicalrecords.save();
      res.json(medicalrecords);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //count
  medicalrecordslRoutes.route('/get/count').get(async function (req, res) {
  try {
    const count = await MedicalRecords.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).send("MedicalRecords error");
  }
});


module.exports = medicalrecordslRoutes;
