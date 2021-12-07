import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom';
import {CopyToClipboard} from "react-copy-to-clipboard";
import {MdReportProblem as Report} from 'react-icons/md';
import {FaShareAlt as Shared} from 'react-icons/fa';
import { Toaster, toast } from "react-hot-toast";

import './estilosCardLugar.scss';

export default function CardLugar(props){
    const {lugar: {
        nombre, direccion, coordenadas, descripcion, urlImagen, id_lugar, categoria
    }, index} = props;
    // const host = "http://localhost/FindOut";
    const ruta = useLocation();
    // const rutaLugar = `http://localhost:3000/Find-Out/${nombre.replace(/ /g, "-")}/id/${id_lugar}`;
    const rutaLugar = `http://rubenlv.com/Find-Out/${nombre.replace(/ /g, "-")}/id/${id_lugar}`;
    
    console.log(ruta);
    console.log(urlImagen);
    return(
        <>
        < div className="tarjeta">
            <div className="opciones">
                <Button className="btnReportar"><Report size="1.3em" /></Button>
                <CopyToClipboard text={rutaLugar}>
                    <Button className="btnCompartir" onClick={() => toast.success('Url Copiada')}><Shared size="1.3em" /></Button>
                </CopyToClipboard>                
            </div>
            <Card className="cardLugar">                
                <Link
                    to={`/Find-Out/${nombre.replace(/ /g, "-")}/id/${id_lugar}`}
                    className="linkLugar"
                >
                    <Card.Img variant="top" loading="lazy" src={urlImagen.replace('./../', '/')} />
                    <Card.ImgOverlay className="back-card">

                        {/* <Card.Title className="card-titulo">{nombre}</Card.Title>

                        <Card.Text className="card-direccion">
                            {direccion}
                        </Card.Text> */}
                    </Card.ImgOverlay>
                </Link>
                <div className="info-card">
                    <p className="card-titulo">{nombre}</p>
                    <p className="card-direccion">{direccion}</p>
                </div>
            </Card>
        </ div>
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    className: '',
                    duration: 2000,
                    style: {
                        background: '#0c2233',
                        color: '#fff',
                    }
                }}
            />
        </>

    );
}