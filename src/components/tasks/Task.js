import React, { useContext } from "react";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/tasksContext";

const Task = ({ task }) => {
  const { deleteTask, getTasks, updateTask, saveCurrentTask } = useContext(taskContext);
  const { project } = useContext(projectContext);
  const [currentProject] = project;

  const taskDelete = id => {
    deleteTask(id, currentProject._id)
    getTasks(currentProject._id)
  }

  const changeState = task => {
    if (task.state) {
      task.state = false
    } else {
      task.state = true
    }
    updateTask(task)
  }

  const selectTask = task => {
    saveCurrentTask(task)
  }

  return (
    <li className="tarea sombra">
      <p>{task.name}</p>

      <div className="estado">
        {task.state ? (
          <button className="completo" onClick={() => changeState(task)}>Completed</button>
        ) : (
          <button className="incompleto" onClick={() => changeState(task)}>Incomplete</button>
        )}
      </div>

      <div className="acciones">
        <button className="btn btn-primario" onClick={() => selectTask(task)}>Edit</button>
        <button onClick={() => taskDelete(task._id)} className="btn btn-secundario">Delete</button>
      </div>
    </li>
  );
};

export default Task;
