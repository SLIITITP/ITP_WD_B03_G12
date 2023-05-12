import React, {Component, useState } from 'react';
import {Route, Routes,hook} from "react-router-dom";

import Navbar from './components/Navigation'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register';
import Profile from './components/Profile'
import Navbar2 from './components/NavigationClient';
import Navbar3 from './components/NavigationAdmin'
import ServiceList from './components/ServicesList'
import UserList from './components/UserList';
import EmployeeList from './components/EmployeeList'
import AppointmentList from './components/AppointmentList';
//import ServiceAdd from './Components/ServicesAdd'
import AnimalList from './components/AnimalList';
import AnimalTypeList from './components/AnimalTypeList';
import EmployeeLoginList from './components/EmployeeLoginList'
import PrescriptionList from './components/PrescriptionList';
import VaccineList from './components/VaccineList';
import MedicalRecordsList from './components/MedicalRecordsList';
import StoreCard from './components/StoreCard';
import ProccessOrder from './components/ProccessOrder';
import PaymentMethod from './components/PaymentMethod';
import PlacedOrder from './components/PlacedOrder';
import OrderList from './components/OrderList';


import PaymentList from './components/PayementList'

import ItemList from './components/ItemList';
import CategoryList from './components/CategoryList'
import Suppliers from './components/SupplierList';
import Admission from './components/AdmissionList';
import ShelterList from './components/ShelterList'
import CusAppointment from './components/CusAppointment';
import ServicePrintPreview from './components/ServicePrintPreview';

class App extends Component {


  render() {

    return(  

      
      
        <div className='App'>
          
          <Navbar/>
          <Navbar2/>
          <Navbar3/>

          <div className='container'>
         
          <Routes >
            <Route path = "/" element={<Landing/>}/>
            <Route path = "/register" element={<Register/>}/>
            <Route path = "/login" element={<Login/>}/>
            <Route path = "/profile" element={<Profile/>}/>
            <Route path = "/services" element={<ServiceList/>}/>
            <Route path = "/regUser" element={<UserList/>}/>
            <Route path = "/accounts" element={<EmployeeLoginList/>}/>
            <Route path = "/items" element={<ItemList/>}/>
            <Route path = "/prescriptions" element={<PrescriptionList/>}/>
            <Route path = "/category" element={<CategoryList/>}/>
            <Route path = "/supplier" element={<Suppliers/>}/>
            <Route path = "/admissions" element={<Admission/>}/>
            <Route path = "/shelters" element={<ShelterList/>}/>
            <Route path = "/orderList" element={<OrderList/>}/>
            <Route path = "/placedOrder" element={<PlacedOrder/>}/>
            <Route path = "/payee" element={<PaymentMethod/>}/>
            <Route path = "/proccess" element={<ProccessOrder/>}/>
            <Route path = "/store" element={<StoreCard/>}/>
            <Route path = "/medicalrecords" element={<MedicalRecordsList/>}/>
            <Route path = "/employees" element={<EmployeeList/>}/>

            <Route path = "/appointment" element={<AppointmentList/>}/>
            <Route path = "/CusAppointment" element={<CusAppointment/>}/>


            <Route path = "/animals" element={<AnimalList/>}/>
            <Route path = "/animaltype" element={<AnimalTypeList/>}/>
            <Route path = "/payments" element={<PaymentList/>}/>
            <Route path = "/servicePreview" element={<ServicePrintPreview/>}/>
            <Route path = "/vaccines" element={<VaccineList/>}/>



          </Routes>
         
          </div> 
          
        </div>
       
      );
  }
}

export default App;







