import React, {useState} from "react";

import Enlaces from "./Enlaces";
import {RiMenu3Fill} from "react-icons/ri";
import {RiCloseCircleLine} from "react-icons/ri";

export default function MobilMenu (){

    const [open, setOpen] = useState(false);
    
    const menuIcon = <RiMenu3Fill className="MenuIcon" size='30px'
                        onClick={() => setOpen(!open)}
                    />
    const closeIcon = <RiCloseCircleLine className="MenuIcon" size='30px'
                    onClick={() => setOpen(!open)}
                    />
    const closeMenu = () => setOpen(false);
    return(
        <nav className="MobilMenu">
            {/*
            -Puedes incluir expresiones en JSX envolviéndolas en llaves.
            -Esto funciona porque en JavaScript, true && expresión siempre evalúa a expresión, y false && expresión siempre evalúa a false.
            -Por eso, si la condición es true, el elemento justo después de && aparecerá en el resultado. Si es false, React lo ignorará.
            */}
            {open ? closeIcon : menuIcon}
            {open && <Enlaces menuAbierto={true} closeMenu={closeMenu}/>} 
        </nav>
    )
}
