const express = require('express');

const payments = express.Router();

const cors = require('cors')

const jwt =  require ('jsonwebtoken')

const Payments = require('..models/Payments');

payments.use(cors());

payments.post('/addPayment', (req, res)  => {
    const today = new Date();
    const paymentData = {
        total: req.body.total,
        price: req.body.price,
        created: today
    }

}
)
