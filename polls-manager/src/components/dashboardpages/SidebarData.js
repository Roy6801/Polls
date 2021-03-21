import React from "react";
import * as AiIcon from "react-icons/ai";
import * as IoIcon from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/dashboard",
    icon: <AiIcon.AiFillHome />,
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
];
