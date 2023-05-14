var express = require ('express');
var path = require('path');
var cors = require('cors');

var bodyParser = require ('body-parser');

const app = express();
const multer = require('multer');



//file upload intializer
const FileItem = require('./models/FilesItem');


const storageItem = multer.diskStorage({
  destination: 'myapp/public/itemsUpload/',
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save the file with the original filename
  },
});

const uploaditem = multer({ storageItem: storageItem });

app.post('/api/item', uploaditem.single('file'), (req, res) => {

  // Access the form data
  const fileItem = req.file;

    // Save the file to MongoDB
    const fileItemData = new FileItem({

        filename: fileItem.filename,
        originalname: fileItem.originalname,
        path: fileItem.path,

      });
      
      fileItemData.save()
      .then(() => {
        res.json({ message: 'File uploaded successfully' });
      })
      .catch((error) => {
        console.error('Error saving file to MongoDB:', error);
        res.status(500).json({ error: 'Failed to save file' });
        
      });
      
  // Move the uploaded file to a specific directory
  const filePathItem = path.join(__dirname, 'itemsUpload', fileItem.filename); // Define your desired directory path

});




//file upload intializer
const File = require('./models/File');




const storage = multer.diskStorage({
  destination: 'myapp/public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save the file with the original filename
  },
});
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {

  // Access the form data
  const file = req.file;

    // Save the file to MongoDB
    const fileData = new File({
        email: file.email,
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,

      });
      
      fileData.save()
      .then(() => {
        res.json({ message: 'File uploaded successfully' });
      })
      .catch((error) => {
        console.error('Error saving file to MongoDB:', error);
        res.status(500).json({ error: 'Failed to save file' });
        
      });
      
  // Move the uploaded file to a specific directory
  const filePath = path.join(__dirname, 'uploads', file.filename); // Define your desired directory path

});


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

var OrderRoutes = require('./routes/OrderRoutes');
app.use('/order', OrderRoutes);

var DeliveryRoutes = require('./routes/DeliveryRoutes');
app.use('/delivery', DeliveryRoutes);

var ItemOrderRoutes = require('./routes/ItemOrderRoutes');
app.use('/itemOrder', ItemOrderRoutes);

var OnlinePaymentRoutes = require('./routes/OnlinePaymentRoutes');
app.use('/onlinePayment', OnlinePaymentRoutes);

var AdminOrderRoutes = require('./routes/AdminOrderRoutes');
app.use('/adminOrder', AdminOrderRoutes);

var employeeloginRoutes = require('./routes/EmployeeLogin');
app.use('/accounts',employeeloginRoutes);

var paymentRoutes = require('./routes/Payments');
app.use('/payments', paymentRoutes);
var prescriptionRoutes = require('./routes/Prescription');
app.use('/prescription', prescriptionRoutes);

var vaccineRoutes = require('./routes/Vaccine');
app.use('/vaccine', vaccineRoutes);

var medicalrecordsRoutes = require('./routes/MedicalRecords');
app.use('/medicalrecords', medicalrecordsRoutes);

var shelterRoutes = require('./routes/Shelters');
app.use('/shelters', shelterRoutes);

var appointmentsRoutes = require('./routes/Appointments');
app.use('/appointments', appointmentsRoutes);
