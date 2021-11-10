import React, {useState, useEffect}from "react";
import { Container } from "react-bootstrap";

const URL_CONTROLADOR = 'http://localhost/FindOut/Controlador/controlador_altaUsuario.php';

export default function Mapa() {
    // useEffect(() => {
    //     const opciones = {
    //         method: 'POST',
    //         body: JSON.stringify(datos),
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-type': 'application/json'
    //         }
    //     };
    //     const datosServ = await enviaDatos(URL_CONTROLADOR, opciones);
    // },[]);
    return (
        <Container>
            <h1>lugares</h1>
        </Container>
    );
}