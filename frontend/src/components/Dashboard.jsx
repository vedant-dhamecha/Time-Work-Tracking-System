import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    HomeFilled,
    MenuUnfoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import '../styles/dashboard.css'
import logo from '../assets/logo.png'
import context from '../Context/context';
import Register from './Register';
const { Header, Sider, Content, Footer } = Layout;


export default function Dashboard() {
    // const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
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
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: 'nav 1',
                            },
                            {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: 'nav 2',
                            },
                            {
                                key: '3',
                                icon: <UploadOutlined />,
                                label: 'nav 3',
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
                    style={{
                        marginLeft: 15,
                        marginRight: 15,
                        minHeight: '100vh'
                    }}>
                    <Header style={{ padding: 0, background: colorBgContainer }}>

                    </Header>
                    <Content className='content' style={{ background: colorBgContainer, }}>
                        <Register />
                    </Content>

                    <Footer className='footer'>
                        Time & Work Tracking System
                    </Footer>
                </Layout>
            </Layout>


        </>
    )
}
