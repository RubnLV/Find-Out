import React from "react";
import { NavLink } from "react-router-dom";

export default function Enlaces(props){
    return(
        <ul>
            <li onClick={() => props.menuAbierto && props.closeMenu()}>
                <NavLink exact to="/Inicio">Inicio</NavLink>
            </li>
            <li onClick={() => props.menuAbierto && props.closeMenu()}>
                <NavLink exact to="/Descubre">Descubre</NavLink>
            </li>
            <li onClick={() => props.menuAbierto && props.closeMenu()}>
                <NavLink exact to="/servicios">Categorias</NavLink>
            </li>
            <li onClick={() => props.menuAbierto && props.closeMenu()}>
                <NavLink exact to="/contacto">Contacto</NavLink>
            </li>
        </ul>
    )
}
