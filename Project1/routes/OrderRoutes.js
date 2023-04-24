const express = require('express');
const orderRoutes = express.Router(); 

let Order = require ( "../models/Order");

//insert
orderRoutes.route('/add').post(function(req,res) {
    let order = new Order(req.body);
    order.save()
        .then(order => {
            res.status(200).json({'order': 'order added succesfully'});
        })
        .catch (err => {
            res.status(400).send ("Unable to save")
        })
})

//read
orderRoutes.route('/').get(async function (req, res) {
    try{
        const order = await Order.find();
        res.json(order);
    }
    catch (err){
        console.log(err);
    }
})

//readOne
orderRoutes.route('/:id').get(async function (req, res) {
    try{
        const order = await Order.find({_id: req.params.id});
        res.json(order);
    }
    catch (err) {
        console.log(err);
    }
  });
  





//delete
orderRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const order = await Order.findByIdAndRemove({ _id: req.params.id });
      if (order) {
        res.json('Successfully removed');
      } else {
        res.json('Service not found');
      }
    } catch (err) {
      res.json(err);
    }
  });
  

// Update 
orderRoutes.route('/update/:id').put(async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      
  
      order.orderStates = req.body.orderStates;
      order.selectedItem = req.body.selectedItem;
      order.selectedItemQty = req.body.selectedItemQty;
      
  
      await order.save();
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //count
  orderRoutes.route('/get/count').get(async function (req, res) {
  try {
    const count = await Order.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


module.exports = orderRoutes;
