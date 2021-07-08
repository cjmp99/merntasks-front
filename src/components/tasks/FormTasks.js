import React, { useContext, useState, useEffect } from "react";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/tasksContext";

const FormTasks = () => {
  const { project } = useContext(projectContext);
  const { taskselected, errortask, addTask, validateTask, getTasks, updateTask } = useContext(taskContext);
  const [task, saveTask] = useState({
    name: ''
  })


  useEffect(() => {
    if (taskselected !== null) {
      saveTask(taskselected)
    } else {
      saveTask({
        name: ''
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskselected])

  if (!project) return null;

  const [currentProject] = project

  const handleChange = e => {
    saveTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    if (task.name.trim() === '') {
      validateTask()
      return;
    }
    if (taskselected === null) {
      task.project = currentProject._id
      addTask(task)
    } else {
      updateTask(task)
    }
    getTasks(currentProject._id)
    saveTask({
      name: ''
    })
  }

  return (
    <div className="formulario">
      <form
        onSubmit={onSubmit}
      >
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Task Name"
            name="name"
            value={task.name}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={taskselected ? "Edit Task" : "Add Task"}
          />
        </div>
      </form>
      {errortask && <p className="mensaje error">Name is required!</p>}
    </div>
  );
};

export default FormTasks;
