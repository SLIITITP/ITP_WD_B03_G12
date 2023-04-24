const express = require('express');
const paymentRoutes = express.Router(); 

let Payment = require ( "../models/Payments");

//insert
paymentRoutes.route('/add').post(function(req,res) {
    let payment = new Payment(req.body);
    payment.save()
        .then(payment => {
            res.status(200).json({'payment': 'payment added succesfully'});
        })
        .catch (err => {
            res.status(400).send ("Unable to save")
        })
})

//read
paymentRoutes.route('/').get(async function (req, res) {
    try{
        const payment = await Payment.find();
        res.json(payment);
    }
    catch (err){
        console.log(err);
    }
})





//delete
paymentRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const payment = await Payment.findByIdAndRemove({ _id: req.params.id });
      if (payment) {
        res.json('Successfully removed');
      } else {
        res.json('Payment not found');
      }
    } catch (err) {
      res.json(err);
    }
  });
  

// Update 
paymentRoutes.route('/update/:id').put(async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id);
  
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }

  
      payment.pay_total = req.body.pay_total;
      payment.pay_cashierName = req.body.pay_cashierName;
      payment.pay_date = req.body.pay_date;
  
      await payment.save();
      res.json(payment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  //count
  paymentRoutes.route('/get/count').get(async function (req, res) {
  try {
    const count = await Payment.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


module.exports = paymentRoutes;

