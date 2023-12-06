import React, { useContext, useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Password from 'antd/es/input/Password';
import context from '../Context/context';
import '../styles/resetPswd.css'
import logo from '../assets/logo.png'

export default function ResetPassword() {
  const usNavigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { idd, person } = useParams();
  const { setNav } = useContext(context)
  setNav(false)
  const handlePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3218/resetPassword/${person}/${idd}`, {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password, confirmPassword
        })
      });

      const data = await res.json();
      if (res.status === 201) {
        alert("password updated successfully")
        usNavigate("/login/" + person);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div >
      <Form name="basic" initialValues={{ remember: true, }} className='resetForm'>
        <img src={logo} alt="" style={{ height: '20vh' }} />
        <div><h1>Reset your password</h1></div>
        <div className='inputs'>
          <Form.Item style={{ width: "50%", marginTop: "60px" }}
            label=<span style={{ color: 'white' }}>New Password</span>
            name="New Password"
            rules={[{ required: true },]}>
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item style={{ width: "50%" }}
            label=<span style={{ color: 'white' }}>Confirm Password</span>
            name="Confirm Password"
            rules={[
              { required: true, },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("New Password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType='submit' onClick={handlePassword}>
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}