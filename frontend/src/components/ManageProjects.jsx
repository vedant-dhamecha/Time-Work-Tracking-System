import React, { useEffect, useState } from 'react'
import { Steps, Card, Image, Descriptions, Button } from 'antd';
import '../styles/manageproj.css'
const description = 'This is a description';

export default function ManageProjects({ projectName, projects }) {
    const [project, setProject] = useState({});
    const [tasks, setTasks] = useState([]);
    const [taskTitles, setTaskTitles] = useState([]);
    const [assignedEmps, setAssignedEmps] = useState([]);
    const [employeeTasks, setEmployeeTasks] = useState({});
    const [activeTabKey1, setActiveTabKey1] = useState();
    const [empEmails, setEmpEmails] = useState([])
    const [emails, setEmails] = useState([])
    var empEmailss = []
    var emailss = []


    // useEffect(() => {
    //     const p = projects.find((p) => p?.projectTitle === projectName);
    //     if (p) {
    //         setProject(p);
    //         setAssignedEmps([])
    //         p?.assignedEmployees.forEach((e) => {
    //             setAssignedEmps((prevEmps) => [...prevEmps, e]);
    //         });
    //     }
    //     // console.log('assignedEmps :>> ', assignedEmps);

    // }, [projectName])

    // useEffect(() => {
    //     setTasks([]);
    //     assignedEmps.forEach((emp) => {
    //         emp?.tasks?.forEach((t) => {
    //             setTasks((prevTasks) => [...prevTasks, t]);
    //         });
    //     });
    // }, [assignedEmps]);

    // useEffect(() => {
    //     setTaskTitles([])
    //     tasks.forEach((t) => {
    //         setTaskTitles((prevTitles) => [...prevTitles, t.title])
    //     })
    //     console.log('taskTitles :>> ', taskTitles);
    // }, [tasks])

    useEffect(() => {
        const p = projects.find((p) => p?.projectTitle === projectName);
        if (p) {
            setProject(p);
            const employeeTasksMap = {};

            setAssignedEmps([])
            setEmpEmails([])
            p?.assignedEmployees.forEach((e) => {
                setAssignedEmps((prevEmps) => [...prevEmps, e]);
                setEmpEmails((prevEmail) => [...prevEmail, e?.empEmail])
                const tasksForEmployee = e?.tasks || [];
                employeeTasksMap[e.empEmail] = tasksForEmployee;
            });

            setEmployeeTasks(employeeTasksMap);
            emailss = empEmails.map(e => ({
                value: e,
                label: e,
            }));
            // console.log('emailss :>> ', emailss);
            setEmails(emailss)
        }
    }, [projectName]);


    const onTab1Change = (key) => {
        // alert(key)
        setActiveTabKey1(key);
    };
    console.log('activeTabKey1 :>> ', activeTabKey1);


    const contentList = {

        tab1: <p>content1</p>,
        tab2: <p>content2</p>,
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const finishTask = async (tid) => {
        // alert(tid)
        try {
            const res = await fetch(`http://localhost:3218/changeStatus`, {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tid, pid: project._id })
            });
            const data = await res.json();
            if (res.ok) {
                // If the API call is successful, update the local state
                alert(data.message)
                window.location.reload();
            } else {
                console.error('Failed to update task status');
            }
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    }
    return (
        <>
            <div className="proj">
                <div className="title">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "0vh",
                            fontSize: "2.1vh",
                        }}
                    >
                        <h2> {projectName}</h2>

                        <b style={{ fontSize: "2.3vh", color: 'blue' }}>Work Time : {Math.floor(project.workTime / 3600)}.{Math.floor((project.workTime % 3600) / 60)} hrs</b>

                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "3vh",
                            fontSize: "2.3vh",
                        }}
                    >
                        <p style={{ color: "green" }}>
                            <b> Starting Date : {project.assignedDate}</b>
                        </p>
                        <p style={{ color: "red" }}>
                            <b>Estimated Date : {project.estimatedDate}</b>
                        </p>
                    </div>

                </div>
                <div style={{ marginTop: '4vh' }}>
                    <h5>Progress :</h5>
                    <Steps
                        current={project.status === "process" ? 1 : 2}
                        status="process"
                        percent={60}
                        className='mt-3'
                        items={[
                            {
                                title: 'Finished',
                                description: 'Project creation',

                            },
                            {
                                title: project.status === "process" ? "In Progress" : "Completed",
                                description: 'project development',

                            },
                            {
                                title: project.status === "finish" ? "In Progress" : "Remains",
                                description: 'testing & completion',
                            },
                        ]}
                    />
                </div>

                <div className="tasks mt-5">

                    {
                        assignedEmps.map((e) => {
                            const tasksForEmployee = employeeTasks[e.empEmail] || [];
                            {/* console.log("tasksForEmployee:", tasksForEmployee) */ }
                            const tabList = tasksForEmployee.map((t) => ({
                                key: t.title,
                                tab: t.title,
                            }));
                            return (

                                <Card
                                    style={{
                                        width: '100%',
                                        border: '1px solid rgba(148, 128, 155, 0.7658)   ',
                                        marginBottom: '6vh'
                                    }}
                                    title={"Employee : " + e.empEmail}
                                    // tabList={newTablist(e,)}
                                    tabList={tabList}
                                    activeTabKey={activeTabKey1}
                                    onTabChange={onTab1Change}
                                >
                                    {
                                        tasksForEmployee.map((t) => {
                                            {/* activeTabKey1 === t.title && */ }
                                            return (
                                                <>
                                                    <Descriptions >
                                                        {
                                                            <>
                                                                <Descriptions.Item label="Start Date">{t.startDate}</Descriptions.Item>
                                                                <Descriptions.Item label="Due Date">{t.dueDate}</Descriptions.Item>
                                                                <Descriptions.Item label="Status">
                                                                    <span style={{ color: t.status === 'pending' ? 'red' : 'green' }}>{t.status}</span>
                                                                </Descriptions.Item>
                                                                <Descriptions.Item label="Description">{t.description}</Descriptions.Item>
                                                                <Descriptions.Item label="Comments">{t.comments}</Descriptions.Item>
                                                                <Descriptions.Button >
                                                                    <Button border disabled={t.status === 'pending' ? false : true} onClick={() => finishTask(t._id)}><b>Finish Task</b></Button>
                                                                </Descriptions.Button>
                                                                {/* <br /> */}
                                                                <Descriptions.Item label="Photos">{
                                                                    t.images.map((i) => {
                                                                        return (
                                                                            <Image src={i} alt='img' style={{ height: '100px', width: '100px' }} />
                                                                        )
                                                                    })
                                                                }</Descriptions.Item>

                                                            </>
                                                        }
                                                    </Descriptions>
                                                </>



                                            )
                                        })
                                    }
                                </Card>
                            )

                        })
                    }
                </div>
            </div>

        </>
    )
}
