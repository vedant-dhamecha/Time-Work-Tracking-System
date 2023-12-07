import React, { useState, useEffect, useContext } from 'react'
import Cookies from "js-cookie";

import { Avatar, Card, Image, Switch, Descriptions, Spin } from 'antd';
import context from '../Context/context';
import '../styles/profile.css'

const { Meta } = Card;


export default function Profile() {

    const person = Cookies.get('person')

    const [personData, setPersonData] = useState({})
    const [load, setLoad] = useState(false)
    const getInformation = async () => {
        try {
            setLoad(true)
            const res = await fetch("http://localhost:3218/getData", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await res.json();
            setLoad(false)
            console.log('data in profile:>> ', data);
            setPersonData(data);

        } catch (err) {
            console.log('err in info card :>> ', err);
        }
    }
    useEffect(() => {
        getInformation();
    }, [])
    if (load) {
        return (
            <>
                <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin tip="Loading..." size="large" ><div className="content" /></Spin>
                </div>
            </>
        )
    } else {
        return (
            <form method='GET'>
                <div className="" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '0px solid red', width: '100%', }}>
                    <h4>{person}  information</h4>

                    <Card className='infoCard mt-0 pt-0'>
                        <div className="info">
                            <div className="profilepic mt-4" >
                                <Image width={160} src={personData.imgValue} />
                            </div>
                            <div className="details">
                                <Descriptions title="  " bordered>
                                    {
                                        <>
                                            <Descriptions.Item label="Name">{personData.name}</Descriptions.Item>
                                            <Descriptions.Item label="ID">{personData.id}</Descriptions.Item>
                                            <Descriptions.Item label="Email">{personData.email}</Descriptions.Item>
                                            <Descriptions.Item label="Mobile">{personData.mobile}</Descriptions.Item>
                                            <Descriptions.Item label="Gender">{personData.gender}</Descriptions.Item>
                                            <Descriptions.Item label="Birth Date">{personData.dob}</Descriptions.Item>
                                            <Descriptions.Item label="Date of Joining">{personData.joiningDate}</Descriptions.Item>
                                            <Descriptions.Item label="Address">{personData.address}</Descriptions.Item>
                                        </>
                                    }
                                </Descriptions>
                            </div>
                        </div>
                    </Card>
                </div>
            </form>
        )
    }
}