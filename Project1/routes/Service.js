const express = require('express');
const serviceRoutes = express.Router(); 

let Service = require ( "../models/Services");

//insert
serviceRoutes.route('/add').post(function(req,res) {
    let service = new Service(req.body);
    service.save()
        .then(service => {
            res.status(200).json({'service': 'service added succesfully'});
        })
        .catch (err => {
            res.status(400).send ("Unable to save")
        })
})

//read
serviceRoutes.route('/').get(async function (req, res) {
    try{
        const service = await Service.find();
        res.json(service);
    }
    catch{
        console.log(err);
    }
})

//readOne
serviceRoutes.route('/:id').get(async function (req, res) {
    try{
        const service = await Service.find({_id: req.params.id});
        res.json(service);
    }
    catch{
        console.log(err);
    }
  });
  





//delete
serviceRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const service = await Service.findByIdAndRemove({ _id: req.params.id });
      if (service) {
        res.json('Successfully removed');
      } else {
        res.json('Service not found');
      }
    } catch (err) {
      res.json(err);
    }
  });
  
// Update 
serviceRoutes.route('/update/:id').put(async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);
  
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
  
      if (!req.body.service_name || !req.body.service_price) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      service.service_name = req.body.service_name;
      service.service_price = req.body.service_price;
  
      await service.save();
      res.json(service);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
module.exports = serviceRoutes;
