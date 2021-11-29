import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

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
        <>
        <Button className="btnReportar"><Report size="1.2em" /></Button>
            <Card className="cardLugar">
                
                <Link
                    to={`/Find-Out/id/${id_lugar}`}
                    className="linkLugar"
                >
                    <Card.Img variant="top" loading="lazy" src={host + urlImagen.replace('./../', '/')} />
                    <Card.ImgOverlay className="back-card">

                        <Card.Title className="card-titulo">{nombre}</Card.Title>

                        <Card.Text className="card-direccion">
                            {direccion}
                        </Card.Text>
                    </Card.ImgOverlay>
                </Link>
            </Card>
        </>

    );
}