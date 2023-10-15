import React from "react";
import { Modal, Form, Input, DatePicker, Button, Table } from "antd";

const TaskModal = ({ visible, onCancel, onAddTask, tasks, onDeleteTask }) => {
    const [form] = Form.useForm();

    const handleAddTask = () => {
        form.validateFields().then((values) => {
            onAddTask(values);
            form.resetFields();
        });
    };

    const handleDeleteTask = (record) => {
        onDeleteTask(record);
    };

    // const columns = [
    //     {
    //         title: "Task Title",
    //         dataIndex: "title",
    //         key: "title",
    //     },
    //     {
    //         title: "Description",
    //         dataIndex: "description",
    //         key: "description",
    //     },
    //     {
    //         title: "Start Date",
    //         dataIndex: "startDate",
    //         key: "startDate",
    //     },
    //     {
    //         title: "Due Date",
    //         dataIndex: "dueDate",
    //         key: "dueDate",
    //     },
    //     {
    //         title: "Actions",
    //         key: "actions",
    //         render: (_, record) => (
    //             <Button onClick={() => handleDeleteTask(record)} type="danger">
    //                 Delete
    //             </Button>
    //         ),
    //     },
    // ];

    return (
        <Modal
            title="Add Task"
            visible={visible}
            onOk={handleAddTask}
            onCancel={onCancel}
        >
            {/* <Table dataSource={tasks} columns={columns} rowKey="key" /> */}
            <Form form={form}>
                <Form.Item
                    name="title"
                    label="Task Title"
                    rules={[
                        {
                            required: true,
                            message: "Please enter Task Title",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true,
                            message: "Please enter Description",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="startDate"
                    label="Start Date"
                    rules={[
                        {
                            required: true,
                            message: "Please select Start Date",
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    name="dueDate"
                    label="Due Date"
                    rules={[
                        {
                            required: true,
                            message: "Please select Due Date",
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TaskModal;


// import React from "react";
// import { Modal, Form, Input, DatePicker, Button, Table } from "antd";

// const TaskModal = ({ visible, onCancel, onAddTask, tasks, onDeleteTask }) => {
//     const [form] = Form.useForm();

//     const handleAddTask = () => {
//         form.validateFields().then((values) => {
//             onAddTask(values);
//             form.resetFields();
//         });
//     };

//     const handleDeleteTask = (record) => {
//         onDeleteTask(record);
//     };

//     const columns = [
//         {
//             title: "Task Title",
//             dataIndex: "title",
//             key: "title",
//         },
//         {
//             title: "Description",
//             dataIndex: "description",
//             key: "description",
//         },
//         {
//             title: "Start Date",
//             dataIndex: "startDate",
//             key: "startDate",
//         },
//         {
//             title: "Due Date",
//             dataIndex: "dueDate",
//             key: "dueDate",
//         },
//         {
//             title: "Actions",
//             key: "actions",
//             render: (_, record) => (
//                 <Button onClick={() => handleDeleteTask(record)} type="danger">
//                     Delete
//                 </Button>
//             ),
//         },
//     ];

//     return (
//         <Modal
//             title="Add Task"
//             open={visible}
//             onOk={handleAddTask}
//             onCancel={onCancel}
//         >

//             <Form form={form}>
//                 <Form.Item
//                     name="title"
//                     label="Task Title"
//                     rules={[
//                         {
//                             required: true,
//                             message: "Please enter Task Title",
//                         },
//                     ]}
//                 >
//                     <Input />
//                 </Form.Item>
//                 <Form.Item
//                     name="description"
//                     label="Description"
//                     rules={[
//                         {
//                             required: true,
//                             message: "Please enter Description",
//                         },
//                     ]}
//                 >
//                     <Input />
//                 </Form.Item>
//                 <Form.Item
//                     name="startDate"
//                     label="Start Date"
//                     rules={[
//                         {
//                             required: true,
//                             message: "Please select Start Date",
//                         },
//                     ]}
//                 >
//                     <DatePicker />
//                 </Form.Item>
//                 <Form.Item
//                     name="dueDate"
//                     label="Due Date"
//                     rules={[
//                         {
//                             required: true,
//                             message: "Please select Due Date",
//                         },
//                     ]}
//                 >
//                     <DatePicker />
//                 </Form.Item>
//             </Form>
//             <Table dataSource={tasks} columns={columns} rowKey="key" />
//         </Modal>
//     );
// };

// export default TaskModal;

// import React from "react";
// import { Modal, Table, Button } from "antd";
// import { EditFilled, DeleteFilled } from "@ant-design/icons";

// const TaskModal = ({ visible, onCancel, tasks, onEditTask, onDeleteTask }) => {
//     const columns = [
//         {
//             title: "Task Title",
//             dataIndex: "title",
//             key: "title",
//         },
//         {
//             title: "Description",
//             dataIndex: "desc",
//             key: "desc",
//         },
//         {
//             title: "Start Date",
//             dataIndex: "startDate",
//             key: "startDate",
//         },
//         {
//             title: "End Date",
//             dataIndex: "endDate",
//             key: "endDate",
//         },
//         {
//             title: "Actions",
//             key: "actions",
//             render: (_, record) => (
//                 <>
//                     <Button onClick={() => onEditTask(record)}>
//                         <EditFilled />
//                     </Button>
//                     <Button onClick={() => onDeleteTask(record)} type="danger">
//                         <DeleteFilled />
//                     </Button>
//                 </>
//             ),
//         },
//     ];

//     return (
//         <Modal
//             title="Tasks"
//             visible={visible}
//             onCancel={onCancel}
//             footer={[
//                 <Button key="back" onClick={onCancel}>
//                     Close
//                 </Button>,
//             ]}
//         >
//             <Table dataSource={tasks} columns={columns} rowKey="key" />
//         </Modal>
//     );
// };

// export default TaskModal;
