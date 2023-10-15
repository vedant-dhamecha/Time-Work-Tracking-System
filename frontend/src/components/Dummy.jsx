import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import "antd/dist/antd.css";
// import "./index.css";
import { Form, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons"

export default function DynamicFieldSet() {
  const [keys, setKeys] = useState([]);

  const add = () => {
    const nextKeys = keys.concat(keys.length);
    setKeys(nextKeys);
  };

  const remove = (k) => {
    if (keys.length === 1) {
      return;
    }

    const newKeys = keys.filter((key) => key !== k);
    setKeys(newKeys);
  };

  const duplicate = (k) => {
    // Logic for duplicating fields
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 }
    }
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 }
    }
  };

  const formItems = keys.map((k, index) => (
    <Form.Item
      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
      label={index === 0 ? "Passengers" : ""}
      required={false}
      key={k}
    >
      {/* Form item content */}
      <Input
        placeholder="passenger name"
        style={{ width: "60%", marginRight: 8 }}
      />
    </Form.Item>
  ));

  return (
    <Form onSubmit={handleSubmit}>
      {formItems}
      <Form.Item {...formItemLayoutWithOutLabel}>
        <Button type="dashed" onClick={add} style={{ width: "60%" }}>
          <PlusOutlined />
        </Button>
      </Form.Item>
      <Form.Item {...formItemLayoutWithOutLabel}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedDynamicFieldSet = Form.create({ name: "dynamic_form_item" })(
  DynamicFieldSet
);

// const App = () => {
//   return <WrappedDynamicFieldSet />;
// };

// ReactDOM.render(<App />, document.getElementById("container"));
