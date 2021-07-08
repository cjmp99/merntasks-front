import React, { Fragment, useContext, useState } from "react";
import projectContext from "../../context/projects/projectContext";

const NewProject = () => {
  const projectsContext = useContext(projectContext);
  const { formnewproject, showerror, showFormNewProject, addProject, showError } = projectsContext;
  const [project, saveProject] = useState({
    name: '',
  });

  const { name } = project;

  const onChangeProject = (e) => {
    saveProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitProject = (e) => {
    e.preventDefault();

    if (name === '') {
      showError()
      return;
    }

    addProject(project)
    saveProject({
      name: ''
    })
  };

  return (
    <Fragment>
      <button
        className="btn btn-block btn-primario"
        onClick={() => showFormNewProject()}
      >
        New project
      </button>

      {formnewproject && (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProject}>
          <input
            type="text"
            className="input-text"
            placeholder="Project Name"
            name="name"
            value={name}
            onChange={onChangeProject}
          />

          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Add Project"
          />
        </form>
      )}
      {showerror && <p className="mensaje error">Name is required!</p>}
    </Fragment>
  );
};

export default NewProject;
