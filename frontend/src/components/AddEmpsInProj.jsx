// import React, { useState } from "react";
// import { Modal, Form, Input, Table, Button, Tooltip } from "antd";
// import { EditFilled, DeleteFilled } from "@ant-design/icons"
// import '../styles/addEmpsInProj.css'
// import TaskModal from "./TaskModal";
// // import axios from "axios";

// export default function AddEmpsInProj() {
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [form] = Form.useForm();
//     const [taskForm] = Form.useForm();
//     const [employees, setEmployees] = useState([]);
//     const [editingEmployee, setEditingEmployee] = useState(null);
//     const [taskModalVisible, setTaskModalVisible] = useState(false);
//     const [selectedEmployeeKey, setSelectedEmployeeKey] = useState(null);
//     const [currentEmployeeTasks, setCurrentEmployeeTasks] = useState([]);

//     const showModal = (record) => {
//         setEditingEmployee(record);
//         setIsModalVisible(true);
//         form.setFieldsValue(record);
//     };

//     const handleCancel = () => {
//         form.resetFields();
//         setEditingEmployee(null);
//         setIsModalVisible(false);
//     };
//     const handleAddTask = () => {
//         form.resetFields();
//     };
//     const handleDeleteTask = (task) => {

//     };

//     const handleAdd = () => {
//         form.validateFields().then((values) => {
//             if (editingEmployee) {
//                 // Update the existing employee's details
//                 const updatedEmployees = employees.map((emp) =>
//                     emp === editingEmployee ? { ...emp, ...values } : emp
//                 );
//                 setEmployees(updatedEmployees);
//             } else {
//                 // Add a new employee
//                 setEmployees([...employees, values]);
//             }

//             form.resetFields();
//             setEditingEmployee(null);
//             setIsModalVisible(false);
//         });
//     };

//     const handleSubmit = () => {
//         // Handle the submission of the main form
//         console.log("Submitting main form with employee data:", employees);
//     };

//     const handleEdit = (record) => {
//         showModal(record);
//     };

//     const handleDelete = (record) => {
//         const updatedEmployees = employees.filter((emp) => emp !== record);
//         setEmployees(updatedEmployees);
//     };

//     const expandedRowRender = (record) => {
//         return (
//             <div>
//                 <Tooltip title="Edit" color='black' key='white'>
//                     <Button onClick={() => handleEdit(record)} style={{ backgroundColor: 'green', color: 'white' }} >
//                         <EditFilled />
//                     </Button>
//                 </Tooltip>
//                 <Tooltip title="Delete" color='black' key='white'>
//                     <Button onClick={() => handleDelete(record)} type="danger" style={{ marginLeft: "10px", backgroundColor: 'red', color: 'white' }}>
//                         <DeleteFilled />
//                     </Button>
//                 </Tooltip>
//             </div>
//         );
//     };

//     const columns = [
//         {
//             title: "Employee Email",
//             dataIndex: "empEmail",
//             key: "empEmail",
//         },

//         {
//             title: "Actions",
//             key: "actions",
//             render: (_, record) => expandedRowRender(record),
//         },
//     ];



//     const showTaskModal = (employeeKey) => {
//         setTaskModalVisible(true);
//         setSelectedEmployeeKey(employeeKey);
//     };

//     const handleTaskCancel = () => {
//         taskForm.resetFields();
//         setTaskModalVisible(false);
//         setSelectedEmployeeKey(null);
//     };
//     return (
//         <div>
//             <Button type="primary" onClick={() => showModal(null)}>
//                 Add Employee
//             </Button>
//             <Modal
//                 title={editingEmployee ? "Edit Employee" : "Add Employee"}
//                 visible={isModalVisible}
//                 onOk={handleAdd}
//                 onCancel={handleCancel}
//             >
//                 <Form form={form}>
//                     <Form.Item
//                         name="empEmail"
//                         label="Employee Email"
//                         rules={[{ required: true, message: "Please enter Employee Email", },]}
//                     >
//                         <Input />
//                     </Form.Item>
//                 </Form>
//                 <Button type="primary" onClick={() => showTaskModal(selectedEmployeeKey)}>
//                     Add Task
//                 </Button>
//             </Modal>
//             <TaskModal
//                 form={taskForm}  // Pass taskForm as a prop to TaskModal
//                 visible={taskModalVisible}
//                 onCancel={handleTaskCancel}
//                 onAddTask={(values) => {
//                     const updatedEmployees = employees.map((emp, index) =>
//                         index === selectedEmployeeKey
//                             ? {
//                                 ...emp,
//                                 tasks: [...(emp.tasks || []), values],
//                             }
//                             : emp
//                     );
//                     setEmployees(updatedEmployees);
//                     taskForm.resetFields();
//                     setTaskModalVisible(false);
//                     setSelectedEmployeeKey(null);
//                 }}
//             />
//             {console.log("emps:", employees)}
//             <Table dataSource={employees} columns={columns} pagination={false} className="empTable" bordered size="small" />
//             <Button type="primary" onClick={handleSubmit}>
//                 Submit
//             </Button>
//         </div>
//     );
// };

