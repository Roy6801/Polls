import { useState } from "react";
import propTypes from "prop-types";
import * as BiIcon from "react-icons/bi";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../stylesheets/NavbarDash.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IconContext } from "react-icons";
import Service from "../Service";

const NavbarDash = ({ setToken }) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const handleClick = () => {
    window.localStorage.setItem("polls-manager-system-G22", "$$$NULL$$$");
    window.localStorage.setItem("polls-manager-system-G22-user", "$$$NULL$$$");
    setToken("$$$NULL$$$");
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <BiIcon.BiLayer onClick={showSidebar} />
            <h2
              onClick={showSidebar}
              style={{ color: "#f5f5f5", margin: "15px" }}
            >
              {window.localStorage.getItem("polls-manager-system-G22-user")}
            </h2>
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            {SidebarData.map((items, index) => {
              return (
                <li key={index} className={items.cName}>
                  <Link to={items.path}>
                    {items.icon}
                    <span>{items.title}</span>
                  </Link>
                </li>
              );
            })}
            <button
              type="submit"
              className="btn btn-primary logout"
              onClick={handleClick}
            >
              LogOut
            </button>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

NavbarDash.protoTypes = {
  setToken: propTypes.func.isRequired,
};

export default NavbarDash;
