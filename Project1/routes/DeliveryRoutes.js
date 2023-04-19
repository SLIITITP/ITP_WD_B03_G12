const express = require('express');
const deliveryRoutes = express.Router(); 

let Delivery = require ( "../models/Delivery");

//insert
deliveryRoutes.route('/add').post(function(req,res) {
    let delivery = new Delivery(req.body);
    delivery.save()
        .then(delivery => {
            res.status(200).json({'delivery': 'delivery added succesfully'});
        })
        .catch (err => {
            res.status(400).send ("Unable to save")
        })
})

//read
deliveryRoutes.route('/').get(async function (req, res) {
    try{
        const delivery = await Delivery.find();
        res.json(delivery);
    }
    catch (err){
        console.log(err);
    }
})

//readOne
deliveryRoutes.route('/:id').get(async function (req, res) {
    try{
        const delivery = await Delivery.find({_id: req.params.id});
        res.json(delivery);
    }
    catch (err) {
        console.log(err);
    }
  });
  





//delete
deliveryRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const delivery = await Delivery.findByIdAndRemove({ _id: req.params.id });
      if (delivery) {
        res.json('Successfully removed');
      } else {
        res.json('Service not found');
      }
    } catch (err) {
      res.json(err);
    }
  });
  

// Update 
deliveryRoutes.route('/update/:id').put(async (req, res) => {
    try {
      const delivery = await Delivery.findById(req.params.id);
  
      if (!delivery) {
        return res.status(404).json({ error: 'Delivery not found' });
      }
  
      
      delivery.orderId = req.body.orderId;
      delivery.addressLine1 = req.body.addressLine1;
      delivery.addressLine2 = req.body.addressLine2;
      delivery.city = req.body.city;
      delivery.postalCode = req.body.postalCode;
      
  
      await delivery.save();
      res.json(delivery);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //count
  deliveryRoutes.route('/get/count').get(async function (req, res) {
  try {
    const count = await Delivery.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


module.exports = deliveryRoutes;
