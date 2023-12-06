import React, { useState, useEffect } from 'react';
import { Radio, Select, Space } from 'antd';




const App = () => {

  const [employees, setEmployees] = useState([])
  const [options, setOptions] = useState([])

  const handleChange = (value) => {
    console.log('value :>> ', value);
    setEmployees(value)
  };
  useEffect(async () => {
    const res = await fetch("http://localhost:3218/getEmployees", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    const data = await res.json();
    console.log('data :>> ', data);

    data?.map((emp => {
      console.log('emp.email :>> ', emp.email);

      setOptions(prev => [...prev, { value: emp.email, label: emp.email }])
    }))
  }, [])
  console.log('options :>> ', options);
  console.log('employees :>> ', employees);

  return (
    <>

      <Select
        mode="multiple"
        placeholder="select employees"
        onChange={handleChange}
        style={{
          width: '100%',
        }}
        options={options}
      />

    </>
  );
};
export default App;