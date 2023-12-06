import React, { useEffect, useRef, useState } from "react";
import { Select } from 'antd';

import Chart from 'chart.js/auto';

export default function Dummy() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  var empEmails = []
  var emailss = []
  const [emails, setEmails] = useState([])

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const myChartRef = chartRef.current.getContext('2d');

    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: ["Label 1", "Label 2", "Label 3"],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255,99,132)',
              'rgb(54,162,235)',
              'rgb(255,205,)'
            ]
          }
        ]
      }
    })
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])
  useEffect(async () => {
    const res = await fetch("http://localhost:3218/getEmployees", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    empEmails = await res.json();
    console.log('empEmails :>> ', empEmails);

    emailss = empEmails.map(e => ({
      value: e,
      label: e,
    }));

    console.log('emails :>> ', emails);
    setEmails(emailss)
  }, [])

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };



  return (
    <>
      <canvas ref={chartRef} />

      <Select
        showSearch
        style={{
          width: 200,
        }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={emails}
      />
    </>
  );
};
