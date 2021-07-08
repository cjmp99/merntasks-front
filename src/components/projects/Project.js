import React, { useContext } from 'react'
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/tasksContext";

const Project = ({ project }) => {
    const projectsContext = useContext(projectContext);
    const tasksContext = useContext(taskContext);

    const { currentProject } = projectsContext;
    const { getTasks } = tasksContext;


    const selectCurrentProject = id => {
        currentProject(id)
        getTasks(id)
    }

    return (
        <li>
            <button className="btn btn-blank" onClick={() => selectCurrentProject(project._id)}>
                {project.name}
            </button>
        </li>
    )
}

export default Project
