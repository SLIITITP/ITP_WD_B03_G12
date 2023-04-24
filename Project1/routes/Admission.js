const express = require('express');
const admissionRoutes = express.Router();
let Admission =require("../models/Admission");


//insert operation
admissionRoutes.route('/add').post(function(req,res){
    let admission = new Admission(req.body);
    admission.save()
    .then(admission =>{
      
        res.status(200).json({'admission': 'admission added'});
    })
    .catch(err =>{
        res.status(400).send("noooo")

    })

  
})


    //Reading part

    admissionRoutes.route('/').get(async function (req, res) {
        try{
            const admission = await Admission.find();
            res.json(admission);
        }
        catch{
            console.log(err);
        }
    })

     //Update Operation
     admissionRoutes.route('/update/:id').put(async (req,res) =>{
        try {
            const admission = await Admission.findById(req.params.id);

            if(!admission){
                return res.status(400).json({error:'Admission not Found'});
            }
            
            if(!req.body.first_name ||!req.body.last_name ||!req.body.contact_no ||!req.body.weight ||!req.body.diagnosis ||!req.body.shelter_type ||!req.body.special_notes ||!req.body.shelter_no){
                return res.status(400).json({error: 'Missing Required Fields!!'});

            }
            admission.first_name = req.body.first_name;
            admission.last_name = req.body.last_name;
            admission.contact_no  = req.body.contact_no ;
            admission.weight= req.body.weight;
            admission.diagnosis = req.body.diagnosis;
            admission.shelter_type  = req.body.shelter_type ;
            admission.special_notes= req.body.special_notes;
            admission.shelter_no= req.body.shelter_no;

            
            await admission.save();
            res.json(admission);

        } catch (err) {
            res.status(500).json({error: err.message});
            
        }
        
    });

    
    //Delete Operation

    admissionRoutes.route('/delete/:id').get(async(req,res)=>{

        try {
         const admission = await Admission.findByIdAndRemove({ _id: req.params.id});
         if(admission){
             res.json('Removed Successfully!');
         }else{
             res.json('Not Found!');
         }
         
        } catch (err) {
         res.json(err);
         
        }
     });


     //count
    admissionRoutes.route('/get/count').get(async function (req, res) {
    try {
      const count = await Admission.countDocuments();
      res.json(count);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  });

   
    module.exports = admissionRoutes;



























    



   



