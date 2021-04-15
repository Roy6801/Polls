import { Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import NavbarDash from "./components/dashboardpages/NavbarDash";
import CreateForm from "./components/dashboardpages/CreateForm";
import About from "./components/dashboardpages/About";
import User from "./components/dashboardpages/User";
import useToken from "./components/useToken";
import Poll from "./components/interface/Poll";

const App = () => {
  //window.localStorage.removeItem("polls-manager-system-G22");

  const { token, setToken } = useToken("$$$NULL$$$");

  console.log(token);

  if (token === "$$$NULL$$$") {
    return (
      <div>
        <Login setToken={setToken} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <NavbarDash setToken={setToken} />
      </div>
      <div>
        <Switch>
          <Route exact path="/createpoll" component={CreateForm} />
          <Route exact path="/about" component={About} />
          <Route exact path="/Poll/:pollURL" component={Poll} />
          <Route path="*" component={User} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
