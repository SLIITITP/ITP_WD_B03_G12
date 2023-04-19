const express = require('express');
const itemOrderRoutes = express.Router(); 

let ItemOrder = require ( "../models/ItemOrder");

//insert
itemOrderRoutes.route('/add').post(function(req,res) {
    let itemOrder = new ItemOrder(req.body);
    itemOrder.save()
        .then(itemOrder => {
            res.status(200).json({'itemOrder': 'itemOrder added succesfully'});
        })
        .catch (err => {
            res.status(400).send ("Unable to save")
        })
})

//read
itemOrderRoutes.route('/').get(async function (req, res) {
    try{
        const itemOrder = await ItemOrder.find();
        res.json(itemOrder);
    }
    catch (err){
        console.log(err);
    }
})

//readOne
itemOrderRoutes.route('/:id').get(async function (req, res) {
    try{
        const itemOrder = await ItemOrder.find({_id: req.params.id});
        res.json(itemOrder);
    }
    catch (err) {
        console.log(err);
    }
  });
  





//delete
itemOrderRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const itemOrder = await ItemOrder.findByIdAndRemove({ _id: req.params.id });
      if (itemOrder) {
        res.json('Successfully removed');
      } else {
        res.json('itemOrder not found');
      }
    } catch (err) {
      res.json(err);
    }
  });
  

// Update 
itemOrderRoutes.route('/update/:id').put(async (req, res) => {
    try {
      const itemOrder = await ItemOrder.findById(req.params.id);
  
      if (!itemOrder) {
        return res.status(404).json({ error: 'itemOrder not found' });
      }
  
      
      itemOrder.orderId = req.body.orderId;
      itemOrder.itemId = req.body.itemId;
      
      
  
      await itemOrder.save();
      res.json(itemOrder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //count
  itemOrderRoutes.route('/get/count').get(async function (req, res) {
  try {
    const count = await ItemOrder.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


module.exports = itemOrderRoutes;
