var express = require ('express');
var fileUpload = require('express-fileupload'); 
var path = require('path');
var cors = require('cors');
const app = express();

var bodyParser = require ('body-parser');


//file upload intializer
app.use(fileUpload());

//db connection
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
)


app.use(cors());

const mongoURI = 'mongodb+srv://sauni:sauni123@clinicdb.jsgqyav.mongodb.net/?retryWrites=true&w=majority';

const connectionParams ={
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect (mongoURI, connectionParams)
    
.then (()=>{console.log('MongoDB Connected'); })

.catch((err) => console.log('DB Connection Error', err));

app.listen(port, () => {
    console.log("Server is listening on port " + port);
})



//route paths
var Users = require('./routes/Users');
app.use('/users', Users);

var serviceRoutes = require('./routes/Service');
app.use('/service', serviceRoutes);




var admissionRoutes = require('./routes/Admission');
app.use('/admission',admissionRoutes);

