import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";
import {
    HomeFilled,
    MenuUnfoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    AuditOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import '../styles/dashboard.css'
import logo from '../assets/logo.png'
import context from '../Context/context';
import Register from './Register';
import Profile from './Profile';
import Projects from './Projects';
const { Header, Sider, Content, Footer } = Layout;


export default function Dashboard() {
    // const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const [sliderItem, setSliderItem] = useState('dashboard')
    const [projectName, setProjectName] = useState('')
    const [registerFor, setRegisterFor] = useState('')
    const person = Cookies.get('person')
    const { nav, setNav } = useContext(context);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        setNav(false);
    }, [])

    return (
        <>
            {/* <div>Dashboard</div> */}
            <Layout>
                <Sider trigger={<MenuUnfoldOutlined />} breakpoint="lg" collapsedWidth="0">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <img src={logo} alt="logo" style={{ height: '14vh', width: '14.5vh', padding: '2vh' }} />
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        // defaultSelectedKeys={['']}
                        items={[
                            person !== 'employee' && {
                                key: '1',
                                icon: <AuditOutlined />,
                                label: 'New Registrations',
                                children: [
                                    person === 'hr' &&
                                    {
                                        key: 'manager',
                                        icon: <UserOutlined />,
                                        label: 'Manager',
                                        onClick: () => {
                                            setSliderItem('registration')
                                            setRegisterFor('manager')
                                        }
                                    },
                                    person === 'manager' &&
                                    {
                                        key: 'manager',
                                        icon: <UserOutlined />,
                                        label: 'Employee',
                                        onClick: () => {
                                            setSliderItem('registration')
                                            setRegisterFor('employee')
                                        }
                                    },

                                ],
                            },
                            person === 'employee' && {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: 'Projects',

                                children: [

                                    {
                                        key: 'P1',
                                        icon: <UserOutlined />,
                                        label: 'P1',
                                        onClick: () => {
                                            setSliderItem('projects')
                                            setProjectName('P1')
                                        }
                                    },

                                    {
                                        key: 'P2',
                                        icon: <UserOutlined />,
                                        label: 'P2',
                                        onClick: () => {
                                            setSliderItem('projects')
                                            setProjectName('P2')
                                        }
                                    },

                                ],
                            },
                            person !== 'employee' && {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: 'Management',
                                onClick: () => {
                                    setSliderItem('management')
                                }
                            },
                            {
                                key: 'profile',
                                icon: <UserOutlined />,
                                label: 'Profile',
                                onClick: () => {
                                    setSliderItem('profile')
                                }
                            },
                            {
                                key: '4',
                                icon: <HomeFilled />,
                                label: 'Home',
                                onClick: () => {
                                    setNav(true)
                                    navigate('/')
                                },
                            },
                        ]}
                    />
                </Sider>
                <Layout
                    style={{ marginLeft: 15, marginRight: 15, minHeight: '100vh' }}>

                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        jhvjgc
                    </Header>

                    <Content className='content' style={{ background: colorBgContainer, }}>
                        <div style={{ padding: 20 }}>
                            {sliderItem === 'registration' && <Register registerFor={registerFor} />}
                        </div>
                        {sliderItem === 'profile' && <Profile />}
                        {sliderItem === 'management' && <h2>Management</h2>}
                        {sliderItem === 'projects' && <Projects projectName={projectName} />}
                    </Content>

                    <Footer className='footer'>
                        Time & Work Tracking System
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}
