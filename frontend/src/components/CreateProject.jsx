import React, { useState } from "react";
import {
  DatePicker,
  Space,
  Spin,
  notification,
  Button,
  Form,
  Input,
  Select,
  Radio,
  Modal,
  Upload,
  Popconfirm,
} from "antd";
import "../styles/addProj.css";
import AddEmpsInProj from "./AddEmpsInProj";
// import AddProject from '../components/projects/AddProject';

export default function CreateProject() {
  const [project, setProject] = useState({
    projectTitle: "",
    startingDate: null,
    estimatedDate: null,
    assignedEmployees: [],
  });
  const [date, setDate] = useState(null);
  const formRef = React.useRef(null);

  const handleSubmit = () => {
    const formValues = formRef.current.getFieldsValue();
    const { projectTitle, assignedDate, estimatedDate } = formValues;

    setProject({
      projectTitle,
      assignedDate: assignedDate.format("YYYY-MM-DD"),
      estimatedDate: estimatedDate.format("YYYY-MM-DD"),
      assignedEmployees: project.assignedEmployees
    });

    console.log("Project Data:", project);
  };

  const addEmployeeToProject = (employee) => {
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
              <DatePicker onChange={(e, date) => { setDate(date) }} />
            </Form.Item>
            <Form.Item
              name="estimatedDate"
              label="Estimated Date"
              rules={[
                { required: true, message: "Please select an estimated date" },
              ]}
            >
              <DatePicker onChange={(e, date) => { }} />
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
