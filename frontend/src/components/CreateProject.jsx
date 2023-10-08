import React from 'react'
import {
    DatePicker, Space, Spin, notification,
    Button,
    Form,
    Input,
    Select,
    Radio, Modal, Upload, Popconfirm
} from "antd";
import '../styles/addProj.css'


export default function CreateProject() {

    const formRef = React.useRef(null);

    const handleFinish = (e) => {

    }

    return (
        <>
            <div className="projForm" >
                <Form ref={formRef} name="register" onFinish={handleFinish} scrollToFirstError>

                    <Form.Item name="title" label="Project Title" rules={[{ required: true, },]} >
                        <Input />
                    </Form.Item>

                    <span style={{ display: 'flex', flexDirection: 'row', border: '0px solid red', width: '100%', justifyContent: 'space-between' }}>
                        <Form.Item name="assignedDate" label="Assigned Date" rules={[{ required: true, },]}  >
                            <DatePicker onChange={(e, date) => { }} />
                        </Form.Item>
                        <Form.Item name="estimatedDate" label="Estimated Date" rules={[{ required: true, },]} >
                            <DatePicker onChange={(e, date) => { }} />
                        </Form.Item>
                    </span>
                </Form>

            </div>
        </>
    )
}

