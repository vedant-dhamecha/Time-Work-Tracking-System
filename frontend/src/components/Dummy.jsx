// import React, { useEffect,useState } from "react";
// import { Select } from 'antd';

// export default function Dummy() {
   
//   var empEmails = []
//   var emailss = []
//   const [emails, setEmails] = useState([])
   
//   useEffect(async () => {
//     const res = await fetch("http://localhost:3218/getEmployees", {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       credentials: 'include'
//     });
//     empEmails = await res.json();
//     console.log('empEmails :>> ', empEmails);

//     emailss = empEmails.map(e => ({
//       value: e,
//       label: e,
//     }));

//     console.log('emails :>> ', emails);
//     setEmails(emailss)
//   }, [])

//   const handleChange = (value) => {
//     console.log(`selected ${value}`);
//   };



//    return (
//      <>
//       <Select
//         showSearch
//         style={{
//           width: 200,
//         }}
//         placeholder="Search to Select"
//         optionFilterProp="children"
//         filterOption={(input, option) => (option?.label ?? '').includes(input)}
//         filterSort={(optionA, optionB) =>
//           (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
//         }
//         options={emails}
//       />
//      </>
//    )
// }
