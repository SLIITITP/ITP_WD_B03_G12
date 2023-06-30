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
         basicSal:req.body.basicSal,


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

    employee.name = req.body.employee_name;
    employee.lname = req.body.employee_lname;
    employee.NIC = req.body.employee_NIC
    employee.phoneno = req.body.employee_phoneno
    employee.address = req.body.employee_address
    employee.gender = req.body.employee_gender
    employee.birthday = req.body.employee_birthday
    employee.jobrole = req.body.employee_jobrole
    employee.basicSal = req.body.employee_basicSal

    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  //count
  employeeRoutes.route('/get/count').get(async function (req, res) {
    try {
      const count = await Emp.countDocuments();
      res.json(count);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  });


module.exports =employeeRoutes;
