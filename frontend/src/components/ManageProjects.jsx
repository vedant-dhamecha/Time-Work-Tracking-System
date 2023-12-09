import React, { useEffect, useState } from 'react'
import { Steps, Card, Image, Switch, Descriptions, Spin } from 'antd';
import '../styles/manageproj.css'
const description = 'This is a description';

export default function ManageProjects({ projectName, projects }) {
    const [project, setProject] = useState({});
    const [tasks, setTasks] = useState([]);
    const [assignedEmps, setAssignedEmps] = useState([]);

    useEffect(() => {
        const p = projects.find((p) => p?.projectTitle === projectName);
        if (p) {
            setProject(p);
            setAssignedEmps(p.assignedEmployees || []);
        }
    }, [projectName]);

    useEffect(() => {
        const allTasks = assignedEmps
            .map((emp) => emp.tasks || [])
            .flat();
        
        setTasks(allTasks);
    }, [assignedEmps]);
    const [tabList, setTabList] = useState([]);
    useEffect(() => {
        // ... (previous code remains unchanged)

        // Update the tab list based on tasks
        const newTabList = tasks.map((t) => ({
            key: t.id,
            tab: t.title,
        }));
        setTabList(newTabList);
    }, [projectName, tasks]);
    const tabLis = [

        {
            key: 'tab1',
            tab: 'tab1',
        },
        {
            key: 'tab2',
            tab: 'tab2',
        },


    ];
    const contentList = {
        tab1: <p>content1</p>,
        tab2: <p>content2</p>,
    };
    const [activeTabKey1, setActiveTabKey1] = useState('tab1');
    const onTab1Change = (key) => {
        setActiveTabKey1(key);
    };
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
                            return (

                                <Card
                                    style={{
                                        width: '100%',
                                        border: '1px solid rgba(148, 128, 155, 0.7658)   ',
                                        marginBottom: '6vh'
                                    }}
                                    title={"Employee : " + e.empEmail}
                                    tabList={tabList}
                                    activeTabKey={activeTabKey1}
                                    onTabChange={onTab1Change}
                                >
                                    {contentList[activeTabKey1]}
                                </Card>
                            )

                        })
                    }
                </div>
            </div>

        </>
    )
}