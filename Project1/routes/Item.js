const express = require('express');
const itemRoutes = express.Router(); 

let Item = require ( "../models/Items");

//insert
itemRoutes.route('/add').post(function(req,res) {
/*  try {
    
    const itemData ={
      name:req.body.name,
      category:req.body.category,
      price:req.body.price,
      Supplier:req.body.Supplier,
      description:req.body.description,
      qty:req.body.qty,
      manufacture_date:req.body.manufacture_date,
      expire_date:req.body.expire_date,
      image: req.body.image
    };

    const item =  Item.findOne({name:req.body.name});

    if(!item){
      let item = new Item(req.body);
      item.save()
        .then(item=>{
          res.status(200).json({'item':'item added succesfully'});
        })
        .catch (err=>{
          res.status(400).send ("Unable to add")   
       })
    }
    else{
      res.json({error:"Item already add"});
    }
  }catch(err){
    res.send("error"+err);
  }
})  */


    let item = new Item(req.body);
    item.save()
        .then(item => {
            res.status(200).json({'item': 'item added succesfully'});
        })
        .catch (err => {
            res.status(400).send ("Unable to save")
        })
})

//read
itemRoutes.route('/').get(async function (req, res) {
    try{
        const item = await Item.find();
        res.json(item);
    }
    catch{
        console.log(error);
    }
})

//delete
itemRoutes.route('/delete/:id').get(async (req, res) => {
    try {
      const item = await Item.findByIdAndRemove({ _id: req.params.id });
      if (item) {
        res.json('Successfully removed');
      } else {
        res.json('Item not found');
      }
    } catch (err) {
      res.json(err);
    }
  });

  
  // Update 
itemRoutes.route('/update/:id').put(async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
  
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      item. name = req.body.item_name;
      item. category = req.body.item_category;
      item. price  = req.body.item_price;
      item. Supplier = req.body.item_Supplier;
      item.description = req.body.item_description;
      item. qty = req.body.item_qty;
      item. re_order = req.body.item_re_order;
      item.manufacture_date = req.body.item_manufacture_date;
      item. expire_date = req.body.item_expire_date;
     

      await item.save();
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });




 //count
 itemRoutes.route('/get/count').get(async function (req, res) {
  try {
    const count = await Item.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});




module.exports = itemRoutes;






