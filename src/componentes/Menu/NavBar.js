import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.estilos.scss";
//import  Logo  from "../../img/logo192.png";

import MobilMenu from "./MobilMenu";
import Menu from "./Menu";

export default function NavBar(){
    return(
        <div className="NavBar">
            <NavLink className="enlaceTitulo" exact to="/">
                {/* <img src={Logo} alt="logo" className="logo"/> */}
                <h2 className="titulo">Find Out</h2>
            </NavLink>
            
            <Menu />
            <MobilMenu />
        </div>
    )
}