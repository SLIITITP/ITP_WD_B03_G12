const express = require('express');

const employeeloginRoutes = express.Router(); 

const Empaccounts= require('../models/EmployeeLogin');



//insert
employeeloginRoutes.route('/add').post(async function(req,res) {
    try {
        const today = new Date();
        const employeeloginData = {
         email:req.body.email,
         password:req.body.password,
         acctype:req.body.acctype,
        created: today,
        };
  
        const employeelogin = await Empaccounts.findOne({ email:req.body.email });
  
        if (!employeelogin) {
        let employeelogin = new Empaccounts(req.body);
        employeelogin.save()
            .then(employeelogin => {
                res.status(200).json({'employeelogin': 'employee logged succesfully'});
            })
            .catch (err => {
                res.status(400).send ("Unable to save")
            })
        }
        else {
         res.json({ error: "Employee already logged in" });
        }
     } catch (err) {
       res.send("error" + err);
      }
  }) 

//readAll
employeeloginRoutes.route('/').get(async function (req, res) {
  try{
      const employeelogin = await Empaccounts.find();
      res.json(employeelogin);
  }
  catch{
      console.log(err);
  }
})

//delete
employeeloginRoutes.route('/delete/:id').get(async (req, res) => {
  try {
    const employeelogin = await Empaccounts.findByIdAndRemove({_id: req.params.id });
    
    if (employeelogin) {
      res.json('Successfully removed');
    } else {
      res.json('Employee not found');
    }
  } catch (err) {
    res.json(err);
  }
});

// Update 
employeeloginRoutes.route('/update/:id').put(async (req, res) => {
  try {
    const employeelogin = await Empaccounts.findById(req.params.id);

    if (!employeelogin) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    employeelogin.email = req.body.employeelogin_email;
    employeelogin.password = req.body.employeelogin_password;
    employeelogin.acctype = req.body.employeelogin_acctype
   

    await employeelogin.save();
    res.json(employeelogin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  //count
  employeeloginRoutes.route('/get/count').get(async function (req, res) {
    try {
      const count = await Empaccounts.countDocuments();
      res.json(count);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  });


module.exports =employeeloginRoutes;
