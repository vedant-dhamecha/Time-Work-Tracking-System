import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Radio,
} from "antd";
import { Menu, Dropdown, message } from "antd";
import { user } from "@ant-design/icons";
import { DatePicker, Space } from "antd";

import "../styles/register.css";
import logo from "../assets/logo.png";

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

const plainOptions = ["Male", "Female", "Other"];

export default function Register() {
  const [form] = Form.useForm();
  const params = useParams();
  const { person } = params;
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    // Perform registration logic here
    // Send registration data to the server
    // Assuming successful registration, redirect to login page
    navigate("/login"); // Redirect to the login page
  };

  const onFinish = async (values) => {
    console.log("Form values:", values);

    // Perform registration logic here
    // Send registration data to the server

    // Assuming successful registration, redirect to login page
    navigate("/login"); // Redirect to the login page
  };

  function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <user />
        Employee
      </Menu.Item>
      <Menu.Item key="2">
        <user />
        Manager
      </Menu.Item>
    </Menu>
  );

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("Navigation Three", "sub4", <SettingOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ];
  const onClick = (e) => {
    console.log("click", e);
  };

  const [value1, setValue1] = useState("Male");
  const onChange1 = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setValue1(value);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const prefixSelector = (
    <Select style={{ width: 70 }}>
      <Option value="86">+91</Option>
      <Option value="87">+92</Option>
      <Option value="87">+01</Option>
      <Option value="87">+07</Option>
    </Select>
  );

  return (
    <>
      <br></br>
      <main className="padding">
        <div class="box">
          <div class="inner-box">
            <div className="left" >
              <div class="header">
                <div>
                  <h2>Welcome</h2>
                  <h5>Register as Employee/Manager</h5>
                </div>
                <img src={logo} alt="logo" className="logo" />
              </div>
              <br></br>
              <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                style={{ maxWidth: 600, justifyContent: "center"}}
                scrollToFirstError
              >
                <Form.Item
                  name="Name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="Designation"
                  label="Designation"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select User Type"
                  >
                    <Option value="Employee">
                      <UserOutlined /> Employee
                    </Option>
                    <Option value="Manager">
                      <UserOutlined /> Manager
                    </Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="Gender"
                  label="Gender"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Radio.Group
                    options={plainOptions}
                    onChange={onChange1}
                    value={value1}
                  />
                </Form.Item>

                <Form.Item
                  name="Dob"
                  label="Date of Birth"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Space direction="vertical">
                    <DatePicker onChange={onChange} />
                  </Space>
                </Form.Item>

                <Form.Item name="address" label="Address">
                  <Input.TextArea
                    placeholder="Enter address (Street, City, State, Postal Code)"
                    autoSize={{ minRows: 4, maxRows: 6 }}
                  />
                </Form.Item>

                <Form.Item label="Phone Number">
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: "100%" }}
                    name="phone" // Added name attribute
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  name="Joining Date"
                  label="Joining Date"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Space direction="vertical">
                    <DatePicker onChange={onChange} />
                  </Space>
                </Form.Item>

                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters long.",
                    },
                    {
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
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
                <Form.Item style={{ textAlign: "center" }}>
                  <Button type="primary" htmlType="submit">
                    Sign Up
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
