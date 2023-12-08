import React, { useState,useEffect } from 'react';
import { Chart, Tooltip, Title, ArcElement, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'; // Import from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2';
Chart.register(
  Tooltip,Title,ArcElement,Legend, CategoryScale, LinearScale,BarElement
)

function Dummy2() {
  const [pie,setPie] = useState(
    {
      datasets: [{
        data:[],
        backgroundColor:[]
      }
    ],
    labels:[]
    }

  );
  const [bar,setBar] = useState(
    {
      labels:[],
      datasets:[{
        data:[],
        backgroundColor:[],
        borderColor:[]
      }
     ]
    }
  )

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
          data.push((i.workTime)/3600);
        }

        setPie(
          {
            datasets: [{
              data:data,
              backgroundColor:[
                'black',
                'orange',
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

        setBar(
          {
            labels: label,
            datasets: [{
              label:"Project vs Hours",
              data: data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'lightgreen',
                'lightblue',
                'orange',
                'lightred'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
                
              ],
              borderWidth: 1
            }]
          }
        )
    } catch (err) {
        console.log('err in info card :>> ', err);
    }
}
    getAllProjects();
}, [])

  return (
    <div>
    <div style={{width:"40%", height:"40%"}}>
      <Pie data={pie} />
    </div>
    <div style={{width:"50%", height:"40%", marginLeft: "700px", marginTop:"-400px"}}>
      <Bar data={bar}/>
    </div>
    </div>
  );
}

export default Dummy2;
