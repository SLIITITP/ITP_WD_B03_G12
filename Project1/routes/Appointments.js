const express = require('express');
const AppointmentRoutes = express.Router(); 

let Appointment = require ( "../models/Appointments");

//insert
AppointmentRoutes.route('/add').post(function(req,res) {
    let appointment = new Appointment(req.body);
    appointment.save()
        .then(appointment => {
            res.status(200).json({'Appointment': 'Appointment added succesfully'});
        })
        .catch (err => {
            res.status(400).send ("Unable to save")
        })
})

//read
AppointmentRoutes.route('/').get(async function (req, res) {
    try{
        const appointment = await Appointment.find();
        res.json(appointment);
    }
    catch (err){
        console.log(err);
    }
})

//readOne
AppointmentRoutes.route('/:id').get(async function (req, res) {
    try{
        const appointment = await Appointment.find({_id: req.params.id});
        res.json(appointment);
    }
    catch (err) {
        console.log(err);
    }
  });
  





//delete
AppointmentRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const appointment = await Appointment.findByIdAndRemove({ _id: req.params.id });
      if (appointment) {
        res.json('Successfully removed');
      } else {
        res.json('Appointment not found');
      }
    } catch (err) {
      res.json(err);
    }
  });
  

// Update 
AppointmentRoutes.route('/update/:id').put(async (req, res) => {
    try {
      const appointment = await Appointment.findById(req.params.id);
  
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

  
      appointment.name = req.body.name;
    appointment.email = req.body.email;
    appointment.phone = req.body.phone;
    appointment.petName = req.body.petName;
    appointment.Species = req.body.Species;
    appointment.Breed = req.body.Breed;
    appointment.Reason = req.body.Reason;
    appointment.note = req.body.note;
    
      await appointment.save();
      res.json(appointment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //count
AppointmentRoutes.route('/get/count').get(async function (req, res) {
  try {
    const count = await Appointment.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


module.exports = AppointmentRoutes;
