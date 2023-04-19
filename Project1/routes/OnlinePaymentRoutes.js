const express = require('express');
const onlinePaymentRoutes = express.Router(); 

let OnlinePayment = require ( "../models/OnlinePayment");

//insert
onlinePaymentRoutes.route('/add').post(function(req,res) {
    let onlinePayment = new OnlinePayment(req.body);
    onlinePayment.save()
        .then(onlinePayment => {
            res.status(200).json({'onlinePayment': 'onlinePayment added succesfully'});
        })
        .catch (err => {
            res.status(400).send ("Unable to save")
        })
})

//read
onlinePaymentRoutes.route('/').get(async function (req, res) {
    try{
        const onlinePayment = await OnlinePayment.find();
        res.json(onlinePayment);
    }
    catch (err){
        console.log(err);
    }
})

//readOne
onlinePaymentRoutes.route('/:id').get(async function (req, res) {
    try{
        const onlinePayment = await OnlinePayment.find({_id: req.params.id});
        res.json(onlinePayment);
    }
    catch (err) {
        console.log(err);
    }
  });
  





//delete
onlinePaymentRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const onlinePayment = await OnlinePayment.findByIdAndRemove({ _id: req.params.id });
      if (onlinePayment) {
        res.json('Successfully removed');
      } else {
        res.json('OnlinePayment not found');
      }
    } catch (err) {
      res.json(err);
    }
  });
  

// Update 
onlinePaymentRoutes.route('/update/:id').put(async (req, res) => {
    try {
      const onlinePayment = await OnlinePayment.findById(req.params.id);
  
      if (!onlinePayment) {
        return res.status(404).json({ error: 'onlinePayment not found' });
      }
  
      
      onlinePayment.orderId = req.body.orderId;
      onlinePayment.customerId = req.body.customerId;
      onlinePayment.totalPrice = req.body.totalPrice;
      onlinePayment.cardNumber = req.body.cardNumber;
      onlinePayment.validThru = req.body.validThru;
      onlinePayment.cvc = req.body.cvc;
      
      
  
      await onlinePayment.save();
      res.json(onlinePayment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //count
  onlinePaymentRoutes.route('/get/count').get(async function (req, res) {
  try {
    const count = await OnlinePayment.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


module.exports = onlinePaymentRoutes;
