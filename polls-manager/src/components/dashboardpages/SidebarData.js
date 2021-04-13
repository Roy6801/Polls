import React from "react";
import * as AiIcon from "react-icons/ai";
import * as IoIcon from "react-icons/io";
import * as FaIcon from "react-icons/fa";
import * as BsIcon from "react-icons/bs";

export const SidebarData = [
  {
    title: "User",
    path: "/",
    icon: <FaIcon.FaUserCircle />,
    cName: "nav-text",
  },
  {
    title: "Create Form",
    path: "/createform",
    icon: <IoIcon.IoMdCreate />,
    cName: "nav-text",
  },
  {
    title: "About Us",
    path: "/about",
    icon: <FaIcon.FaInfoCircle />,
    cName: "nav-text",
  },
  {
    title: "Contact Us",
    path: "/contact",
    icon: <FaIcon.FaPhone />,
    cName: "nav-text",
  },
];
