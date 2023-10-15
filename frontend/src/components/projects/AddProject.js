// import React, { useState } from "react";
// import { Modal, Form, Input, Table, Button } from "antd";
// import AddEmployeeModal from "./AddEmployeeModal";

// const AddProject = () => {
//     const [isAddEmployeeModalVisible, setIsAddEmployeeModalVisible] = useState(false);

//     const columns = [
//         {
//             title: "Employee Email",
//             dataIndex: "empEmail",
//             key: "empEmail",
//         },
//         {
//             title: "Tasks",
//             key: "tasks",
//             render: (_, record) => (
//                 <Button onClick={() => showTasks(record)}>
//                     View Tasks
//                 </Button>
//             ),
//         },
//     ];

//     const showAddEmployeeModal = () => {
//         setIsAddEmployeeModalVisible(true);
//     };

//     const handleAddEmployeeModalCancel = () => {
//         setIsAddEmployeeModalVisible(false);
//     };

//     return (
//         <div>
//             <Button type="primary" onClick={showAddEmployeeModal}>
//                 Add Employee
//             </Button>
//             <Table dataSource={employees} columns={columns} pagination={false} />

//             <AddEmployeeModal
//                 visible={isAddEmployeeModalVisible}
//                 onCancel={handleAddEmployeeModalCancel}
//             />
//         </div>
//     );
// };

// export default AddProject;



import React, { useState } from "react";
import { Button, Input, Modal, Table } from "antd";
// import AddEmployeeModal from "./AddEmployeeModal";

const AddProject = () => {
    const [project, setProject] = useState({
        projectTitle: "",
        startingDate: "",
        estimatedDate: "",
        assignedEmployees: [],
    });

    const [empEmail, setEmpEmail] = useState("");
    const [tasks, setTasks] = useState([]);
    const [isAddEmployeeModalVisible, setIsAddEmployeeModalVisible] = useState(false);

    const addEmployee = () => {
        const updatedProject = {
            ...project,
            assignedEmployees: [
                ...project.assignedEmployees,
                {
                    empEmail,
                    tasks,
                },
            ],
        };
        setProject(updatedProject);
        setIsAddEmployeeModalVisible(false);
        setEmpEmail("");
        setTasks([]);
    };

    const showAddEmployeeModal = () => {
        setIsAddEmployeeModalVisible(true);
    };

    const handleAddEmployeeModalCancel = () => {
        setIsAddEmployeeModalVisible(false);
    };

    const columns = [
        {
            title: "Employee Email",
            dataIndex: "empEmail",
            key: "empEmail",
        },
        {
            title: "Tasks",
            key: "tasks",
            render: (_, record) => (
                <Button onClick={() => { }}>View Tasks</Button>
            ),
        },
    ];

    return (
        <div>
            {/* <h1>Project Details</h1>
            <div>
                <label>Project Title:</label>
                <Input
                    value={project.projectTitle}
                    onChange={(e) => setProject({ ...project, projectTitle: e.target.value })}
                />
            </div>
            <div>
                <label>Starting Date:</label>
                <Input
                    value={project.startingDate}
                    onChange={(e) => setProject({ ...project, startingDate: e.target.value })}
                />
            </div>
            <div>
                <label>Estimated Date:</label>
                <Input
                    value={project.estimatedDate}
                    onChange={(e) => setProject({ ...project, estimatedDate: e.target.value })}
                />
            </div> */}

            <h2>Assigned Employees:</h2>
            <Button onClick={showAddEmployeeModal}>Add Employee</Button>

            <Table dataSource={project.assignedEmployees} columns={columns} pagination={false} />

            {/* Add Employee Modal */}
            <Modal
                visible={isAddEmployeeModalVisible}
                onOk={addEmployee}
                onCancel={handleAddEmployeeModalCancel}
                title="Add Employee"
                okText="Add"
                cancelText="Cancel"
            >
                <div>
                    <label>Employee Email:</label>
                    <Input
                        value={empEmail}
                        onChange={(e) => setEmpEmail(e.target.value)}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default AddProject;
