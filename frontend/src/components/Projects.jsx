import React, { useEffect, useContext, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Badge, Button, Space, Table, Input, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import Cookies from "js-cookie";
import '../styles/projects.css'
import context from '../Context/context';

const { TextArea } = Input;

export default function Projects({ projectName }) {

    const { projects, time, setTime, isRunning, setIsRunning } = useContext(context);
    const [project, setProject] = useState({})
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    // console.log('project :>> ', project);

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

    const handleComments = (e) => {
        console.log('Change:', e.target.value);
    };

    const handleSS = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleUpload = (e) => {
        console.log('e.target.value :>> ', e.target.value);
    }
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const expandedRowRender = () => {
        const columns = [
            {
                title: 'Upload work',
                dataIndex: 'uploadWork',
                key: 'uploadWork',
                render: () => (
                    <div
                    // style={{ width: '50%' }}
                    >
                        <ImgCrop rotationSlider>
                            <Upload
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={handleSS}
                                onPreview={onPreview}
                            >
                                {fileList.length < 5 && '+ Upload'}
                            </Upload>
                        </ImgCrop>
                        <Button type="primary" htmlType='submit' onClick={handleUpload} style={{ marginTop: '2vh' }}>
                            Upload
                        </Button>
                    </div>
                ),
            },
            {
                title: 'Comments',
                dataIndex: 'comment',
                key: 'comment',
                render: () => (
                    <div style={{ width: '100%' }}>
                        <TextArea showCount maxLength={100} onChange={handleComments} />
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
                        {/* {isRunning?} */}
                        <Button type='primary' danger={isRunning ? true : false} size='small' onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</Button>
                        {/* <Button type="primary" danger size='small' onClick={handleStartStop}>Stop</Button> */}
                    </Space>
                ),
            },

        ];
        const data = [{
            key: 1,
            time: formatTime(time),
            comments: <TextArea showCount maxLength={100} onChange={handleComments} />

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
                // console.log("task: ", task);
                data.push({
                    taskId: task?._id,
                    key: task?.title,
                    taskName: task?.title,
                    creator: 'Jack',
                    assignedDate: <span style={{ color: 'green' }}>{task?.startDate}</span>,
                    DueDate: <span style={{ color: 'red' }}>{task?.completionDate}</span>,
                });
            })
        )
    });



    useEffect(() => {
        // console.log("Projecs: ", projects);
        projects.map((p) => {
            // console.log("P: ", p);
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