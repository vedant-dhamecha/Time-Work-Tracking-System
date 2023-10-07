import React, { useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Password from 'antd/es/input/Password';

export default function ResetPassword() {
    const usNavigate = useNavigate();
    const[password,setPassword] = useState('');
    const[confirmPassword,setConfirmPassword] = useState('');
    const{idd,person} = useParams();
 
    const handlePassword = async(e)=>{
        e.preventDefault();
         try {
            const res = await fetch(`http://localhost:3218/resetPassword/${person}/${idd}`,{
                method:"post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    password,confirmPassword
                })
            });
    
            const data = await res.json();
            if (res.status===201) {
                usNavigate("/login/employee");
            } else {
                console.log(data.error);
            }
        } catch (error) {
            console.log(error);
        }

    }
  return (
    <>
    <center><h1>Reset your password</h1></center>
     <Form name="basic" initialValues={{ remember: true, }} className='loginform'>
        <center><Form.Item style={{width:"50%", marginTop:"60px"}}
            label="New Passsword"
            name="New Password"
            rules={[{ required: true },]}>
            <Input.Password onChange={(e) => setPassword(e.target.value)}/>
        </Form.Item></center>

        <center><Form.Item style={{width:"50%"}}
            label="Confirm Passsword"
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
            <Input.Password onChange={(e) => setConfirmPassword(e.target.value)}/>
        </Form.Item></center>

        <Form.Item wrapper Col={{ offset: 8, span: 16, }} style={{marginLeft:"380px"}} >
           <Button type="primary" htmlType='submit' onClick={handlePassword}>
               Submit
           </Button>
        </Form.Item>
     </Form>
    </>
  )
}