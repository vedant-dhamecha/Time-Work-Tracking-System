import React from 'react';
import Cookie from 'cookie-universal'

export default function Dummy() {
    const start = async()=>{
        const cookies = new Cookie();
        const d = (new Date()).getTime();
        
        cookies.set('startTime', d);
     

        try {
            const res = await fetch("http://localhost:3218/dummy", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'include'
              })
          
              const data = await res.json();   
        } catch (error) {
            console.log(error);
        }
    }

    const stop = async()=>{
        let time= (new Date()).getTime();
        let taskTitle="task 1";
        
        try {
            const res = await fetch(`http://localhost:3218/dummyTwo`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({
                  time,taskTitle
                })
              })
          
              const data = await res.json();   
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
          <button onClick={start}>Start</button>
          <button onClick={stop}>Stop</button>
        </div>
    )
}
