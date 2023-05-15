import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

const InsightsService = () => {
  const [service, setService] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/service/');
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
    name: item.service_name,
    value: parseFloat(item.service_price),
  }));

  const [asideActive, setAsideActive] = useState(false);

  const toggleAside = () => {
    setAsideActive(!asideActive);
  };

  return (
    <>
    <div>
      <h1>Service Insights</h1>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
           <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
      
        </PieChart>
      </ResponsiveContainer>
    </div> 

   

    </>
  );
};

export default InsightsService;
