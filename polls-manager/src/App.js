import { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Dashboard from "./components/dashboardpages/Dashboard";
import Login from "./components/login/Login";
import Service from "./components/Service";

const App = () => {
  const [user, setuser] = useState(null);

  const val = window.localStorage.getItem("polls-manager-system-G22");
  if (val !== null && val !== undefined) {
    Service.verifyToken({ userToken: val }).then((resp) => {
      setuser(resp.data.response.userName);
    });
  }

  if (user !== null) {
    return <h1>Hello</h1>;
  } else {
    return <Login />;
  }
};

export default App;
