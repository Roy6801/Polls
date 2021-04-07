import { Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import NavbarDash from "./components/dashboardpages/NavbarDash";
import Createform from "./components/dashboardpages/Createform";
import Contact from "./components/dashboardpages/Contact";
import About from "./components/dashboardpages/About";
import User from "./components/dashboardpages/User";
import useToken from "./components/useToken";

const App = () => {
  //window.localStorage.removeItem("polls-manager-system-G22");

  const { token, setToken } = useToken();

  console.log(token);

  if (!token) {
    return (
      <div>
        <Login setToken={setToken} />
      </div>
    );
  }

  return (
    <div>
      <div style={{  backgroundColor:"green", marginRight:"auto", width:"500px"}}>
        <NavbarDash setToken={setToken} />
      </div>
      <div
        style={{
          width: "auto",
          height: "auto",
          backgroundColor: "red",
      
          marginLeft:"auto"
         

        }}
      >
        <Switch>
          <Route exact path="/" component={User} />
          <Route exact path="/createform" component={Createform} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
