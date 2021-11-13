import React, { useEffect } from "react";
import { Container, Row, Button} from 'react-bootstrap';
import { useHistory } from "react-router";
import {borraToken, getToken, validaToken} from "../hooks/funciones";

import Lugares from "../Lugares/lugares"
import Menu from "./../Menu/NavBar";
import "./estilosInicio.scss"

export default function Inicio() {
    const history = useHistory();

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

        cargaTkn();
    },[]);
    
    return (
        
        <Container fluid>
            <Row>
                <Menu />
            </Row>
            <Row 
            style={{
                marginTop: "80px"
            }}>
                <h1>
                    Inicio
                </h1>
                <Lugares />
            </Row>
            
            <Button 
            variant="outline-dark"
            className="btnnuevoLugar"
            onClick={() => history.push('/Nuevo-Lugar')}
            >
                Añadir Lugar
            </Button>
        </Container>
    )
}