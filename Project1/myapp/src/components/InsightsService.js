import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import Insights from "./Insights";
import "../components/CSS/insight.css"
    
const InsightsService = () => {
  const [service, setService] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/income/');
        setService(response.data);
      } catch (error) {
        console.log(error);
      } 
    };

    fetchData();
  }, []); 

  console.log(service); // Check if data is fetched correctly

  // Transform service data into an array of data points
  const data = service.map((item) => ({
    name: item.type,
    value: parseFloat(item.total),
  }));

  const [asideActive, setAsideActive] = useState(false);

  const toggleAside = () => {
    setAsideActive(!asideActive);
  };

  const [countEmp, setCountEmp] = useState(0);

useEffect(() => {
  axios
    .get("http://localhost:5000/employee/get/count")
    .then((response) => {
      console.log(response);
      setCountEmp(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

const [countAdmission, setCountAdmission] = useState(0);

useEffect(() => {
  axios
    .get("http://localhost:5000/admission/get/count")
    .then((response) => {
      console.log(response);
      setCountAdmission(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

const [countAnimal, setCountAnimal] = useState(0);

useEffect(() => {
  axios
    .get("http://localhost:5000/animal/get/count")
    .then((response) => {
      console.log(response);
      setCountAnimal(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

const [countAppointment, setCountAppointment] = useState(0);

useEffect(() => {
  axios
    .get("http://localhost:5000/appointments/get/count")
    .then((response) => {
      console.log(response);
      setCountAppointment(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

const [countAccounts, setCountAccounts] = useState(0);

useEffect(() => {
  axios
    .get("http://localhost:5000/accounts/get/count")
    .then((response) => {
      console.log(response);
      setCountAccounts(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

const [countInpatient, setCountInpatient] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/inpatient/get/count")
      .then((response) => {
        console.log(response);
        setCountInpatient(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [countItem, setCountItem] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/item/get/count")
      .then((response) => {
        console.log(response);
        setCountItem(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); 

  const [countOrder, setCountOrder] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/adminOrder/get/count")
      .then((response) => {
        console.log(response);
        setCountOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [countService, setCountService] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/service/get/count")
      .then((response) => {
        console.log(response);
        setCountService(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const [countShelter, setCountShelter] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/shelters/get/count")
      .then((response) => {
        console.log(response);
        setCountShelter(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [countSupplier, setCountSupplier] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/supplier/get/count")
      .then((response) => {
        console.log(response);
        setCountSupplier(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [countUsers, setCountUsers] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/get/count")
      .then((response) => {
        console.log(response);
        setCountUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const [countVaccine, setCountVaccine] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/vaccine/get/count")
      .then((response) => {
        console.log(response);
        setCountVaccine(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (
    <>
<div className="insights-container">
  <div > 
      
    <h1>OverView</h1>
    <Row>
    <Col className="insights-col"> 
      <h5>Employees</h5> 
    <h2 style={{textAlign: 'center'}}>{countEmp}</h2>
    </Col> 

    <Col className="insights-col">
        <h5>Registered Animals</h5>
    <h2>{countAnimal}</h2></Col> 
     
    <Col className="insights-col">
         <h5>Registered Users</h5> 
    <h2>{countUsers}</h2></Col>
    </Row>
    
    <Row> 
    <Col className="insights-col">
         <ResponsiveContainer width="100%" height={400}> 
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={70} 
          outerRadius={90}
          fill="#82ca9d"
          label
        />
      </PieChart>
    </ResponsiveContainer>
    </Col>
    
    <Col className="insights-col"> 
      <h5>Inpatients</h5> 
    <h2>{countInpatient}</h2>
    </Col>
    
    <Col className="insights-col"> 
     <h5>All Items</h5>
    <h2>{countItem}</h2>
    </Col> 



   </Row>
   
   <Row>
   <Col className="insights-col"> 
   <h5>Suppliers</h5>
      <h2>{countSupplier}</h2>
      </Col>
    
    
      <Col className="insights-col"> 
       <h5>Ongoing Order</h5>
    <h2>{countOrder}</h2>
    </Col>
    
   
    
    </Row>
    <Row>
    <Col className="insights-col">
      <h5>Ongoing Appointments</h5>
    <h2>{countAppointment}</h2>
    </Col>

    <Col className="insights-col">
        <h5>Vaccine</h5>
      <h2>{countEmp}</h2> 
      </Col> 
    </Row>
     
    
   
    
   
   
  </div>
 
</div>


   <Insights/>
    <tbody>{Insights()}</tbody>
    </>
  );
};

export default InsightsService;
