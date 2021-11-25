import React from "react";
import { Card, Button } from "react-bootstrap";

import {BsThreeDotsVertical as Dots} from 'react-icons/bs';

export default function CardLugar(props){
    const {lugar: {
        nombre, direccion, coordenadas, descripcion, urlImagen, id_lugar, categoria
    }, index} = props;
    const host = "http://localhost/FindOut";

    //host = 
    // console.log(props.lugar);
    console.log(urlImagen);
    return(
        <Card>
            <Button className=""><Dots/></Button>
            <Card.Img variant="top" src={host+urlImagen.replace('./../','/')} />
            <Card.Body>
                <Card.Title>{nombre}</Card.Title>
                <h3>{direccion}</h3>
                <Card.Text>
                    {descripcion}
                </Card.Text>
                
            </Card.Body>
        </Card>
    );
}