const express = require('express');
const supplierRoutes = express.Router(); 

let Supplier = require ( "../models/Suppliers");









//insert
supplierRoutes.route('/add').post(async function(req,res) {
  try {
      const today = new Date();
      const supplier_data = {
       company_name:req.body.company_name,
       person1_first_name:req.body.person1_first_name,
       person1_last_name:req.body.person1_last_name,
       Person2_first_name:req.body.person2_first_name,
       Person2_last_name:req.body.person2_last_name,
       email1:req.body.email1,
       email2:req.body.email2,
       contact_no1:req.body.contact_no1,
       contact_no2:req.body.contact_no2,

        created: today
      };

      const supplier = await Supplier.findOne({ company_name:req.body.company_name });

      if (!supplier) {
      let supplier = new Supplier(req.body);
      supplier.save()
          .then(supplier => {
              res.status(200).json({'supplier': 'supplier added succesfully'});
          })
          .catch (err => {
              res.status(400).send ("Unable to save")
          })
      }
      else {
        res.json({ error: "Supplier already added" });
      }
    } catch (err) {
      res.send("error" + err);
    }
})







//read
supplierRoutes.route('/').get(async function (req, res) {
    try{
        const supplier = await Supplier.find();
        res.json(supplier);
    }
    catch{
        console.log(error);
    }
})


//delete
supplierRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const supplier = await Supplier.findByIdAndRemove({ _id: req.params.id });
      if (supplier) {
        res.json('Successfully removed');
      } else {
        res.json('Supplier not found');
      }
    } catch (err) {
      res.json(err);
    }
  });



  // Update 
supplierRoutes.route('/update/:id').put(async (req, res) => {
    try {
      const supplier = await Supplier.findById(req.params.id);
  
      if (!supplier) {
        return res.status(404).json({ error: 'Supplier not found' });
      }
  
      supplier.company_name = req.body.company_name;
      supplier.person1_first_name = req.body.person1_first_name;
      supplier.person1_last_name  = req.body.person1_last_name;
      supplier.Person2_first_name = req.body.person2_first_name;
      supplier.Person2_last_name = req.body.person2_last_name;
      supplier.email1 = req.body.email1;
      supplier.email2 = req.body.email2;
      supplier.contact_no1 = req.body.contact_no1;
      supplier.contact_no2 = req.body.contact_no2;

      await supplier.save();
      res.json(supplier);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

   //count
supplierRoutes.route('/get/count').get(async function (req, res) {
  try {
    const count = await Supplier.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});
module.exports = supplierRoutes;


