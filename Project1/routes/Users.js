const express = require('express');

const users = express.Router(); 

const cors = require('cors');  // resources sharing

const jwt = require('jsonwebtoken'); // secure transfer data

const bcrypt = require('bcrypt'); //password storing as #

const User = require('../models/User');

users.use(cors());

process.env.SECRET_KEY = 'secret'; 


//insert
users.post('/register', async (req, res) => {
    try {
      const today = new Date();
      const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
      };
  
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        const hash = await bcrypt.hash(req.body.password, 10);
        userData.password = hash;
        const newUser = await User.create(userData);
        res.json({ status: newUser.email + " registered" });
      } else {
        res.json({ error: "User Already Registered" });
      }
    } catch (err) {
      res.send("error" + err);
    }
  });
  

  users.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
          };
          const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 1140 });
          res.send(token);
        } else {
          res.json({ error: "Incorrect password" });
        }
      } else {
        res.json({ error: "User does not exist in the system" });
      }
    } catch (err) {
      res.send("error" + err);
    }
  });
  



  users.get('/profile', async (req, res) => {
    try {
      const token = req.headers['authorization'];
      if (!token) {
        res.send("Invalid User");
        return;
      }
  
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findOne({ _id: decoded._id });
  
      if (user) {
        res.json(user);
      } else {
        res.send("Invalid User");
      }
    } catch (err) {
      res.send("Error" + err);
    }
  });
  

module.exports = users;
