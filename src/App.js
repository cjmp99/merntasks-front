import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NewAccount from "./components/auth/NewAccount";
import Projects from "./components/projects/Projects";
import ProjectState from "./context/projects/projectState";
import TaskState from "./context/tasks/tasksState";
import AlertState from "./context/alerts/alertsState";
import AuthState from "./context/authentication/authState";
import { tokenAuth } from "./config/token";
import { PrivateRoute } from "./components/route/PrivateRoute";

const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token)
}

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoute path="/new-account" component={NewAccount} />
                <PrivateRoute path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
