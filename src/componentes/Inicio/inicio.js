import React, { useEffect, useState } from "react";
import { Container, Row, Button} from 'react-bootstrap';
import { useHistory } from "react-router";
import {borraToken, getToken, validaToken, enviaDatos} from "../hooks/funciones";

import {MdAddLocationAlt} from 'react-icons/md'
import ListaLugares from "./../ListaLugares/listaLugares";
import Menu from "./../Menu/NavBar";
import "./estilosInicio.scss";

const URL_CONTROLADOR = 'http://localhost/FindOut/Controlador/controlador_cargaDirecciones.php';

export default function Inicio() {
    const history = useHistory();
    const [direcciones, setDirecciones] = useState(null);

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
        };
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
            setDirecciones(datosServ.lugares);
        }
        

        cargaTkn();
        cargaDatos()
    },[]);
    
    //console.log(direcciones);

    return (
        
        <Container fluid>
            <Row>
                <Menu />
            </Row>
            <Row 
            style={{
                marginTop: "20px"
            }}>
                <ListaLugares lugares={direcciones} />
            </Row>
            <Row>
                <Button
                    className="btnNuevoLugar"
                    onClick={() => history.push('/Nuevo-Lugar')}
                >
                    <MdAddLocationAlt size="1.5em"/>
                </Button>
            </Row>
            <Row>
                footer
            </Row>  
        </Container>
    )
}