import React from "react";
import { NavLink } from "react-router-dom";

export default function Enlaces(props) {
    return (
        <nav className="Menu">
            <ul>
                <li>
                    <NavLink exact to="/">Inicio</NavLink>
                </li>
                <li>
                    <NavLink exact to="/productos">Descubre</NavLink>
                </li>
            </ul>
        </nav>
    )
}