// ;


// import React, { useState } from "react";
// import { Modal, Form, Input, Table, Button, DatePicker } from "antd";
// import { EditFilled, DeleteFilled } from "@ant-design/icons";
// import TaskForm from "./TaskForm";

// const AddEmpsInProj = () => {
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [form] = Form.useForm();
//     const [employeeEmail, setEmployeeEmail] = useState("");
//     const [tasks, setTasks] = useState([]);
//     const [editingTask, setEditingTask] = useState(null);

//     const showModal = () => {
//         setIsModalVisible(true);
//     };

//     const handleCancel = () => {
//         form.resetFields();
//         setIsModalVisible(false);
//     };

//     const handleAddTask = () => {
//         form.validateFields().then((values) => {
//             if (editingTask) {
//                 const updatedTasks = tasks.map((task) =>
//                     task === editingTask ? { ...task, ...values } : task
//                 );
//                 setEditingTask(null);
//                 setTasks(updatedTasks);
//             } else {
//                 setTasks([...tasks, values]);
//             }
//             form.resetFields();
//         });
//     };

//     const handleEditTask = (task) => {
//         setEditingTask(task);
//         form.setFieldsValue(task);
//     };

//     const handleDeleteTask = (task) => {
//         const updatedTasks = tasks.filter((t) => t !== task);
//         setTasks(updatedTasks);
//     };

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
//             title: "Completion Date",
//             dataIndex: "completionDate",
//             key: "completionDate",
//         },
//         {
//             title: "Tasks",
//             key: "tasks",
//             render: (_, record) => (
//                 <Button onClick={() => showTaskModal(record)}>
//                     View Tasks
//                 </Button>
//             ),
//         },
//         {
//             title: "Actions",
//             key: "actions",
//             render: (_, record) => (
//                 <>
//                     <Button onClick={() => handleEditTask(record)}>
//                         <EditFilled />
//                     </Button>
//                     <Button onClick={() => handleDeleteTask(record)}>
//                         <DeleteFilled />
//                     </Button>
//                 </>
//             ),
//         },
//     ];

//     const handleAddEmployee = () => {
//         // Add the employee with email and tasks to your data structure
//         const employee = {
//             empEmail: employeeEmail,
//             tasks: tasks,
//         };
//         // Add the employee to the data structure (your project data)
//         console.log("Add employee to project data:", employee);
//         // Clear tasks and email for the next employee
//         setTasks([]);
//         setEmployeeEmail("");
//         form.resetFields();
//         setIsModalVisible(false);
//     };

//     return (
//         <div>
//             <Table dataSource={employees} columns={columns} pagination={false} />

//             {editingEmployee && (
//                 <TaskModal
//                     visible={taskModalVisible}
//                     onCancel={() => setTaskModalVisible(false)}
//                     tasks={editingEmployee.tasks || []}
//                 />
//             )}
//             <Button type="primary" onClick={showModal}>
//                 Add Employee
//             </Button>
//             <Modal
//                 title="Add Employee"
//                 open={isModalVisible}
//                 onOk={handleAddEmployee}
//                 onCancel={handleCancel}
//             >
//                 <Form form={form}>
//                     <Form.Item
//                         label="Employee Email"
//                         name="empEmail"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: "Please enter Employee Email",
//                             },
//                         ]}
//                     >
//                         <Input
//                             value={employeeEmail}
//                             onChange={(e) => setEmployeeEmail(e.target.value)}
//                         />
//                     </Form.Item>
//                 </Form>
//                 <h2>Tasks</h2>
//                 <TaskForm
//                     form={form}
//                     tasks={tasks}
//                     setTasks={setTasks}
//                     editingTask={editingTask}
//                 />
//                 <Table dataSource={tasks} columns={columns} pagination={false} />
//                 <Button type="primary" onClick={handleAddTask}>
//                     Add Task
//                 </Button>
//             </Modal>
//         </div>
//     );
// };

