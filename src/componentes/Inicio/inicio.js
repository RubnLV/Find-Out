import React, { useEffect } from "react";
import { Container, Row,} from 'react-bootstrap';
import { useHistory } from "react-router";

import {borraToken, getToken, validaToken} from "../hooks/funciones";
import Mapa from "../Mapa/mapa"

import Menu from './../Menu/NavBar';

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
        
        <Container>
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
                <Mapa />
            </Row>
        </Container>
    )
}