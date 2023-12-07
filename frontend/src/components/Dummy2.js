import React, { useState,useEffect } from 'react';
import { Chart, Tooltip, Title, ArcElement, Legend } from 'chart.js'; // Import from 'chart.js'
import { Pie } from 'react-chartjs-2';
Chart.register(
  Tooltip,Title,ArcElement,Legend
)

function Dummy2() {
  const [project,setProject] = useState(
    {
      datasets: [{
        data:[],
        backgroundColor:[]
      }
    ],
    labels:[]
    }

  );

useEffect(() => {
  const getAllProjects = async () => {
    try {
        const res = await fetch("http://localhost:3218/getAllProjects", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const dataa = await res.json();
        
        const label = [];
        const data = [];

        for(var i of dataa){
          label.push(i.projectTitle);
          data.push(i.workTime);
        }

        setProject(
          {
            datasets: [{
              data:data,
              backgroundColor:[
                'red',
                'blue',
                'yellow',
                'green',
                'gray',
                'pink'
              ]
            }
          ],
          labels: label
          }
        )
        console.log(project)
    } catch (err) {
        console.log('err in info card :>> ', err);
    }
}


    getAllProjects();
}, [])

  return (
    <div style={{width:"30%", height:"30%"}}>
      <Pie data={project} />
    </div>
  );
}

export default Dummy2;