// export default AddEmpsInProj;


import React, { useState } from "react";
import { Modal, Form, Input, Table, Button, Tooltip } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons"
import '../styles/addEmpsInProj.css'
import TaskModal from "./TaskModal";
// import axios from "axios";

export default function AddEmpsInProj() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [taskForm] = Form.useForm();
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [taskModalVisible, setTaskModalVisible] = useState(false);
    const [selectedEmployeeKey, setSelectedEmployeeKey] = useState(null);
    const [currentEmployeeTasks, setCurrentEmployeeTasks] = useState([]);
    const [tasks, setTasks] = useState([]);

    const showModal = (record) => {
        setEditingEmployee(record);
        setIsModalVisible(true);
        form.setFieldsValue(record);
    };

    const handleCancel = () => {
        form.resetFields();
        setEditingEmployee(null);
        setIsModalVisible(false);
    };
    const handleAddTask = () => {
        form.resetFields();
    };
    const handleDeleteTask = (task) => {

    };

    const handleAdd = () => {
        form.validateFields().then((values) => {
            if (editingEmployee) {
                // Update the existing employee's details
                const updatedEmployees = employees.map((emp) =>
                    emp === editingEmployee ? { ...emp, ...values } : emp
                );
                setEmployees(updatedEmployees);
            } else {
                // Add a new employee
                setEmployees([...employees, values]);
            }

            form.resetFields();
            setEditingEmployee(null);
            setIsModalVisible(false);
        });
    };

    const handleSubmit = () => {
        // Handle the submission of the main form
        console.log("Submitting main form with employee data:", employees);
    };

    const handleEdit = (record) => {
        showModal(record);
    };

    const handleDelete = (record) => {
        const updatedEmployees = employees.filter((emp) => emp !== record);
        setEmployees(updatedEmployees);
    };

    const handleViewTasks = (record) => {
        // console.log("fakdsjfkdas");
        showTaskModal(null);

    };

    const expandedRowRender = (record) => {
        return (
            <div>
                <Tooltip title="Edit" color='black' key='white'>
                    <Button onClick={() => handleEdit(record)} style={{ backgroundColor: 'green', color: 'white' }} >
                        <EditFilled />
                    </Button>
                </Tooltip>
                <Tooltip title="Delete" color='black' key='white'>
                    <Button onClick={() => handleDelete(record)} type="danger" style={{ marginLeft: "10px", backgroundColor: 'red', color: 'white' }}>
                        <DeleteFilled />
                    </Button>
                </Tooltip>
            </div>
        );
    };

    const columns = [
        {
            title: "Employee Email",
            dataIndex: "empEmail",
            key: "empEmail",
        },
        {
            title: "tasks",
            key: "tasks",
            render: (_, record) => (
                <Tooltip title="Delete" color='black' key='white'>
                    <Button onClick={() => handleViewTasks(record)} type="primary" style={{ marginLeft: "10px", backgroundColor: 'blue', color: 'white' }}>
                        view tasks
                    </Button>
                </Tooltip>
            )
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => expandedRowRender(record),
        },
    ];


    const taskColumns = [
        {
            title: "Task Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
            key: "startDate",
        },
        {
            title: "Due Date",
            dataIndex: "dueDate",
            key: "dueDate",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Button onClick={() => handleDeleteTask(record)} type="danger">
                    Delete
                </Button>
            ),
        },
    ];


    const showTaskModal = (employeeKey) => {
        setTaskModalVisible(true);
        setSelectedEmployeeKey(employeeKey);
    };

    const handleTaskCancel = () => {
        taskForm.resetFields();
        setTaskModalVisible(false);
        setSelectedEmployeeKey(null);
    };
    return (
        <div>
            <Button type="primary" onClick={() => showModal(null)}>
                Add Employee
            </Button>
            <Modal
                title={editingEmployee ? "Edit Employee" : "Add Employee"}
                visible={isModalVisible}
                onOk={handleAdd}
                onCancel={handleCancel}
            >
                <Form form={form}>
                    <Form.Item
                        name="empEmail"
                        label="Employee Email"
                        rules={[{ required: true, message: "Please enter Employee Email", },]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
                <Table dataSource={tasks} columns={taskColumns} rowKey="key" />
                <Button type="primary" onClick={() => showTaskModal(selectedEmployeeKey)}>
                    Add Task
                </Button>
            </Modal>
            <TaskModal
                form={taskForm}  // Pass taskForm as a prop to TaskModal
                visible={taskModalVisible}
                onCancel={handleTaskCancel}
                onAddTask={(values) => {
                    const updatedEmployees = employees.map((emp, index) =>
                        index === selectedEmployeeKey
                            ? {
                                ...emp,
                                tasks: [...(emp.tasks || []), values],
                            }
                            : emp
                    );
                    setEmployees(updatedEmployees);
                    taskForm.resetFields();
                    setTaskModalVisible(false);
                    setSelectedEmployeeKey(null);
                }}
            />
            {console.log("emps:", employees)}
            <Table dataSource={employees} columns={columns} pagination={false} className="empTable" bordered size="small" />
            <Button type="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
};

// import React, { useState } from "react";
// import { Modal, Form, Input, Table, Button } from "antd";
// import { EditFilled, DeleteFilled } from "@ant-design/icons";
// import TaskModal from "./TaskModal";

// const AddEmpsInProj = () => {
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [form] = Form.useForm();
//     const [employeeEmail, setEmployeeEmail] = useState("");
//     const [tasks, setTasks] = useState([]);
//     const [editingTask, setEditingTask] = useState(null);
//     const [employees, setEmployees] = useState([]);
//     const [editingEmployee, setEditingEmployee] = useState(null);
//     const [taskModalVisible, setTaskModalVisible] = useState(false);

//     const showModal = () => {
//         setIsModalVisible(true);
//     };

//     const handleCancel = () => {
//         form.resetFields();
//         setIsModalVisible(false);
//         setEmployeeEmail("");
//         setTasks([]);
//         setEditingTask(null);
//         setEditingEmployee(null);
//     };

//     const handleAddTask = () => {
//         form.validateFields().then((values) => {
//             if (editingTask) {
//                 const updatedTasks = tasks.map((task) =>
//                     task === editingTask ? { ...task, ...values } : task
//                 );
//                 setEditingTask(null);
//                 setTasks(updatedTasks);
//             } else {
//                 setTasks([...tasks, values]);
//             }
//             form.resetFields();
//         });
//     };

//     const handleEditTask = (task) => {
//         setEditingTask(task);
//         form.setFieldsValue(task);
//     };

//     const handleDeleteTask = (task) => {
//         const updatedTasks = tasks.filter((t) => t !== task);
//         setTasks(updatedTasks);
//     };

//     const handleAddEmployee = () => {
//         const employee = {
//             empEmail: employeeEmail,
//             tasks: tasks,
//         };
//         setEmployees([...employees, employee]);
//         form.resetFields();
//         setIsModalVisible(false);
//         setEmployeeEmail("");
//         setTasks([]);
//     };

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
//             title: "Completion Date",
//             dataIndex: "completionDate",
//             key: "completionDate",
//         },
//         {
//             title: "Actions",
//             key: "actions",
//             render: (_, record) => (
//                 <>
//                     <Button onClick={() => handleEditTask(record)}>
//                         <EditFilled />
//                     </Button>
//                     <Button onClick={() => handleDeleteTask(record)}>
//                         <DeleteFilled />
//                     </Button>
//                 </>
//             ),
//         },
//     ];

//     return (
//         <div>
//             <Button type="primary" onClick={showModal}>
//                 Add Employee
//             </Button>
//             <Modal
//                 title="Add Employee"
//                 visible={isModalVisible}
//                 onOk={handleAddEmployee}
//                 onCancel={handleCancel}
//             >
//                 <Form form={form}>
//                     <Form.Item
//                         label="Employee Email"
//                         name="empEmail"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: "Please enter Employee Email",
//                             },
//                         ]}
//                     >
//                         <Input
//                             value={employeeEmail}
//                             onChange={(e) => setEmployeeEmail(e.target.value)}
//                         />
//                     </Form.Item>
//                 </Form>
//                 <h2>Tasks</h2>
//                 <Table dataSource={tasks} columns={columns} pagination={false} />
//                 <Button type="primary" onClick={handleAddTask}>
//                     Add Task
//                 </Button>
//             </Modal>

//             {editingEmployee && (
//                 <TaskModal
//                     visible={taskModalVisible}
//                     onCancel={() => setTaskModalVisible(false)}
//                     tasks={editingEmployee.tasks || []}
//                     onEditTask={handleEditTask}
//                     onDeleteTask={handleDeleteTask}
//                 />
//             )}

//             <Table dataSource={employees} columns={columns} pagination={false} />
//         </div>
//     );
// };

// export default AddEmpsInProj;
