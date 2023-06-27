import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import Insights from "./Insights";

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
<div style={{ background: "pink", marginLeft:"20px"}}>
  <div >
      
    <h1>OverView</h1>
    <Row>
    <Col style={{textAlign: 'center', padding:"10px", border: "1px solid black"}}>
    <h3>Employees</h3>
    <h3 style={{textAlign: 'center'}}>{countEmp}</h3>
    </Col> 

    <Col style={{textAlign: 'center', border: "1px solid black", padding:"10px", width:"100px"}}>
    <h3>Registered Animals</h3>
    <h3>{countAnimal}</h3></Col> 
     
    <Col style={{textAlign: 'center', border: "1px solid black", padding:"10px", width:"100px"}}><h3>Registered Users</h3>
    <h3>{countUsers}</h3></Col>
    </Row>
    
    <Row> 
      <Col style={{textAlign: 'center', border: "1px solid black", padding:"10px"}} >
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
    
    <Col style={{textAlign: 'center', border: "1px solid black", padding:"10px"}}>
    <h3>Inpatients</h3> 
    <h3>{countInpatient}</h3>
    </Col>
    
    <Col style={{textAlign: 'center', border: "1px solid black", padding:"10px"}}>
    <h3>All Items</h3>
    <h3>{countItem}</h3>
    </Col>
   </Row>
   
   <Row>
      <Col style={{textAlign: 'center', border: "1px solid black", padding:"10px", width:"100px"}}>
      <h3>Suppliers</h3>
      <h3>{countSupplier}</h3>
      </Col>
    
    
    <Col style={{textAlign: 'center', border: "1px solid black", padding:"10px", width:"100px"}}>
    <h3>Ongoing Order</h3>
    <h3>{countOrder}</h3>
    </Col>
    
   
    
    </Row>
    <Row>
    <Col style={{textAlign: 'center', border: "1px solid black", padding:"10px", width:"100px"}}>
    <h3>Ongoing Appointments</h3>
    <h3>{countAppointment}</h3>
    </Col>

      <Col  style={{textAlign: 'center', border: "1px solid black", padding:"10px", width:"100px"}}>
      <h3>Vaccine</h3>
      <h3>{countEmp}</h3> 
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
