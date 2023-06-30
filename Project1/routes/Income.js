const express = require('express');
const incomeRoutes = express.Router(); 

let Income = require ( "../models/Income");

//insert
incomeRoutes.route('/add').post(function(req,res) {
    let income = new Income(req.body);
    income.save()
        .then(income => {
            res.status(200).json({'income': 'income added succesfully'});
        })
        .catch (err => {
            res.status(400).send ("Unable to save")
        })
})

//read
incomeRoutes.route('/').get(async function (req, res) {
    try{
        const income = await Income.find();
        res.json(income);
    }
    catch (err){
        console.log(err);
    }
})

//readOne
incomeRoutes.route('/:id').get(async function (req, res) {
    try{
        const income = await Income.find({_id: req.params.id});
        res.json(income);
    }
    catch (err) {
        console.log(err);
    }
  });
  





//delete
incomeRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const income = await Income.findByIdAndRemove({ _id: req.params.id });
      if (income) {
        res.json('Successfully removed');
      } else {
        res.json('Service not found');
      }
    } catch (err) {
      res.json(err);
    }
  });
  



  //count
  incomeRoutes.route('/get/count').get(async function (req, res) {
  try {
    const count = await Income.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


module.exports = incomeRoutes;
