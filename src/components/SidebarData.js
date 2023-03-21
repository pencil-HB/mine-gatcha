import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title : "Home",
        path: "/home", //기본위치
        icons : <AiIcons.AiFillHome />,
        cName : "nav-text", //classname
    },
    {
        title : "Gatcha",
        path: "/Gatcha",
        icons : <FaIcons.FaCartPlus />,
        cName : "nav-text", 
    },
    {
        title : "Reports",
        path: "/Reports",
        icons : <FaIcons.FaCartPlus />,
        cName : "nav-text", 
    },
]