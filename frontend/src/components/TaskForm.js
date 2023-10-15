import React from "react";
import { Form, Input, DatePicker } from "antd";

const TaskForm = ({ form, tasks, setTasks, editingTask }) => {
    const handleDeleteTask = (task) => {
        const updatedTasks = tasks.filter((t) => t !== task);
        setTasks(updatedTasks);
    };

    return (
        <div>
            {tasks.map((task, index) => (
                <div key={index}>
                    <Form.Item label="Task Title" name={`tasks[${index}].title`}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name={`tasks[${index}].desc`}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Start Date" name={`tasks[${index}].startDate`}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="Completion Date"
                        name={`tasks[${index}].completionDate`}
                    >
                        <DatePicker />
                    </Form.Item>
                    {editingTask === task ? (
                        <button onClick={() => handleDeleteTask(task)}>Delete Task</button>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export default TaskForm;
