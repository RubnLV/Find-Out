import React from "react";
import { Card, Button } from "react-bootstrap";

import {MdReportProblem as Report} from 'react-icons/md';
import './estilosCardLugar.scss';

export default function CardLugar(props){
    const {lugar: {
        nombre, direccion, coordenadas, descripcion, urlImagen, id_lugar, categoria
    }, index} = props;
    const host = "http://localhost/FindOut";

    //host = 
    // console.log(props.lugar);
    console.log(urlImagen);
    return(
        <Card className="cardLugar">
            <Button className="btnReportar"><Report size="1.2em"/></Button>
            <Card.Img variant="top" src={host+urlImagen.replace('./../','/')} />
            <Card.Body>
                <Card.Title>{nombre}</Card.Title>
                <p>{direccion}</p>
                <Card.Text>
                    {descripcion}
                </Card.Text>
                <div>
                    <p>Categoria: {categoria}</p>
                </div>
            </Card.Body>
        </Card>
    );
}