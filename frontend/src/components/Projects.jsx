import React, { useEffect, useContext, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Badge, Button, Space, Table, Input, Upload } from 'antd';
import Cookies from "js-cookie";
import '../styles/projects.css'
import context from '../Context/context';

const { TextArea } = Input;

export default function Projects({ projectName }) {

    const { projects, time, setTime, isRunning, setIsRunning } = useContext(context);
    const [project, setProject] = useState({})

     const taskDetailsAdd = async(taskId)=>{
       try {
         const taskDetails = await fetch('http://localhost:3218/addTaskData',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ taskId })
         })

         const data = await taskDetails.json();
       } catch (error) {
        console.log(error);
       }
    };

    const handleStartStop = () => {
        setIsRunning(!isRunning);
        Cookies.set('isTimeRunning', !isRunning, { expires: 365 });
    };

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const onChange = (e) => {
        console.log('Change:', e.target.value);
    };

    const expandedRowRender = (task) => {
        const columns = [
            {
                title: 'Upload work',
                dataIndex: 'uploadWork',
                key: 'uploadWork',
                render: () => (
                    <div
                    // style={{ width: '50%' }}
                    >
                        <Upload
                            listType="picture"
                            maxCount={5}
                            multiple
                        >
                            <Button icon={<UploadOutlined />}>Upload (Max: 5)</Button>
                        </Upload>
                    </div>
                ),
            },
            {
                title: 'Comments',
                dataIndex: 'comment',
                key: 'comment',
                render: () => (
                    <div style={{ width: '100%' }}>
                        <TextArea showCount maxLength={100} onChange={onChange} />
                    </div>
                ),
            },
            {
                title: 'Time',
                dataIndex: 'time',
                key: 'time',
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                render: () => (
                    <Space size="middle">
                        <Button type='primary' danger={isRunning ? true : false} size='small' onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</Button>
                        <Button type="primary" size='small' onClick={()=>taskDetailsAdd(task.taskId)}>Submit</Button>
                    </Space>
                ),
            },

        ];
        const data = [{
            key: 1,
            time: formatTime(time),
            comments: <TextArea showCount maxLength={100} onChange={onChange} />

        }];

        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const columns = [
        {
            title: 'Task name',
            dataIndex: 'taskName',
            key: 'taskName',
        },

        {
            title: 'Status',
            key: 'state',
            render: () => <Badge status="success" text="Finished" />,
        },
        {
            title: 'Assigned Date',
            dataIndex: 'assignedDate',
            key: 'assignedDate',
        },
        {
            title: 'Due Date',
            dataIndex: 'DueDate',
            key: 'DueDate',
        },
    ];


    const data = [];

    project?.assignedEmployees?.map((emp) => {
        return (
            emp?.tasks?.map((task) => {
                data.push({
                    key: task?._id,
                    taskId: task?._id,
                    taskName: task?.title,
                    creator: 'Jack',
                    assignedDate: <span style={{ color: 'green' }}>{task?.startDate}</span>,
                    DueDate: <span style={{ color: 'red' }}>{task?.completionDate}</span>,
                });
            })
        )
    });

    // for (let i = 0; i < 3; ++i) {
    //     data.push({
    //         key: i.toString(),
    //         taskName: 'Screen',
    //         platform: 'iOS',
    //         version: '10.3.4.5654',
    //         upgradeNum: 500,
    //         creator: 'Jack',
    //         assignedDate: <span style={{ color: 'green' }}>2014-12-24 23:12:00</span>,
    //         DueDate: <span style={{ color: 'red' }}>2014-12-24 23:12:00</span>,
    //     });
    // }


    useEffect(() => {
         projects.map((p) => {
             if (projectName === p?.projectTitle) {
                setProject(p)
            }
        })
    }, [])


    return (
        <>
            <div className='proj'>
                <div className="title">
                    <h2> {projectName}</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3vh', fontSize: '2.3vh' }}>
                        <p style={{ color: 'rgb(0, 0, 55)' }}>Starting Date : {project.startingDate}</p>
                        <p style={{ color: 'rgb(116, 0, 0)' }}>Estimated Date : {project.estimatedDate}</p>
                    </div>
                </div>
                <div className="task">
                    {
                        projects.map((p) => {
                            return (
                                <>
                                    {(projectName === p.projectTitle) &&
                                        <Table
                                            columns={columns}
                                            expandable={{ expandedRowRender, }}
                                            dataSource={data}
                                            pagination={false}
                                            bordered
                                            loading={projects ? false : true}
                                        />
                                    }
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )

}