// import React, { useState } from "react";
// import { Modal, Form, Input, Table, Button, Tooltip } from "antd";
// import { EditFilled, DeleteFilled } from "@ant-design/icons";
// import "../styles/addEmpsInProj.css";
// import TaskModal from "./TaskModal";

// export default function AddEmpsInProj({ project }) {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [form] = Form.useForm();
//   const [taskForm] = Form.useForm();
//   const [employees, setEmployees] = useState([]);
//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const [taskModalVisible, setTaskModalVisible] = useState(false);
//   const [selectedEmployeeKey, setSelectedEmployeeKey] = useState(null);
//   const [currentEmployeeTasks, setCurrentEmployeeTasks] = useState([]);
//   const [tasks, setTasks] = useState([]);

//   const showModal = (record) => {
//     setEditingEmployee(record);
//     setIsModalVisible(true);
//     form.setFieldsValue(record);
//   };

//   const handleCancel = () => {
//     form.resetFields();
//     setEditingEmployee(null);
//     setIsModalVisible(false);
//   };
//   const handleAddTask = () => {
//     form.resetFields();
//   };
//   const handleDeleteTask = (task) => {};

//   const handleAdd = () => {
//     form.validateFields().then((values) => {
//       if (editingEmployee) {
//         // Update the existing employee's details
//         const updatedEmployees = employees.map((emp) =>
//           emp === editingEmployee ? { ...emp, ...values } : emp
//         );
//         setEmployees(updatedEmployees);
//       } else {
//         // Add a new employee
//         setEmployees([...employees, values]);
//       }

//       form.resetFields();
//       setEditingEmployee(null);
//       setIsModalVisible(false);
//     });
//   };

//   const handleSubmit = () => {
//     // Handle the submission of the main form
//     console.log("Submitting main form with employee data:", employees);
//   };

//   const handleEdit = (record) => {
//     showModal(record);
//   };

//   const handleDelete = (record) => {
//     const updatedEmployees = employees.filter((emp) => emp !== record);
//     setEmployees(updatedEmployees);
//   };

//   const handleViewTasks = (record) => {
//     // console.log("fakdsjfkdas");
//     showTaskModal(null);
//   };

//   const expandedRowRender = (record) => {
//     return (
//       <div>
//         <Tooltip title="Edit" color="black" key="white">
//           <Button
//             onClick={() => handleEdit(record)}
//             style={{ backgroundColor: "green", color: "white" }}
//           >
//             <EditFilled />
//           </Button>
//         </Tooltip>
//         <Tooltip title="Delete" color="black" key="white">
//           <Button
//             onClick={() => handleDelete(record)}
//             type="danger"
//             style={{
//               marginLeft: "10px",
//               backgroundColor: "red",
//               color: "white",
//             }}
//           >
//             <DeleteFilled />
//           </Button>
//         </Tooltip>
//       </div>
//     );
//   };

//   const columns = [
//     {
//       title: "Employee Email",
//       dataIndex: "empEmail",
//       key: "empEmail",
//     },
//     // {
//     //   title: "tasks",
//     //   key: "tasks",
//     //   render: (_, record) => (
//     //     <Tooltip title="Delete" color="black" key="white">
//     //       <Button
//     //         onClick={() => handleViewTasks(record)}
//     //         type="primary"
//     //         style={{
//     //           marginLeft: "10px",
//     //           backgroundColor: "blue",
//     //           color: "white",
//     //         }}
//     //       >
//     //         view tasks
//     //       </Button>
//     //     </Tooltip>
//     //   ),
//     // },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => expandedRowRender(record),
//     },
//   ];

//   const taskColumns = [
//     {
//       title: "Task Title",
//       dataIndex: "title",
//       key: "title",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//     },
//     {
//       title: "Start Date",
//       dataIndex: "startDate",
//       key: "startDate",
//     },
//     {
//       title: "Due Date",
//       dataIndex: "dueDate",
//       key: "dueDate",
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <Button onClick={() => handleDeleteTask(record)} type="danger">
//           Delete
//         </Button>
//       ),
//     },
//   ];

