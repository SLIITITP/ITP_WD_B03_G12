const express = require('express');
const inpatientRoutes = express.Router();
let InPatient =require("../models/InPatient");


//insert operation
inpatientRoutes.route('/add').post(function(req,res){
    let inpatient = new InPatient(req.body);
    inpatient.save()
    .then(inpatient =>{
      
        res.status(200).json({'inpatient': 'added'});
    })
    .catch(err =>{
        res.status(400).send("noooo")

    })

  
})


    //Reading part

    inpatientRoutes.route('/').get(async function (req, res) {
        try{
            const inpatient = await InPatient.find();
            res.json(inpatient);
        }
        catch{
            console.log(err);
        }
    })

     //Update Operation
     inpatientRoutes.route('/update/:id').put(async (req,res) =>{
        try {
            const inpatient = await InPatient.findById(req.params.id);

            if(!inpatient){
                return res.status(400).json({error:' not Found'});
            }
            
            if(!req.body.first_name ||!req.body.last_name ||!req.body.contact_no ||!req.body.weight ||!req.body.diagnosis ||!req.body.shelter_type ||!req.body.special_notes ||!req.body.shelter_no ||!req.body.status){
                return res.status(400).json({error: 'Missing Required Fields!!'});

            }
            inpatient.first_name = req.body.first_name;
            inpatient.last_name = req.body.last_name;
            inpatient.contact_no  = req.body.contact_no ;
            inpatient.weight= req.body.weight;
            inpatient.diagnosis = req.body.diagnosis;
            inpatient.shelter_type  = req.body.shelter_type ;
            inpatient.special_notes= req.body.special_notes;
            inpatient.shelter_no= req.body.shelter_no;
            inpatient.status = req.body.status

            
            await inpatient.save();
            res.json(inpatient);

        } catch (err) {
            res.status(500).json({error: err.message});
            
        }
        
    });

    
    //Delete Operation

    inpatientRoutes.route('/delete/:id').get(async(req,res)=>{

        try {
         const inpatient = await InPatient.findByIdAndRemove({ _id: req.params.id});
         if(inpatient){
             res.json('Removed Successfully!');
         }else{
             res.json('Not Found!');
         }
         
        } catch (err) {
         res.json(err);
         
        }
     });


     //count
     inpatientRoutes.route('/get/count').get(async function (req, res) {
    try {
      const count = await InPatient.countDocuments();
      res.json(count);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  });

   
    module.exports = inpatientRoutes;



























    



   



