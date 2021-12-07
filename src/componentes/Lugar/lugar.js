import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Alert } from 'react-bootstrap';
import { useHistory, useParams } from "react-router";
import { Helmet } from 'react-helmet';

import {borraToken, getToken, validaToken, enviaDatos} from "../hooks/funciones";
import Mapa from './../Mapa/mapa';
import Menu from "./../Menu/NavBar";
import Footer from "./../Footer/footer";
import './estilosLugar.scss';


// const URL_CONTROLADOR = 'http://localhost/FindOut/Controlador/controlador_infoLugar.php';
// const URL_CONTROLADOR = './Controlador/controlador_infoLugar.php';
const URL_CONTROLADOR = '/Controlador/controlador_infoLugar.php';


export default function Lugar(){

    const history = useHistory();
    const params = useParams();
    const [informacion, setInformacion] = useState(null);

    // const host = "http://localhost/FindOut";

    useEffect(() => {
        async function cargaTkn() {
            const keys = getToken();
            console.log('login-getTkn');
            console.log(keys);
            if(!validaToken(keys)){
                borraToken();
                history.push('/Login')
            }
        }

        const datos = {
            "carga": true,
            "id": params.id
        };
        console.log(datos);
        const opciones = {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };
        async function cargaDatos(){
            const datosServ = await enviaDatos(URL_CONTROLADOR, opciones);
            //console.log(datosServ);
            datosServ.map((lugar) => {
                setInformacion(lugar);
            });
        }
        

        cargaTkn();
        cargaDatos();
    },[]);

    if(!informacion){
        return(
        <Alert variant={'primary'}>
            No se ha podido acceder a la informacioin del lugar
        </Alert>
        );
    }

    // console.log(params.id);
    // console.log(informacion);
    console.log(window.location.href);

    return(
        <>
        
        <Container fluid className="infoLugar">
        <Helmet>
            <meta property="og:title" content={informacion.nombre} />
            <meta property="og:type" content="Website" />
            <meta property="og:image" content={informacion.urlImagen.replace('./../', '/')} rounded alt={informacion.nombre} />
            <meta property="og:url" content={window.location.href} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:description" content={informacion.descripcion} />
            <meta property="og:site_name" content="Find Out Aplication Web" />
            <meta name="twitter:image:alt" content="summary_large_image" />
        </Helmet>
            <Row><Menu /></Row>
            <Row><h1 className="tituloLugar">{informacion.nombre}</h1></Row>
            <Row>
                <Col xs={12} md={7} lg={6} className="img-lugar">
                    <Image fluid  src={informacion.urlImagen.replace('./../', '/')} rounded alt={informacion.nombre}/>
                </Col>
                <Col xs={12} md={4} lg={6} className="detalles-lugar">
                    <p className="direccion-lugar">Dirección : {informacion.direccion}</p>
                    <p>{informacion.descripcion}</p>
                    <p>Categoria: {informacion.categoria}</p>
                </Col>
            </Row>
            {informacion.coordenadas &&
                <Row className="mapa-lugar">
                    <Mapa coordenadas={informacion.coordenadas} />
                </Row>
            }
            <Row>
                <Footer />
            </Row>
        </Container>
        </>
    );
}
