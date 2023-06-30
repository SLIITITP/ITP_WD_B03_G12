const express = require('express');
const adminOrderRoutes = express.Router(); 

let AdminOrderp = require ( "../models/AdminOrder");

//insert
adminOrderRoutes.route('/add').post(function(req,res) {
    let adminOrder = new AdminOrderp(req.body);
    adminOrder.save()
        .then(adminOrder => {
            res.status(200).json({'adminOrder': 'adminOrder added succesfully'});
        })
        .catch (err => {
            res.status(400).send ("Unable to save")
        })
})

//read
adminOrderRoutes.route('/').get(async function (req, res) {
    try{
        const adminOrder = await AdminOrderp.find();
        res.json(adminOrder);
    }
    catch (err){
        console.log(err);
    }
})

//readOne
adminOrderRoutes.route('/:id').get(async function (req, res) {
    try{
        const adminOrder = await AdminOrderp.find({_id: req.params.id});
        res.json(adminOrder);
    }
    catch (err) {
        console.log(err);
    }
  });
  





//delete
adminOrderRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const adminOrder = await AdminOrderp.findByIdAndRemove({ _id: req.params.id });
      if (adminOrder) {
        res.json('Successfully removed');
      } else {
        res.json('Service not found');
      }
    } catch (err) {
      res.json(err);
    }
  });
  

// Update 
adminOrderRoutes.route('/update/:id').put(async (req, res) => {
    try {
      const adminOrder = await AdminOrderp.findById(req.params.id);
  
      if (!adminOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      
  
      adminOrder.orderStates = req.body.orderStates;
      adminOrder.selectedItem = req.body.selectedItem;
      adminOrder.selectedItemQty = req.body.selectedItemQty;
      adminOrder.paymentMethod = req.body.paymentMethod;
      adminOrder.totalPrice = req.body.totalPrice;
      adminOrder.orderDate = req.body.orderDate;
      adminOrder.addressLine1 = req.body.addressLine1;
      adminOrder.addressLine2 = req.body.addressLine2;
      adminOrder.city = req.body.city;
      adminOrder.postalCode = req.body.postalCode;
    
  
      await adminOrder.save();
      res.json(adminOrder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //count
  adminOrderRoutes.route('/get/count').get(async function (req, res) {
  try {
    const count = await AdminOrderp.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


module.exports = adminOrderRoutes;
