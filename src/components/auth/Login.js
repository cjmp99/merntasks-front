import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertsContext from "../../context/alerts/alertsContext";
import AuthContext from "../../context/authentication/authContext";

const Login = (props) => {
  const { alert, showAlert } = useContext(AlertsContext)
  const { message, authenticated, login } = useContext(AuthContext)
  const [user, saveUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const onChange = (e) => {
    saveUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (
      email.trim() === '' ||
      password.trim() === ''
    ) {
      showAlert('All fields are required', 'alerta-error')
      return
    }

    login({
      email,
      password
    });
  }

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

  return (
    <div className="form-usuario">
      {alert && <div className={`alerta ${alert.category}`}>{alert.msg}</div>}
      <div className="contenedor-form sombra-dark">
        <h1>Login</h1>

        <form onSubmit={onSubmit}>
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
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Sign In"
            />
          </div>
        </form>
        <Link to={'/new-account'} className="enlace-cuenta">Create account</Link>
      </div>
    </div>
  );
};

export default Login;
