import React from "react";
import { Row, Col, Alert } from 'react-bootstrap';

import CardLugar from './../CardLugar/cardLugar'

export default function ListaLugares(props){
    const {lugares} = props;

    console.log('listaLugares');
    console.log(lugares);
    if(!lugares || lugares.length === 0){
        return(
            <Alert variant="primary">
                <Alert.Heading>Aviso</Alert.Heading>
                <p>
                   No hay lugares registrados
                </p>
                <hr />
                <p className="mb-0">
                    Puede añadir lugares con el boton "Nuevo Lugar"
                </p>
            </Alert>
        );
    }

    return(
        <Row xs={1} md={2} lg={3} className="g-4">
            {lugares.map((lugar, idx) => (
                <Col key={idx}>
                    <CardLugar
                        lugar={lugar} index={idx}
                    />
                </Col>
            ))}
        </Row>
    );
}