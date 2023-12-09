import React, { useEffect, useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Badge, Button, Space, Table, Input, Upload, Spin } from "antd";
import ImgCrop from "antd-img-crop";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import "../styles/projects.css";
import context from "../Context/context";


const { TextArea } = Input;

export default function Projects({ projectName }) {
  const formRef = React.useRef(null);

  const { projects } = useContext(context);
  const [load, setLoad] = useState(false);
  const [project, setProject] = useState({});
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState([]);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  function getCurrentDateTime() {
    const currentDate = new Date();

    // Format date as dd/mm/yy
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = String(currentDate.getFullYear()).slice(-2); // Get last two digits of the year

    const formattedDate = `${day}/${month}/${year}`;

    // Format time as hh:mm:ss
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return { formattedDate, formattedTime };
  }
  const taskDetailsAdd = async (taskId) => {
    if (comment) {
      // setLoad(true)
      await handleUpload();


      try {
        // const data = { taskId, comment, imgValues };
        // console.log('data :>> ', data);

        const formData = new FormData();
        formData.append("taskId", taskId);
        formData.append("comment", comment);
        const { formattedDate, formattedTime } = getCurrentDateTime();
        formData.append("time", formattedDate + "," + formattedTime);
        // formData.append('imgValues', imgValues)
        for (let i = 0; i < fileList.length; i++) {
          console.log(fileList[i].thumbUrl);
          formData.append("imgValues[]", fileList[i].thumbUrl);

        }
        // console.log("formData :>> ", formData);
        const taskDetails = await fetch("http://localhost:3218/addTaskData", {
          method: "POST",
          credentials: 'include',
          body: formData,
        });

        const response = await taskDetails.json();
        if (response?.success) {
          formRef.current?.resetFields();
          alert("progress sent to your project manager");
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        } else {
          alert(response?.error)
        }
      } catch (error) {
        console.log(error);
      }
      // }
    } else {
      alert("fill...");
      notify();
      // console.log("hii")
    }
  };
  const notify = () => {
    toast.error("Look at my styles.", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
      iconTheme: {
        primary: "#713200",
        secondary: "#FFFAEE",
      },
    });
    <Toaster />;
  };

  // useEffect(() => {
  //   let interval;
  //   if (isRunning) {
  //     interval = setInterval(() => {
  //       setTime((prevTime) => prevTime + 1);
  //     }, 1000);
  //   } else {
  //     clearInterval(interval);
  //   }
  //   // Cookies.set('isTimeRunning', isRunning, { expires: 365 });
  //   return () => clearInterval(interval);
  // }, [isRunning]);

  useEffect(() => {
    let interval;

    // Function to make a fetch request to store the time on the server
    const storeTimeOnServer = async () => {
      try {
        // Replace 'your_server_endpoint' with the actual endpoint to store time on the server
        await fetch("http://localhost:3218/storeTime", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ projectId: project._id, time }), // Send the current time to the server
        });
      } catch (error) {
        console.error("Error storing time on the server:", error);
      }


    };

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);

        // Call the function to store time on the server every 3 seconds (3000 milliseconds)
        if (time % 3 === 0) {
          storeTimeOnServer();
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
      storeTimeOnServer();
    };
  }, [isRunning, time]);

  const handleStartStop = async () => {
    setIsRunning(!isRunning);
    const res = await fetch("http://localhost:3218/toggleclockstate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId: project._id, time }),
    });
    const data = await res.json();

    if (data?.error) {
      // openMessage(data?.error)
      console.log(data?.error);
    } else if (data?.success) {
      // openMessage(data?.success)
      console.log(data?.success);
    }
    // localStorage.set("projectTime", JSON.stringify(projectTime));
    // make request to backend to change isClockRunning.
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const [comment, setComment] = useState();
  const handleComments = (e) => {
    setComment(e.target.value);
  };

  var imgValues = [];
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
    console.log("e.fileList :>> ", e.fileList);

    setFileList(e.fileList);
    console.log("fileList :>> ", fileList);
  };

  const handleUpload = async () => {
    console.log("in upload");
    //here, all images from fileList are converted in base64 and stored this useful image values in 'imgValues' array
    // fileList.map(async (file) => {
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file?.originFileObj);
    //     }
    //     imgValues.push(file.preview)
    // })
    // setLoad(false)
  };

  const expandedRowRender = (task) => {
    const columns = [
      {
        title: "Upload work",
        dataIndex: "uploadWork",
        key: "uploadWork",
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
        title: "Comments",
        dataIndex: "comment",
        key: "comment",
        render: () => (
          <div style={{ width: "100%" }}>
            <TextArea showCount maxLength={500} onChange={handleComments} />
          </div>
        ),
      },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <Space size="middle">
            {/* <Button type='primary' danger={isRunning ? true : false} size='small' onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</Button> */}
            <Button
              type="primary"
              style={{ backgroundColor: "green" }}
              size="small"
              onClick={() => {
                taskDetailsAdd(task.taskId);
              }}
            >
              Submit
            </Button>
          </Space>
        ),
      },
    ];
    const data = [
      {
        key: 1,
        comments: (
          <TextArea showCount maxLength={500} onChange={handleComments} />
        ),
      },
    ];

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    {
      title: "Task name",
      dataIndex: "taskName",
      key: "taskName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Assigned Date",
      dataIndex: "assignedDate",
      key: "assignedDate",
    },
    {
      title: "Due Date",
      dataIndex: "DueDate",
      key: "DueDate",
    },
  ];

  useEffect(() => {
    const p = projects.find((p) => p?.projectTitle === projectName);

    if (p) {
      setProject(p);
      // setTime(p.workTime);
      setIsRunning(p.isClockRunning);
      console.log(p.workTime, p.isClockRunning, p._id);

      fetch(`http://localhost:3218/getTimeNstate/${p._id}`)
        .then((respone) => respone.json())
        .then((data) => {
          console.log(data);
          setTime(data.time);
          setIsRunning(data.isClockRunning);
        });
    }

    const data = [];
    p?.assignedEmployees?.map((emp) => {
      return emp?.tasks?.map((task) => {
        console.log("task :>> ", task);
        data.push({
          key: task?._id,
          taskId: task?._id,
          taskName: task?.title,
          description: task?.description,
          status: (
            <span>
              {task?.status === "completed" ? (
                <Badge status="success" text={task?.status} />
              ) : task?.status === "pending" ? (
                <Badge status="error" text={task?.status} />
              ) : task?.status === "in progress" ? (
                <Badge status="processing" text={task?.status} />
              ) : null}
            </span>
          ),
          creator: "Jack",
          assignedDate: (
            <span style={{ color: "green" }}>{task?.startDate}</span>
          ),
          DueDate: <span style={{ color: "red" }}>{task?.dueDate}</span>,
        });
      });
    });
    setData(data);
  }, [projectName]);

  if (projectName === "not_found") {
    return (
      <h1>No Projects Assigned Yet 😥</h1>


    )
  }

  return (
    <>
      {/* <Toaster /> */}
      <div className="proj">
        <div className="title">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "3vh",
              fontSize: "2.3vh",
            }}
          >
            <h2> {projectName}</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: "2.3vh",
              }}
            >
              <p style={{ color: "rgb(0, 0, 55)", marginRight: "1rem" }}>
                Time : {formatTime(time)}
              </p>
              <Button
                type="primary"
                danger={isRunning ? true : false}
                size="small"
                onClick={handleStartStop}
              >
                {isRunning ? "Stop" : "Start"}
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "3vh",
              fontSize: "2.3vh",
            }}
          >
            <p style={{ color: "rgb(0, 0, 55)" }}>
              Starting Date : {project.assignedDate}
            </p>
            <p style={{ color: "rgb(116, 0, 0)" }}>
              Estimated Date : {project.estimatedDate}
            </p>
          </div>
        </div>
        <div className="task">
          {projects.map((p) => {
            return (
              <>
                {projectName === p.projectTitle && (
                  <Table
                    columns={columns}
                    expandable={{ expandedRowRender }}
                    dataSource={data}
                    pagination={false}
                    bordered
                    loading={projects ? false : true}
                  />
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}
