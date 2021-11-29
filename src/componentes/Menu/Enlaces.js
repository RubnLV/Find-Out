import React from "react";
import { NavLink } from "react-router-dom";

export default function Enlaces(props){
    return(
        <ul>
            <li onClick={() => props.menuAbierto && props.closeMenu()}>
                <NavLink exact to="/">Inicio</NavLink>
            </li>
            <li onClick={() => props.menuAbierto && props.closeMenu()}>
                <NavLink exact to="/Descubre">Descubre</NavLink>
            </li>
            <li onClick={() => props.menuAbierto && props.closeMenu()}>
                <NavLink exact to="/Que-es-Find-Out">¿Que es Find Out?</NavLink>
            </li>
            <li onClick={() => props.menuAbierto && props.closeMenu()}>
                <NavLink exact to="/Contacto">Contacto</NavLink>
            </li>
        </ul>
    )
}
