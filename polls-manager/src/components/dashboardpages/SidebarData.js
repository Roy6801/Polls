import React from "react";
import * as AiIcon from "react-icons/ai";
import * as IoIcon from "react-icons/io";
import * as FaIcon from "react-icons/fa";
import * as BsIcon from "react-icons/bs";

export const SidebarData = [
  {
    title: "User",
    path: "/dashboard/user",
    icon: <FaIcon.FaUserCircle />,
    cName: "nav-text",
  },
  {
    title: "Create Form",
    path: "/dashboard/createform",
    icon: <IoIcon.IoMdCreate />,
    cName: "nav-text",
  },
  {
    title: "Reports",
    path: "/dashboard/report",
    icon: <IoIcon.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Help",
    path: "/dashboard/help",
    icon: <IoIcon.IoIosHelpCircle />,
    cName: "nav-text",
  },
  {
    title: "About US",
    path: "/dashboard/about",
    icon: <FaIcon.FaInfoCircle />,
    cName: "nav-text",
  },
  {
    title: "Contact Us",
    path: "/dashboard/contact",
    icon: <FaIcon.FaPhone/>,
    cName: "nav-text",
  },
  
];
