import React from "react";
import "../styles/home.css";
import home from '../assets/home.png';

export default function Home() {
  return (
    <div className="split-container">
      <div className="left">
        <h1>
          Welcome to Work & Time Tracking System
          <h4>Log in to use</h4>
          <h6>Join the Community.
            </h6><h6>All Right Reserved By Arteco Solution. copyright@2023.</h6>
        </h1>
      </div>
      <div className="right">
        <img
          src={home}
          alt="Image"
          className="image-fit" // Add a class to the image
        />
      </div>
    </div>
  );
}

{/* <PieChart width={400} height={400}>
<Pie
  dataKey="value"
  isAnimationActive={false}
  data={transformedData}
  cx={200}
  cy={200}
  outerRadius={80}
  fill={"yellow"}
  label
/>
<Tooltip />
</PieChart>

<BarChart
width={500}
height={300}
data={transformedData}
margin={{
top: 5,
right: 30,
left: 20,
bottom: 5,
}}
barSize={20}
>
<XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
<YAxis />
<Tooltip />
<Legend />
<CartesianGrid strokeDasharray="3 3" />
<Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
</BarChart>  */}