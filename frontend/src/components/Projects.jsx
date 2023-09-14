import React from 'react'
import '../styles/projects.css'

export default function Projects({ projectName }) {

    const getProjects = async () => {

        try {
            const res = await fetch(`http://localhost:3218/getProject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                // body: JSON.stringify({ time })
            })

            const data = await res.json();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className='proj'>
                <div className="taskMenu">
                    <h3>Project - {projectName}</h3>
                </div>
                <div className="task">


                </div>
            </div>
        </>
    )
}
