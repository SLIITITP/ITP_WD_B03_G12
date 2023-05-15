import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
<div style={{ display: "flex" }}>
  <div style={{width:"35em", background: "pink"}}>
    <h1>OverView</h1>
    <h3>Employees: {countEmp}</h3>
    <h3>Registered Animals: {countAnimal}</h3>
    <h3>Registered Users: {countUsers}</h3>
    <h3>Inpatients: {countInpatient}</h3>
    <h3>All Items: {countItem}</h3>
    <h3>Suppliers: {countSupplier}</h3>
    <h3>Ongoing Order: {countOrder}</h3>
    <h3>Ongoing Appointments: {countAppointment}</h3>
    <h3>Vaccine: {countEmp}</h3>
  </div>
  <div>
    <h1>Income Insights</h1>
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
  </div>
</div>


   <Insights/>
    <tbody>{Insights()}</tbody>
    </>
  );
};

export default InsightsService;
