import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.estilos.scss";
//import  Logo  from "../../img/logo192.png";

import MobilMenu from "./MobilMenu";
import Menu from "./Menu";

export default function NavBar(){
    return(
        <div className="NavBar">
            <NavLink exact to="/Inicio">
                {/* <img src={Logo} alt="logo" className="logo"/> */}
                Menu
            </NavLink>
            
            <Menu />
            <MobilMenu />
        </div>
    )
}