//   const showTaskModal = (employeeKey) => {
//     setTaskModalVisible(true);
//     setSelectedEmployeeKey(employeeKey);
//   };

//   const handleTaskCancel = () => {
//     taskForm.resetFields();
//     setTaskModalVisible(false);
//     setSelectedEmployeeKey(null);
//   };
//   return (
//     <div>
//       <Modal
//         title={editingEmployee ? "Edit Employee" : "Add Employee"}
//         visible={isModalVisible}
//         onOk={handleAdd}
//         onCancel={handleCancel}
//       >
//         <Form form={form}>
//           <Form.Item
//             name="empEmail"
//             label="Employee Email"
//             rules={[{ required: true, message: "Please enter Employee Email" }]}
//           >
//             <Input />
//           </Form.Item>
//         </Form>
//         <Table dataSource={tasks} columns={taskColumns} rowKey="key" />
//         <Button
//           type="primary"
//           onClick={() => showTaskModal(selectedEmployeeKey)}
//         >
//           Add Task
//         </Button>
//       </Modal>
//       <TaskModal
//         form={taskForm} // Pass taskForm as a prop to TaskModal
//         visible={taskModalVisible}
//         onCancel={handleTaskCancel}
//         onAddTask={(values) => {
//           const updatedEmployees = employees.map((emp, index) =>
//             index === selectedEmployeeKey
//               ? {
//                   ...emp,
//                   tasks: [...(emp.tasks || []), values],
//                 }
//               : emp
//           );
//           setEmployees(updatedEmployees);
//           taskForm.resetFields();
//           setTaskModalVisible(false);
//           setSelectedEmployeeKey(null);
//         }}
//       />
//       {console.log("emps:", employees)}
//       <Table
//         dataSource={employees}
//         columns={columns}
//         pagination={false}
//         className="empTable"
//         bordered
//         size="small"
//       />

//       <Button type="primary" onClick={() => showModal(null)}>
//         Add Employee
//       </Button>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Modal, Form, Input, Table, Button, Tooltip } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import TaskModal from "./TaskModal";

export default function AddEmpsInProj({ addEmployeeToProject }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [taskForm] = Form.useForm();
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [selectedEmployeeKey, setSelectedEmployeeKey] = useState(null);
  const [currentEmployeeTasks, setCurrentEmployeeTasks] = useState([]);
  const [tasks, setTasks] = useState([]);

  const showModal = (record) => {
    setEditingEmployee(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);

    if (record && record.tasks) {
        setCurrentEmployeeTasks(record.tasks);
      } else {
        setCurrentEmployeeTasks([]);
      }
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingEmployee(null);
    setIsModalVisible(false);
  };

  const handleAddTask = () => {
    showTaskModal(selectedEmployeeKey);
  };

  const handleDeleteTask = (task) => {
    const updatedTasks = currentEmployeeTasks.filter((t) => t !== task);
    console.log("inside delete", task);
    setCurrentEmployeeTasks(updatedTasks);
  };

//   const handleAdd = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         if (editingEmployee) {
//           const updatedEmployees = employees.map((emp) =>
//             emp === editingEmployee
//               ? { ...emp, ...values, tasks: currentEmployeeTasks }
//               : emp
//           );
//           setEmployees(updatedEmployees);
//         } else {
//           setEmployees([
//             ...employees,
//             { ...values, tasks: currentEmployeeTasks },
//           ]);
//         }

//         addEmployeeToProject(employee);

//         form.resetFields();
//         setCurrentEmployeeTasks([]);
//         setEditingEmployee(null);
//         setIsModalVisible(false);
//       })
//       .catch((errorInfo) => {
//         console.log("Failed:", errorInfo);
//       });
//   };

  //   const handleSubmit = () => {
  //     console.log("Submitting employee data:", employees);
  //   };


  const handleAdd = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingEmployee) {
          const updatedEmployees = employees.map((emp) =>
            emp === editingEmployee
              ? { ...emp, ...values, tasks: currentEmployeeTasks }
              : emp
          );
          setEmployees(updatedEmployees);
        } else {
          // Create a new employee object with values and tasks
          const newEmployee = { ...values, tasks: currentEmployeeTasks };
          setEmployees([...employees, newEmployee]);
          
          // Add the new employee to the project using the addEmployeeToProject function
          addEmployeeToProject(newEmployee);
        }
  
        form.resetFields();
        setCurrentEmployeeTasks([]);
        setEditingEmployee(null);
        setIsModalVisible(false);
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };
  
  const handleEdit = (record) => {
    showModal(record);
  };

  const handleDelete = (record) => {
    const updatedEmployees = employees.filter((emp) => emp !== record);
    setEmployees(updatedEmployees);
  };

  const showTaskModal = (employeeKey) => {
    setTaskModalVisible(true);
    setSelectedEmployeeKey(employeeKey);
  };

  const handleTaskCancel = () => {
    taskForm.resetFields();
    setTaskModalVisible(false);
    setSelectedEmployeeKey(null);
  };

