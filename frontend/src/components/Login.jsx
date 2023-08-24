import React, { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Form, Input, Modal, message } from 'antd';
import '../styles/login.css'
import managerImg from '../assets/manager.png'
import empImg from '../assets/emp.png'
import hrImg from '../assets/hr.png'
import logo from '../assets/logo.png'
import context from '../Context/context';

export default function Login() {
    const params = useParams();
    const { person } = params;
    const navigate = useNavigate()
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')

    const { setLogged, user, setUser } = useContext(context)
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const openMessage = (s) => {
        console.log('s :>> ', s);
        messageApi.open({
            key,
            type: 'loading',
            content: 'Sending...',
        });
        setTimeout(() => {
            messageApi.open({
                key,
                type: 'success',
                content: s,
                duration: 3,
            });
        }, 2000);
    };

    //-------------modal-----------------------------
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('')
    const showModal = () => { setIsModalOpen(true); };
    const handleCancel = () => { setIsModalOpen(false); };

    const handleOk = async (e) => {
        setIsModalOpen(false);

        // openMessage("hii")
        // const res = await fetch('http://localhost:3218/sendEmail', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     credentials: 'include',
        //     body: JSON.stringify({ email })
        // })
        // const data = await res.json();

        // if (data?.error) {
        //     openMessage(data?.error)
        // }
        // else if (data?.success) {
        //     openMessage(data?.success)
        // }

    };

    //-----------------------------------------------
    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3218/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ id, password, person })
        })

        const data = await res.json();
        console.log('data in login :>> ', data);

        if (data?.error) {
            window.alert(data.error)
        }
        else if (data?.success) {
            setLogged(true)
            setUser({ name: data.name, id: data.id });
            window.alert(data.success)
            navigate('/dashboard')
        }

    }
    return (
        <>
            {contextHolder}
            <main className='padding'>
                <div class="box">
                    <div class="inner-box">
                        <div className="left">
                            <div class="header">
                                <div >
                                    <h2>Welcome</h2>
                                    <h5>Login as {person}</h5>
                                </div>
                                <img src={logo} alt="logo" className='logo' />
                            </div>
                            <div class="forms-wrap">
                                <Form name="basic" initialValues={{ remember: true, }} className='loginform'>
                                    <Form.Item
                                        label={person + " ID"}
                                        name="userID"
                                        rules={[{ required: true, },]}
                                    >
                                        <Input onChange={(e) => setId(e.target.value)} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[{ required: true, },]}
                                    >
                                        <Input.Password onChange={(e) => setPassword(e.target.value)} />
                                    </Form.Item>


                                    <Form.Item wrapper Col={{ offset: 8, span: 16, }} >
                                        <Button type="primary" htmlType='submit' onClick={handleLogin}>
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <p class="text">
                                    Forgotten your password or you login datails?
                                    <a href="#" onClick={showModal}><br />Get help</a> for signing in
                                </p>
                                <Modal title="Enter your Registered email to get the credentials" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                    <br />
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[{ required: true },]}>
                                        <Input onChange={(e) => setEmail(e.target.value)} />
                                    </Form.Item>
                                </Modal>
                            </div>
                        </div>

                        <div className="right">
                            {person === 'employee' &&
                                <img src={empImg} alt="employee" width='70%' height='70%' />}
                            {person === 'manager' &&
                                <img src={managerImg} alt="manager" width='100%' height='70%' />}
                            {person === 'HR' &&
                                <img src={hrImg} alt="hr" width='90%' height='75%' />}
                        </div>

                    </div>
                </div>
            </main >
        </>
    )
}