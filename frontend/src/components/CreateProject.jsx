import React, { useEffect, useState } from "react";
import { DatePicker, Button, Form, Input } from "antd";
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
      const { projectTitle, assignedDate, estimatedDate } = formValues;

      // Update project state
      setProject((prevProject) => ({
        ...prevProject,
        projectTitle,
        assignedDate: assignedDate?.format("YYYY-MM-DD"),
        estimatedDate: estimatedDate?.format("YYYY-MM-DD"),
        assignedEmployees: project.assignedEmployees,
      }));

      // Set submitting to true to indicate that the form is being submitted
      setSubmitting(true);
    } catch (error) {
      // Handle errors, if any
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (submitting && project) {
      const sendProject = async () => {
        const res = await fetch("http://localhost:3218/addproject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(project),
        });

        const data = await res.json();
        
        if (res.status===201) {
          alert("Done");
        }else{
          alert("Not Done");
        }

        // Reset submitting state after the API call is complete
        setSubmitting(false);
      };

      sendProject();
    }
  }, [submitting, project]);

  const addEmployeeToProject = (employee) => {
    console.log(employee);

    setProject((prevProject) => ({
      ...prevProject,
      assignedEmployees: [...prevProject.assignedEmployees, employee],
    }));
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
            <Form.Item
              name="assignedDate"
              label="Assigned Date"
              rules={[{ required: true }]}
            >
              <DatePicker onChange={(e, date) => {}} />
            </Form.Item>
            <Form.Item
              name="estimatedDate"
              label="Estimated Date"
              rules={[
                { required: true, message: "Please select an estimated date" },
              ]}
            >
              <DatePicker onChange={(e, date) => {}} />
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
