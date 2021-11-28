import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Alert } from 'react-bootstrap';
import { useHistory, useParams } from "react-router";

import Mapa from './../Mapa/mapa';
import {borraToken, getToken, validaToken, enviaDatos} from "../hooks/funciones";

const URL_CONTROLADOR = 'http://localhost/FindOut/Controlador/controlador_infoLugar.php';


export default function Lugar(){

    const history = useHistory();
    const params = useParams();
    const [informacion, setInformacion] = useState(null);

    const host = "http://localhost/FindOut";

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

    console.log(params.id);
    console.log(informacion);

    return(
        <Container fluid className="infoLugar">
            <Row><h1 className="tituloLugar">{informacion.nombre}</h1></Row>
            <Row>
                <Col xs={12} md={12} lg={6}>
                    <Image fluid  src={host + informacion.urlImagen.replace('./../', '/')} rounded />
                </Col>
                <Col xs={12} md={12} lg={6}>
                    <p>Dirección : {informacion.direccion}</p>
                    <p>{informacion.descripcion}</p>
                    <p>Categoria: {informacion.categoria}</p>
                </Col>
            </Row>
            {informacion.coordenadas &&
                <Row>
                    <Mapa coordenadas={informacion.coordenadas} />
                </Row>
            }
            <Row>
                footer
            </Row>
        </Container>
    );
}
