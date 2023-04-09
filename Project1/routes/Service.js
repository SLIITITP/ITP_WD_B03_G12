const express = require('express');
const serviceRoutes = express.Router(); 

let Service = require ( "../models/Services");

//insert
serviceRoutes.route('/add').post(function(req,res) {
    let service = new Service(req.body);
    service.save()
        .then(service => {
            res.status(200).json({'service': 'service added succesfully'});
        })
        .catch (err => {
            res.status(400).send ("Unable to save")
        })
})

//read
serviceRoutes.route('/').get(function (req, res) {
    Service.find(function (err, service) {
        if(err){
            console.log(err);
        }else{
            res.json(service);
        }
    });
});

//delete
serviceRoutes.route('/delete/:id').get(function(req,res) {
    Service.findByIdAndRemove({_id: req.params.id}, function (err,service) {
        if(err) res.json(err);
        else res.json('Successfullly removed');
    })
});

module.exports = serviceRoutes;
