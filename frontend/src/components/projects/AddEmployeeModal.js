import React from "react";
import { Modal, Form, Input, Table, Button } from "antd";
// import AddTaskModal from "./AddTaskModal";

const AddEmployeeModal = ({ visible, onCancel, tasks }) => {
    const columns = [
        {
            title: "Task Name",
            dataIndex: "taskName",
            key: "taskName",
        },
        {
            title: "Description",
            dataIndex: "desc",
            key: "desc",
        },
    ];

    const showAddTaskModal = () => {
        // Implement this to show the AddTaskModal
    };

    return (
        <Modal
            title="Add Employee"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="addTask" onClick={showAddTaskModal}>
                    Add Task
                </Button>,
            ]}
        >
            <Form>
                <Form.Item label="Employee Email" name="empEmail">
                    <Input />
                </Form.Item>
            </Form>

            <Table dataSource={tasks} columns={columns} pagination={false} />

            {/* <AddTaskModal
            // Pass necessary props to AddTaskModal
            /> */}
        </Modal>
    );
};

export default AddEmployeeModal;
