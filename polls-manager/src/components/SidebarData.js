import React from 'react';
import * as AiIcon from 'react-icons/ai';
import *as IoIcon from 'react-icons/io';


export const SidebarData=[
    {
        title:'Home',
        path:'/',
        icon:<AiIcon.AiFillHome/>,
        cName:'nav-text'
    },
    {
        title:'Create Form',
        path:'/createform',
        icon:<IoIcon.IoMdCreate/>,
        cName:'nav-text'
    },
    {
        title:'Reports',
        path:'/report',
        icon:<IoIcon.IoIosPaper/>,
        cName:'nav-text'
    },
    {
        title:'Help',
        path:'/help',
        icon:<IoIcon.IoIosHelpCircle/>,
        cName:'nav-text'
    },
    {
        title:'About us',
        path:'/aboutus',
        icon:<AiIcon.AiFillInfoCircle/>,
        cName:'nav-text'
    },
    
]