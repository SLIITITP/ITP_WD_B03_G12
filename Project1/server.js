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

const mongoURI = 'mongodb+srv://admin:clinic123@clinicdb.m0vlu3p.mongodb.net/ClinicDB?retryWrites=true&w=majority';

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

var supplierRoutes = require('./routes/Supplier');
app.use('/supplier',supplierRoutes);

var animalRoutes = require('./routes/Animal');
app.use('/animal', animalRoutes);

var employeeRoutes = require('./routes/Employee');
app.use('/employee',employeeRoutes);

var itemRoutes = require('./routes/Item');
app.use('/item',itemRoutes);

var categoryRoutes = require('./routes/Category');
app.use('/category',categoryRoutes);

var animaltypeRoutes = require('./routes/AnimalType');
app.use('/animaltype', animaltypeRoutes);

var animalbreedRoutes = require('./routes/AnimalBreed');
app.use('/animalbreed', animalbreedRoutes);