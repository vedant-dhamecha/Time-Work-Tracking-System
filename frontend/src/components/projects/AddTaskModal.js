import React from "react";
import { Modal, Form, Input, DatePicker, Button } from "antd";

const AddTaskModal = ({ visible, onCancel, handleAdd }) => {
    return (
        <Modal
            title="Add Task"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="add" type="primary" onClick={() => { }}>
                    Add
                </Button>,
            ]}
        >
            <Form>
                <Form.Item label="Task Name" name="taskName">
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="desc">
                    <Input />
                </Form.Item>
            </Form>
        </Modal >
    );
};

export default AddTaskModal;
