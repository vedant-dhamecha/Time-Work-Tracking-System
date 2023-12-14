import React, { useState, useEffect } from 'react';
import { Radio, Button } from 'antd';
import { Chart, Tooltip, Title, ArcElement, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'; // Import from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2';
Chart.register(
    Tooltip, Title, ArcElement, Legend, CategoryScale, LinearScale, BarElement
)

function AnalysisProjectVsTime() {
    const [option, setOption] = useState(null);
    const onChange = (e) => {
        setOption(e.target.value);
    };
    const [pie, setPie] = useState(
        {
            datasets: [{
                data: [],
                backgroundColor: []
            }
            ],
            labels: []
        }

    );
    const [bar, setBar] = useState(
        {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                borderColor: []
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

                for (var i of dataa) {
                    label.push(i.projectTitle);
                    data.push((i.workTime) / 3600);
                }

                setPie(
                    {
                        datasets: [{
                            data: data,
                            backgroundColor: [
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
                            label: "Project vs Hours",
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

    const handleDownloadCSV = async () => {
        try {
            const res = await fetch("http://localhost:3218/getAllProjects", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const dataa = await res.json();

            // Create a CSV string
            const csvContent = "data:text/csv;charset=utf-8," +
                "Project Title,Work Time(Hrs.)\n" +
                dataa.map(project => `${project.projectTitle}, ${project.workTime / 3600}`).join("\n");

            // Create a data URI and create a link element to trigger the download
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "Project vs Time.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.log('err in downloading CSV :>> ', err);
        }
    };
    return (
        <>
            <div className="container" style={{
                border: '0px solid red', display: 'flex', alignItems: 'center', flexDirection: 'column',
                height: '100%', paddingTop: '3vh'
            }}>
                <Radio.Group onChange={onChange} value={option} style={{ color: 'black', fontWeight: 'bold' }}>
                    <Radio value='bar' >Bar Graph</Radio>
                    <Radio value='pie'>Pie Chart</Radio>
                    <Button type='primary' onClick={handleDownloadCSV} style={{ width: '70px', height: '30px' }}>click</Button>
                </Radio.Group>
                {!option && <h1 style={{ marginTop: '20vh' }}>Analysis of Project Duration</h1>}
                {
                    option === 'pie' &&
                    <div style={{ width: "35%", height: "35%", marginTop: '5vh' }}>
                        <Pie data={pie} />
                    </div>
                }
                {
                    option === 'bar' &&
                    <div style={{ width: "68%", height: "68%", marginTop: '5vh' }}>
                        <Bar data={bar} />
                    </div>
                }
            </div>
        </>
    );
}

export default AnalysisProjectVsTime;
