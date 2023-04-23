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
import EmployeeLoginList from './components/EmployeeLoginList'
import PrescriptionList from './components/PrescriptionList';
import VaccineList from './components/VaccineList';
import MedicalRecordsList from './components/MedicalRecordsList';
import StoreCard from './components/StoreCard';
import ProccessOrder from './components/ProccessOrder';
import PaymentMethod from './components/PaymentMethod';
import PlacedOrder from './components/PlacedOrder';
import OrderList from './components/OrderList';
import ItemList from './components/ItemList';

//import ServiceAdd from './Components/ServicesAdd'


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
            
            <Route path = "/employees" element={<EmployeeList/>}/>
            <Route path = "/accounts" element={<EmployeeLoginList/>}/>
            <Route path = "/items" element={<ItemList/>}/>
            
          </Routes>
         
          </div> 
          
        </div>
       
      );
  }
}

export default App;


