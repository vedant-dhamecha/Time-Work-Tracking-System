import React, { useEffect, useContext } from 'react'
import { Space, Table, Button, message, Popconfirm } from 'antd';
import context from "../Context/context";



export default function DeleteProject() {

    const { managerProjects, setManagerProjects } = useContext(context);

    const columns = [
        {
            title: 'index',
            dataIndex: 'index',
            key: 'index',
            // render: (text) => <a>{text}</a>,

        },
        {
            title: 'Project',
            dataIndex: 'Project',
            key: 'Project',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
        },
    ]
    const confirm = async (pid) => {
        console.log(pid);


        try {
            const res = await fetch(`http://localhost:3218/deleteProject`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pid })
            });
            const data = await res.json()
            console.log('data :>> ', data);
            if (res.ok) {
                // If the API call is successful, update the local state
                const updatedProjects = managerProjects.filter((p) => p._id !== pid);
                setManagerProjects(updatedProjects);
                message.success('Project deleted successfully');
            } else {
                console.error('Failed to delete project');
                message.error('Failed to delete project');
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            message.error('Error deleting project');
        }

    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };
    const data = managerProjects.map((p) => {
        return (
            {
                index: p._id,
                Project: p.projectTitle,
                Action: <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => confirm(p._id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Delete</Button>
                </Popconfirm>,
            }
        )
    })



    return (
        <>
            <Table columns={columns} dataSource={data} style={{ width: '70%' }} pagination={false} bordered />;
        </>
    )
}
