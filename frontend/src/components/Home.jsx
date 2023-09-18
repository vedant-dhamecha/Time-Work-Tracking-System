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
