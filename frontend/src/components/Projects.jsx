import React, { useEffect, useContext, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { Badge, Button, Space, Table, Input, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import toast, { Toaster } from 'react-hot-toast';
import '../styles/projects.css';
import StartStopProject from './StartStopProject';
import context from '../Context/context';

const { TextArea } = Input;

export default function Projects({ projectName }) {

    const [timeOfTask, setTimeOfTask] = useState({
        taskId: {
            time: "",
        },
    });
    // -> Manav's
    // const [taskTime, usetaskTime] = useState({
    //     taskId: {
    //         startTime: "",
    //         endTime: "",
    //     }
    // });
    const [taskRunningStatus, setTaskRunningStatus] = useState({});

    const { projects, time, setTime, isRunning, setIsRunning, runningTask, setRunningTask } = useContext(context);
    const [load, setLoad] = useState(false)
    const [project, setProject] = useState({})
    const [fileList, setFileList] = useState([]);
    const [tasks, setTasks] = useState(null);

    const taskDetailsAdd = async (taskId) => {
        if (comment) {
            // setLoad(true)
            console.log("hi1")
            await handleUpload();
            console.log("hi2")
            // console.log('load :>> ', load);
            console.log("imgValues :", imgValues)
            try {
                // const data = { taskId, comment, imgValues };
                // console.log('data :>> ', data);

                const formData = new FormData();
                formData.append('taskId', taskId)
                formData.append('comment', comment)
                // formData.append('imgValues', imgValues)
                for (let i = 0; i < fileList.length; i++) {
                    console.log(fileList[i].thumbUrl);
                    formData.append("imgValues[]", fileList[i].thumbUrl);
                }
                console.log('formData :>> ', formData);
                const taskDetails = await fetch('http://localhost:3218/addTaskData', {
                    method: 'POST',
                    // headers: {
                    //     'Content-Type': 'application/json'
                    //     // 'Content-Type': 'multipart/form-data; boundary=something'
                    // },
                    // // credentials: 'include',
                    // body: JSON.stringify({ taskId, comment, imgValues }),
                    body: formData,
                })

                const response = await taskDetails.json();
            } catch (error) {
                console.log(error);
            }
            // }
        }
        else {
            alert("fill...")
            notify();
            // console.log("hii")
        }
    };
    const notify = () => {
        toast.error('Look at my styles.', {
            style: {
                border: '1px solid #713200',
                padding: '16px',
                color: '#713200',
            },
            iconTheme: {
                primary: '#713200',
                secondary: '#FFFAEE',
            },
        });
        <Toaster />
    }

    const handleStartStop = (taskId) => {
        setIsRunning(!isRunning);
        Cookies.set('taskId', taskId, { expires: 365 });
        Cookies.set('isTimeRunning', !isRunning, { expires: 365 });
    };

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // -> MAnav's........................
    // const handleStartStop = (taskId) => {
    //     setIsRunning(!isRunning);
    //     const updatedRunningStatus = {
    //         ...taskRunningStatus,
    //         [taskId]: !taskRunningStatus[taskId] // Toggle the running status for the task
    //     };
    //     setTaskRunningStatus(updatedRunningStatus);

    //     // Update task start time for the clicked task if it's starting
    //     if (updatedRunningStatus[taskId]) {
    //         usetaskTime({
    //             ...taskTime,
    //             [taskId]: {
    //                 startTime: new Date(),
    //                 endTime: "",
    //             }
    //         });
    //     } else {
    //         // Update task end time for the clicked task if it's stopping
    //         const updatedTaskTime = { ...taskTime };
    //         updatedTaskTime[taskId].endTime = new Date();
    //         usetaskTime(updatedTaskTime);
    //     }
    // };


    const [comment, setComment] = useState()
    const handleComments = (e) => {
        setComment(e.target.value)
    };


    var imgValues = []
    const [imageSize, setImageSize] = useState(0);
    const upload = (
        <div>
            <PlusOutlined />
            Upload

        </div>
    );
    const handlePreview = async (file) => {
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

    const handleSS = async (e) => {
        //here, all images are stored in one state of array 'fileList'( in raw form)
        console.log('e.fileList :>> ', e.fileList);
        // (e.fileList).map(async (file) => {
        //     if (!file.url && !file.preview) {
        //         file.preview = await getBase64(file?.originFileObj);
        //     }
        //     imgValues.push(file.preview)
        // })

        setFileList(e.fileList)
        console.log('fileList :>> ', fileList);
    };

    const handleUpload = async () => {
        console.log("in upload")
        //here, all images from fileList are converted in base64 and stored this useful image values in 'imgValues' array
        // fileList.map(async (file) => {
        //     if (!file.url && !file.preview) {
        //         file.preview = await getBase64(file?.originFileObj);
        //     }
        //     imgValues.push(file.preview)
        // })
        // setLoad(false)

    }

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
                        <ImgCrop rotationSlider>
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleSS}
                            >
                                {fileList.length > 3 ? null : upload}
                            </Upload>
                        </ImgCrop>
                        {/* <Button type="primary" htmlType='submit' onClick={handleUpload} style={{ marginTop: '2vh' }}>
                            Upload
                        </Button> */}
                        {/* <Button type="primary" htmlType='submit' onClick={() => { console.log(imgValues); console.log(comment); }} style={{ marginTop: '2vh' }}>
                            view
                        </Button> */}
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
                // -> Manav's
                // render: () => {
                //     const taskTimeObj = taskTime[task.taskId];
                //     if (taskRunningStatus[task.taskId] && taskTimeObj.startTime) {
                //         const currentTime = Math.floor((Date.now() - new Date(taskTimeObj.startTime)) / 1000);
                //         return formatTime(currentTime);
                //     }

                //     return taskTime[task.taskId] ? taskTime[task.taskId].endTime : "00:00:00"; // Display "00:00:00" if not running or no start time
                // },
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                render: () => (
                    <Space size="middle">
                        <Button type='primary' danger={isRunning ? true : false} size='small' onClick={() => { handleStartStop(task.taskId) }}>{isRunning ? 'Stop' : 'Start'}</Button>
                        <Button type="primary" style={{ backgroundColor: 'green' }} size='small'
                            onClick={() => { taskDetailsAdd(task.taskId) }}>Submit</Button>
                    </Space>
                    // -> MAnav's........................
                    // <Space size="middle">
                    //     <Button
                    //         type='primary'
                    //         danger={taskRunningStatus[task.taskId]}
                    //         size='small'
                    //         onClick={() => { handleStartStop(task.taskId) }}
                    //     >
                    //         {taskRunningStatus[task.taskId] ? 'Stop' : 'Start'}
                    //     </Button>
                    //     <Button
                    //         type="primary"
                    //         style={{ backgroundColor: 'green' }}
                    //         size='small'
                    //         onClick={() => { taskDetailsAdd(task.taskId) }}
                    //     >
                    //         Submit
                    //     </Button>
                    // </Space>
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
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',

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

    tasks && tasks.map((task) => {
        return (
            // console.log('task :>> ', task);
            data.push({
                key: task?._id,
                taskId: task?._id,
                taskName: task?.title,
                description: task?.desc,
                status: <span>{
                    task?.status === 'finished' ? <Badge status="success" text={task?.status} /> :
                        task?.status === 'pending' ? <Badge status="error" text={task?.status} /> :
                            <Badge status="processing" text={task?.status} />}
                </span>,
                creator: 'Jack',
                assignedDate: <span style={{ color: 'green' }}>{task?.startDate}</span>,
                DueDate: <span style={{ color: 'red' }}>{task?.completionDate}</span>,
            }));
    });
    // });

    // project?.assignedEmployees?.map((emp) => {
    //     return (
    //         emp?.tasks?.map((task) => {
    //             // console.log('task :>> ', task);
    //             data.push({
    //                 key: task?._id,
    //                 taskId: task?._id,
    //                 taskName: task?.title,
    //                 description: task?.desc,
    //                 status: <span>{
    //                     task?.status === 'finished' ? <Badge status="success" text={task?.status} /> :
    //                         task?.status === 'pending' ? <Badge status="error" text={task?.status} /> :
    //                             <Badge status="processing" text={task?.status} />}
    //                 </span>,
    //                 creator: 'Jack',
    //                 assignedDate: <span style={{ color: 'green' }}>{task?.startDate}</span>,
    //                 DueDate: <span style={{ color: 'red' }}>{task?.completionDate}</span>,
    //             });
    //         })
    //     )
    // });



    useEffect(() => {
        console.log("Rendering dashboard", projects);
        projects.map((p) => {
            console.log("P : ", p);
            if (projectName === p?.projectTitle) {
                setProject(p)
                p?.assignedEmployees.map((e) => {
                    setTasks(e.tasks);
                });
                console.log('project :>> ', project);
            }
        })
    }, [projectName]);


    return (
        <>
            {/* <Toaster /> */}
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
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => { resolve(reader.result) };
        reader.onerror = (error) => { reject(error); }
    })
}