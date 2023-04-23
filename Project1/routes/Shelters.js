const express = require('express');
const shelterRoutes = express.Router();
let Shelter = require("../models/Shelters");


//inset Operation
shelterRoutes.route('/add').post(function(req,res){

    let shelter = new Shelter(req.body);
    shelter.save()
    .then(shelter =>{
        res.status(200).json({'shelter': 'Shelter Added'});

    })

    .catch(err =>{
        res.status(400).send("Not Added")

    })

})


  //Reading part

    
  shelterRoutes.route('/').get(async function (req, res) {
    try{
        const shelter = await Shelter.find();
        res.json(shelter);
    }
    catch{
        console.log(err);
    }
})



//Update Operation

shelterRoutes.route('/update/:id').put(async (req,res) =>{
    try {
        const shelter = await Shelter.findById(req.params.id);

        if(!shelter){
            return res.status(400).json({error:'Shelter not Found'});
        }
        
        if(!req.body.shelter_id ||!req.body.shelter_type ||!req.body.special_details ){
            return res.status(400).json({error: 'Missing Required Fields!!'});

        }
        admission.shelter_id = req.body.shelter_id;
        admission.shelter_type = req.body.shelter_type;
        admission.special_details  = req.body.special_details;
      

        
        await shelter.save();
        res.json(shelter);

    } catch (err) {
        res.status(500).json({error: err.message});
        
    }
    
});


//Delete Operation

shelterRoutes.route('/delete/:id').get(async(req,res)=>{

    try {
     const shelter = await Shelter.findByIdAndRemove({ _id: req.params.id});
     if(shelter){
         res.json('Removed Successfully!');
     }else{
         res.json('Not Found!');
     }
     
    } catch (err) {
     res.json(err);
     
    }
 });


 // count increment code


 shelterRoutes.route('/get/count').get(async function (req, res) {
    try {
      const count = await Shelter.countDocuments();
      res.json(count);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  });

  module.exports = shelterRoutes;