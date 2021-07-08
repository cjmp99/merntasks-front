import React, { useContext, useEffect } from 'react'
import Project from './Project'
import projectContext from '../../context/projects/projectContext';
import AlertContext from '../../context/alerts/alertsContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListProjects = () => {
    const { message, projects, getProjects } = useContext(projectContext);
    const { alert, showAlert } = useContext(AlertContext);

    useEffect(() => {

        if (message) {
            showAlert(message.msg, message.category)
        }

        getProjects()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])

    if (projects.length === 0) return <p>There are no projects, start by creating one</p>;

    return (
        <ul className="listado-proyectos">
            {alert && <div className={`alerta ${alert.category}`}>{alert.msg}</div>}
            <TransitionGroup>
                {projects.map((project) => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Project project={project} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    )
}

export default ListProjects
