import React, { Fragment, useContext } from "react";
import Task from "./Task";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/tasksContext";
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListTasks = () => {
  const { project, deleteProject } = useContext(projectContext);

  const { tasksproject } = useContext(taskContext);

  if (!project) return <h1>Select project</h1>

  const [currentProject] = project

  return (
    <Fragment>
      <h2>Project: {currentProject.name}</h2>

      <ul className="listado-tareas">
        {tasksproject.length === 0 ? (
          <li className="tarea">
            <p>Don't task</p>
          </li>
        ) : (
          <TransitionGroup>
            {tasksproject.map((task) => (
              <CSSTransition
                key={task._id}
                timeout={200}
                classNames="tarea"
              >
                <Task task={task} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button className="btn btn-eliminar" onClick={() => deleteProject(currentProject._id)}>Delete Project &times;</button>
    </Fragment>
  );
};

export default ListTasks;
