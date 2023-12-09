import React, { useEffect, useState } from "react";
import { DatePicker, Button, Form, Input } from "antd";
import Cookies from "js-cookie";
import "../styles/addProj.css";
import AddEmpsInProj from "./AddEmpsInProj";
// import AddProject from '../components/projects/AddProject';

export default function CreateProject() {
  const [project, setProject] = useState({
    projectTitle: "",
    assignedDate: null,
    estimatedDate: null,
    assignedEmployees: [],
  });
  const formRef = React.useRef(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      const formValues = formRef.current.getFieldsValue();
      console.log("formValues :", formValues)
      const { projectTitle, estimatedDate } = formValues;
      console.log('project.assigned: ', project.assignedEmployees);
      // console.log("start :", estimatedDate[0].format("YYYY-MM-DD"))
      // console.log("end :", estimatedDate[1].format("YYYY-MM-DD"))
      // Update project state
      setProject((prevProject) => ({
        ...prevProject,
        projectTitle,
        assignedDate: estimatedDate[0]?.format("YYYY-MM-DD"),
        estimatedDate: estimatedDate[1]?.format("YYYY-MM-DD"),
        assignedEmployees: project.assignedEmployees,
        manager: Cookies.get("managerEmail"),
        status: 'process'
      }));

      // Set submitting to true to indicate that the form is being submitted
      setSubmitting(true);
      console.log('project :>> ', project);
    } catch (error) {
      // Handle errors, if any
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (submitting && project) {

      const sendProject = async () => {
        console.log('project :>> ', project);
        const res = await fetch("http://localhost:3218/addproject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(project),
        });

        const data = await res.json();

        if (res.status === 201) {
          formRef.current?.resetFields();
          alert("Project successfully created");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          alert("Not Done");
        }

        // Reset submitting state after the API call is complete
        setSubmitting(false);
      };

      sendProject();
    }
  }, [submitting, project]);

  const addEmployeeToProject = (employee) => {
    console.log('emp is: ', employee);
    const isEmployeeAlreadyAdded = project.assignedEmployees.some(
      (emp) => emp.empEmail === employee.empEmail
    );
    if (!isEmployeeAlreadyAdded) {
      setProject((prevProject) => ({
        ...prevProject,
        assignedEmployees: [...prevProject.assignedEmployees, employee],
      }));
    } else {
      console.log(`Employee with email ${employee.email} is already added.`);
    }
  };
  return (
    <>
      <div className="projForm">
        <Form ref={formRef} name="register" scrollToFirstError>
          <Form.Item
            name="projectTitle"
            label="Project Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <span
            style={{
              display: "flex",
              flexDirection: "row",
              border: "0px solid red",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {/* <Form.Item
              name="assignedDate"
              label="Assigned Date"
              rules={[{ required: true }]}
            >
              <DatePicker onChange={(e, date) => { console.log(date) }} />
            </Form.Item> */}
            <Form.Item
              name="estimatedDate"
              label="Estimated Completion Date"
              rules={[
                { required: true, message: "Please select dates" },
              ]}
            >
              <DatePicker.RangePicker onChange={(e, date) => { console.log(date) }} style={{ width: '100%', }} />
            </Form.Item>
          </span>
          <AddEmpsInProj addEmployeeToProject={addEmployeeToProject} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{ margin: "1em 0" }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}