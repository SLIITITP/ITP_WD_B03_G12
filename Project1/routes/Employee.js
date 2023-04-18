const express = require('express');

const employeeRoutes = express.Router(); 

const Emp= require('../models/Employee');



//insert
employeeRoutes.route('/add').post(async function(req,res) {
    try {
        const today = new Date();
        const employeeData = {
         name:req.body.name,
         lname:req.body.lname,
         NIC:req.body.NIC,
         phoneno:req.body.phoneno,
         address:req.body.address,
         gender:req.body.gender,
         birthday:req.body.birthday,
         jobrole:req.body.jobrole,

          created: today
        };
  
        const employee = await Emp.findOne({ NIC:req.body.NIC });
  
        if (!employee) {
        let employee = new Emp(req.body);
        employee.save()
            .then(employee => {
                res.status(200).json({'employee': 'employee added succesfully'});
            })
            .catch (err => {
                res.status(400).send ("Unable to save")
            })
        }
        else {
          res.json({ error: "Employee already added" });
        }
      } catch (err) {
        res.send("error" + err);
      }
  })

//readAll
employeeRoutes.route('/').get(async function (req, res) {
  try{
      const employee = await Emp.find();
      res.json(employee);
  }
  catch{
      console.log(err);
  }
})

//delete
employeeRoutes.route('/delete/:id').get(async (req, res) => {
  try {
    const employee = await Emp.findByIdAndRemove({_id: req.params.id });
    
    if (employee) {
      res.json('Successfully removed');
    } else {
      res.json('Employee not found');
    }
  } catch (err) {
    res.json(err);
  }
});

// Update 
employeeRoutes.route('/update/:id').put(async (req, res) => {
  try {
    const employee = await Emp.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    employee.name = req.body.name;
    employee.lname = req.body.lname;
    employee.NIC = req.body.NIC
    employee.phoneno = req.body.phoneno
    employee.address = req.body.address
    employee.gender = req.body.gender
    employee.birthday = req.body.birthday
    employee.jobrole = req.body.jobrole

    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports =employeeRoutes;
