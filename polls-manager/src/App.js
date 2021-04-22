import { Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import NavbarDash from "./components/dashboardpages/NavbarDash";
import CreateForm from "./components/dashboardpages/CreateForm";
import About from "./components/dashboardpages/About";
import User from "./components/dashboardpages/User";
import useToken from "./components/useToken";
import Poll from "./components/interface/Poll";
import AdminPoll from "./components/userpages/AdminPoll";


const App = () => {
  
  const { token, setToken } = useToken("$$$NULL$$$");

  if (token === "$$$NULL$$$") {
    return (
      <div
        className="Login-page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url("https://frepple.com/wp-content/uploads/business-poll-survey2-2401.jpg")`,
          backgroundRepeat: "no-repeat",
          height: "100vh",
          backgroundColor: "lightblue",
          backgroundSize: "100vw 100vh",
        }}
      >
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
          <Route
            exact
            path="/PollInfo/:userName/:pollURL"
            component={AdminPoll}
          />
          <Route path="*" component={User} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
