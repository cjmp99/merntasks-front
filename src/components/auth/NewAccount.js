import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertsContext from "../../context/alerts/alertsContext";
import AuthContext from "../../context/authentication/authContext";

const NewAccount = (props) => {
  const { alert, showAlert } = useContext(AlertsContext)
  const { message, authenticated, registerUser } = useContext(AuthContext)
  const [user, saveUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ''
  });
  const { name, email, password, confirm } = user;

  const onChange = (e) => {
    saveUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (authenticated) {
      props.history.push('/projects')
    }

    if (message) {
      showAlert(message.msg, message.category)
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, authenticated, props.history])

  const onSubmit = e => {
    e.preventDefault();

    if (
      name.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirm.trim() === ''
    ) {
      showAlert('All fields are required', 'alerta-error')
      return
    }

    if (password.length < 6) {
      showAlert('The password must have a minimum of 6 characters', 'alerta-error')
      return
    }

    if (password !== confirm) {
      showAlert('Passwords do not match', 'alerta-error')
      return
    }

    registerUser({
      name,
      email,
      password
    });
  }

  return (
    <div className="form-usuario">
      {alert && <div className={`alerta ${alert.category}`}>{alert.msg}</div>}
      <div className="contenedor-form sombra-dark">
        <h1>Create Account</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={name}
              id="name"
              name="name"
              placeholder="Your name"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              id="email"
              name="email"
              placeholder="Your email"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              id="password"
              name="password"
              placeholder="Your password"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              id="confirm"
              name="confirm"
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Register"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Sing in
        </Link>
      </div>
    </div>
  );
};

export default NewAccount;
