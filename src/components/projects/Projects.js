import React, { useContext, useEffect } from "react";
import Bar from "../layout/Bar";
import Sidebar from "../layout/Sidebar";
import FormTasks from "../tasks/FormTasks";
import ListTasks from "../tasks/ListTasks";
import AuthContext from "../../context/authentication/authContext";

const Projects = () => {

  const { userAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    userAuthenticated()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="contenedor-app">
      <Sidebar />

      <div className="seccion-principal">
        <Bar />
        <main>
          <FormTasks />
          <div className="contenedor-tareas">
            <ListTasks />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
