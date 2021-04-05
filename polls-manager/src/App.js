import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import NavbarDash from "./components/dashboardpages/NavbarDash";
import Createform from "./components/dashboardpages/Createform";
import Report from "./components/dashboardpages/Report";
import User from "./components/dashboardpages/User";
import useToken from "./components/useToken";

const App = () => {
  //window.localStorage.removeItem("polls-manager-system-G22");

  const { token, setToken } = useToken();
  console.log(token);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <div>
        <NavbarDash />
      </div>
      <div
        style={{
          width: "auto",
          height: "auto",
          backgroundColor: "red",
          float: "right",
        }}
      >
        <Switch>
          <Route exact path="/" component={User} />
          <Route exact path="/report" component={Report} />
          <Route exact path="/createform" component={Createform} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
