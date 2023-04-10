var express = require ('express');
var fileUpload = require('express-fileupload'); 
var path = require('path');
var cors = require('cors');

var bodyParser = require ('body-parser');


var serviceRoutes = require('./routes/Service');

const app = express();

const mongoose = require('mongoose');
//initialize port number
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

app.use('/service', serviceRoutes);

//file upload intializer
app.use(fileUpload());





var corsOptions = {
    origin: '*',
    optionSuccessStatus:200,
}


app.use(cors(corsOptions));


const mongoURI = 'mongodb+srv://sauni:sauni123@clinicdb.jsgqyav.mongodb.net/?retryWrites=true&w=majority';


const connectionParams ={
    useUnifiedTopology: true
}

mongoose.connect (mongoURI, connectionParams)
    
.then (()=>{console.log('MongoDB Connected'); })

.catch((err) => console.log('DB Connection Error', err));




var Users = require('./routes/Users');

app.use('/users', Users);

app.listen(port, () => {
    console.log("Server is listening on port " + port);
})

