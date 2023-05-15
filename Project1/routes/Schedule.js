const express = require('express');
const ScheduleRoutes = express.Router(); 

let Schedule = require ( "../models/Schedule.js");

//insert
ScheduleRoutes.route('/add').post(async function(req,res) {
  try {
      const today = new Date();
      const Scheduledata = {
       name:req.body.name,
       lname:req.body.lname,
       created: today
      };

      const schedule = await sch.findOne({ NIC:req.body.name });

      if (!schedule) {
      let schedule = new sch(req.body);
      schedule.save()
          .then(schedule => {
              res.status(200).json({'schedule': 'schedule added succesfully'});
          })
          .catch (err => {
              res.status(400).send ("Unable to save")
          })
      }
      else {
        res.json({ error: "schedule already added" });
      }
    } catch (err) {
      res.send("error" + err);
    }
})

//readAll
ScheduleRoutes.route('/').get(async function (req, res) {
try{
    const schedule = await sch.find();
    res.json(schedule);
}
catch{
    console.log(err);
}
})

//delete
ScheduleRoutes.route('/delete/:id').get(async (req, res) => {
try {
  const schedule = await sch.findByIdAndRemove({_id: req.params.id });
  
  if (schedule) {
    res.json('Successfully removed');
  } else {
    res.json('schedule not found');
  }
} catch (err) {
  res.json(err);
}
});

// Update 
ScheduleRoutes.route('/update/:id').put(async (req, res) => {
try {
  const schedule = await sch.findById(req.params.id);

  if (!schedule) {
    return res.status(404).json({ error: 'schedule not found' });
  }

  schedule.name = req.body.schedule_name;
  schedule.lname = req.body.schedule_lname;

  await schedule.save();
  res.json(schedule);
} catch (err) {
  res.status(500).json({ error: err.message });
}
});

//count
ScheduleRoutes.route('/get/count').get(async function (req, res) {
  try {
    const count = await sch.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});



module.exports = ScheduleRoutes;
