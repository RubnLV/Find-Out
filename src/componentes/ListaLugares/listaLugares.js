import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Row, Col, Alert, Button } from 'react-bootstrap';
import {BiArrowFromLeft as Siguiente} from 'react-icons/bi';
import {BiArrowFromRight as Anterior} from 'react-icons/bi';


import CardLugar from './../CardLugar/cardLugar';
//import Paginacion from './../Paginacion/paginacion';
import './estilosListaLugares.scss';

export default function ListaLugares(props){
    const {lugares} = props;
    const [numRegistros, setNumRegistros] = useState(0);

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
                    Puede añadir lugares con el boton
                    <Link exact to="/Nuevo-Lugar" >
                    "Nuevo Lugar"
                    </Link>
                </p>
            </Alert>
        );
    }

    const filtroLugares = () => {
        //debugger
        if(lugares.length >12){
            return lugares.slice(numRegistros, numRegistros+12);
        }else{
            return lugares;
        }
        
    }
    console.log(filtroLugares());
    
    const nextPage = () => {
        //debugger
        if(lugares.length > numRegistros+12){
            setNumRegistros(numRegistros+12);
        } 
    }
    const prevPage = () => {
        if(numRegistros > 0){
            setNumRegistros(numRegistros-12);
        }
    }
    console.log(numRegistros);
    return(
        <>
        <Row xs={1} md={3} lg={4} className="g-3 gridLista">
            {filtroLugares().map((lugar, idx) => (
                <Col key={idx}>
                    <CardLugar
                        lugar={lugar} index={idx}
                    />
                </Col>
            ))}
        </Row>
        {lugares.length > 1 &&
            <Row className="paginacion">
            <Button
            className="btnAnterior"
            style={{width: "10%"}}
            onClick={prevPage}
            >
                <Anterior />
            </Button>
            <Button
            className="btnSiguiente"
            style={{width: "10%"}}
            onClick={nextPage}
            >
                <Siguiente />
            </Button>
    </Row>
        }
        
        </>
    );
}