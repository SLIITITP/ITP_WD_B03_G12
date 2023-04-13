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
  

module.exports = serviceRoutes;
