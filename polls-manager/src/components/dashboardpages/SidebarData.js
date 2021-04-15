import React from "react";
import { MdPoll } from "react-icons/md";
import { FaUserCircle, FaInfoCircle } from "react-icons/fa";

export const SidebarData = [
  {
    title: "User",
    path: "/",
    icon: <FaUserCircle />,
    cName: "nav-text",
  },
  {
    title: "Create Poll",
    path: "/createpoll",
    icon: <MdPoll />,
    cName: "nav-text",
  },
  {
    title: "About Us",
    path: "/about",
    icon: <FaInfoCircle />,
    cName: "nav-text",
  },
];
