import React, { useState, useContext, useEffect } from "react";
import { UserOutlined, PhoneFilled, PlusOutlined } from "@ant-design/icons";
import {
  DatePicker, Space, Spin, notification,
  Button,
  Form,
  Input,
  Select,
  Radio, Modal, Upload, Popconfirm
} from "antd";

import "../styles/register.css";
import context from '../Context/context';
import logo from "../assets/logo.png";
import Cookies from "js-cookie";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });



export default function Register({ registerFor }) {

  const { load, setLoad } = useContext(context);
  const [joiningDate, setJoiningDate] = useState()
  const [bday, setBday] = useState()
  const [msg, setMsg] = useState(null);
  const [msgTitle, setMsgTitle] = useState(null);
  const person = Cookies.get('person')
  // const registerFor = person === 'manager' ? "employee" : person === 'hr' ? "manager" : "";

  //------------ Image upload -----------------------
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [imgValue, setImgValue] = useState();
  const [imageSize, setImageSize] = useState(0);
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = async (e) => {
    setFileList(e.fileList)
    console.log('e.file :>> ', e.file);
    if (!e.file.url && !e.file.preview) {
      e.file.preview = await getBase64(e.file.originFileObj);
    }
    setImageSize(e.file.size);
    setImgValue(e.file.preview);

  };

  const upload = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload Profile Picture
      </div>
    </div>
  );

  // useEffect(() => {
  //   if (imgValue) {
  //     console.log('imgValue in useeffect :>> ', imgValue);
  //   }
  // }, [imgValue]);

  //----------------------------------------------------

  const formRef = React.useRef(null);
  const handleFinish = async (values) => {
    setLoad(true)

    const dob = bday;
    const { name, id, email, password, mobile, gender, address } = values;

    // const designation = registerFor === 'employee' ? values.designation : ''
    const res = await fetch("http://localhost:3218/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, id, dob, email, password, mobile, gender, address, joiningDate, registerFor, imgValue })
    })

    const data = await res.json();

    setLoad(false)

    if (data?.success) {
      setMsgTitle("Registration Successful")
      setMsg(data?.success)
      // openNotificationWithIcon('success');
      formRef.current?.resetFields();
    }
    else if (data?.error) {
      setMsgTitle("Registration failed");
      setMsg(data?.error)
      // openNotificationWithIcon('error');
    }
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: msgTitle,
      description: msg,
    });
  };
  useEffect(() => {
    if (msgTitle) {
      if (msgTitle == "Registration Successful") {
        openNotificationWithIcon('success');
      }
      else {
        openNotificationWithIcon('error');
      }
      setMsgTitle('')
      setMsg('')
    }

  }, [msgTitle, msg]);

  //if image is larger than 50kb
  useEffect(() => {
    if (imageSize > 49597) {
      setMsgTitle("Image size is too large")
      setMsg("Image must be less than 50KB");
    }
  }, [imageSize])
  //

  return (
    <>
      {contextHolder}
      <div className="registerContainer" >
        <div><h3 align="center">{registerFor} Registration</h3> </div>
        <div className="formContainer">
          <br />
          <Form {...formItemLayout} ref={formRef} name="register" onFinish={handleFinish} scrollToFirstError>

            <Upload
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              className="profilePic"
            >
              {fileList.length > 0 ? null : upload}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>
            <Form.Item name="name" label="Name" rules={[{ required: true, },]}>
              <Input />
            </Form.Item>

            <Form.Item name="id" label="User ID" rules={[{ required: true, },]}>
              <Input />
            </Form.Item>

            {/* {person === 'manager' &&
              <Form.Item name="designation" label="Designation" rules={[{ required: true, },]}>
                <Select style={{ width: "100%" }} placeholder="Select User Type">
                  <Option value="Employee"><UserOutlined /> Employee</Option>
                  <Option value="Manager"><UserOutlined /> Manager</Option>
                </Select>
              </Form.Item>} */}

            <Form.Item name="gender" label="Gender" rules={[{ required: true, },]}>
              <Radio.Group name="radiogroup" defaultValue={1}>
                <Radio value='male'>Male</Radio>
                <Radio value='female'>Female</Radio>
              </Radio.Group>
            </Form.Item>

            {load &&
              <Spin tip="Submitting..." size="large" >
                <div className="content" />
              </Spin>
            }

            <Form.Item name="dob" label="Date of Birth"  >
              <Space direction="vertical" >
                <DatePicker onChange={(e, date) => { setBday(date) }} />
              </Space>
            </Form.Item>

            <Form.Item name="mobile" label="Phone Number" rules={[{ required: true }]} >
              <Input addonBefore={<PhoneFilled />} />
            </Form.Item>

            <Form.Item name="address" label="Address" rules={[{ required: true }]} >
              <Input.TextArea
                placeholder="Enter address "
                autoSize={{ minRows: 4, maxRows: 6, }}
              />
            </Form.Item>

            <Form.Item name="joiningDate" label="Joining Date"  >
              <Space direction="vertical">
                <DatePicker onChange={(e, date) => { setJoiningDate(date) }} />
              </Space>
            </Form.Item>

            <Form.Item name="email" label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                { required: true }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="password" label="Password"
              rules={[
                { required: true },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="confirmPassword" label="Confirm Password" dependencies={["password"]}
              rules={[
                { required: true, },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords do not match!");
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }} className="submit">

              <Button type="primary" htmlType="submit" >
                Sign up
              </Button>
            </Form.Item>

          </Form>
        </div>
      </div>
    </>
  );
}
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => { resolve(reader.result) };
    reader.onerror = (error) => { reject(error); }
  })
}