//   const handleAddTaskForEmployee = () => {
//     taskForm.validateFields().then((values) => {
//       const formattedTask = {
//         ...values,
//         startDate: values.startDate.format("YYYY-MM-DD"),
//         dueDate: values.dueDate.format("YYYY-MM-DD"),
//     };
//       setCurrentEmployeeTasks([...currentEmployeeTasks, formattedTask]);
//       taskForm.resetFields();
//       setTaskModalVisible(false);
//     });
//   };

const handleAddTaskForEmployee = () => {
  taskForm.validateFields().then((values) => {
    console.log(values);
    const formattedTask = {
      ...values,
      startDate: values.startDate.format("YYYY-MM-DD"),
      dueDate: values.dueDate.format("YYYY-MM-DD"),
    };
    setCurrentEmployeeTasks([...currentEmployeeTasks, formattedTask]);
    taskForm.resetFields();
    setTaskModalVisible(false);

    // Add the employee and their tasks to the project
    addEmployeeToProject({
      empEmail: form.getFieldValue("empEmail"), // Get the employee email from the form
      tasks: [...currentEmployeeTasks, formattedTask],
    });
  });
};


  const expandedRowRender = (record) => {
    return (
      <div>
        <Tooltip title="Edit" color="black" key="white">
          <Button
            onClick={() => handleEdit(record)}
            style={{ backgroundColor: "green", color: "white" }}
          >
            <EditFilled />
          </Button>
        </Tooltip>
        <Tooltip title="Delete" color="black" key="white">
          <Button
            onClick={() => handleDelete(record)}
            type="danger"
            style={{
              marginLeft: "10px",
              backgroundColor: "red",
              color: "white",
            }}
          >
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
      key: "taskActions",
      render: (_, record) => (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            {/* <Tooltip title="Edit" color="black" key="white">
              <Button
                onClick={() => {}}
                style={{ backgroundColor: "green", color: "white" }}
              >
                <EditFilled />
              </Button>
            </Tooltip> */}
            <Tooltip title="Delete" color="black" key="white">
              <Button
                onClick={() => handleDeleteTask(record)}
                type="danger"
                style={{
                  marginLeft: "10px",
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                <DeleteFilled />
              </Button>
            </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Modal
        title={editingEmployee ? "Edit Employee" : "Add Employee"}
        open={isModalVisible}
        onOk={handleAdd}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="empEmail"
            label="Employee Email"
            rules={[{ required: true, message: "Please enter Employee Email" }]}
          >
            <Input />
          </Form.Item>
        </Form>
        <Table
          dataSource={currentEmployeeTasks}
          columns={taskColumns}
          rowKey={(record) => record.title}
        />
        <Button type="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Modal>
      <TaskModal
        form={taskForm}
        visible={taskModalVisible}
        onCancel={handleTaskCancel}
        onAddTaskForEmployee={handleAddTaskForEmployee}
      />
      <Table
        dataSource={employees}
        columns={columns}
        pagination={false}
        bordered
        size="small"
        rowKey={(record) => record.empEmail}
      />
      <Button
        type="primary"
        onClick={() => showModal(null)}
        style={{ margin: "1em 0" }}
      >
        Add Employee
      </Button>
      {/* <Button type="primary" onClick={handleSubmit}>
        Submit Employee Data
      </Button> */}
    </div>
  );
}
