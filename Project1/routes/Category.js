const express = require('express');
const categoryRoutes = express.Router(); 

let Category = require ( "../models/Categories");

//insert
categoryRoutes.route('/add').post(async function(req,res) {
  try {
      const today = new Date();
      const categoryData = {
       name:req.body.name,
       description:req.body.description,
       

        created: today
      };

      const category = await Category.findOne({ name:req.body.name });

      if (!category) {
      let category = new Category(req.body);
      category.save()
          .then(category => {
              res.status(200).json({'category': 'category added succesfully'});
          })
          .catch (err => {
              res.status(400).send ("Unable to save")
          })
      }
      else {
        res.json({ error: "Category already added" });
      }
    } catch (err) {
      res.send("error" + err);
    }
})

//read
categoryRoutes.route('/').get(async function (req, res) {
    try{
        const category = await Category.find();
        res.json(category);
    }
    catch{
        console.log(error);
    }
})


//delete
categoryRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const category = await Category.findByIdAndRemove({ _id: req.params.id });
      if (category) {
        res.json('Successfully removed');
      } else {
        res.json('Category not found');
      }
    } catch (err) {
      res.json(err);
    }
  });



  // Update 
categoryRoutes.route('/update/:id').put(async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      category.name = req.body.name;
      category.description = req.body.description;
     

      await category.save();
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

   //count
categoryRoutes.route('/get/count').get(async function (req, res) {
  try {
    const count = await Category.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});
module.exports = categoryRoutes;


