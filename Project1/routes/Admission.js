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
    







    //Update to be imp

    

    //Delete Operation

    admissionRoutes.route('/delete/:id').get(function(req,res){
        Admission.findByIdAndRemove({_id: req.params.id}, function (err,admission) {
            if(err) res.json(err);
            else res.json('Successfully Removed');

        })

    });
    module.exports = admissionRoutes;



























    



   



