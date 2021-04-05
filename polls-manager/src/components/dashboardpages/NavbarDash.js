import { useState } from "react";
import * as BiIcon from "react-icons/bi";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../stylesheets/NavbarDash.css";
import { IconContext } from "react-icons";

const NavbarDash = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars"></Link>
          </li>
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
        </ul>
      </nav>
    </>
  );
};

export default NavbarDash;
