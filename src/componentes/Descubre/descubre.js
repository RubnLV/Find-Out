import React, {useEffect} from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from 'react-helmet';

import {borraToken, getToken, validaToken, enviaDatos} from "./../hooks/funciones";
import Menu from "./../Menu/NavBar";
import Footer from "./../Footer/footer";
import './estilosDescubre.scss';

export default function Descrube(){
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

    return(
        <>
            <Container fluid className="listaCategorias">
                <Helmet>
                    <meta property="og:title" content="Find Out Categorias" />
                    <meta property="og:type" content="Website" />
                    <meta property="og:image" content="/assets/imagenes/Find-Out.png" />
                    <meta property="og:url" content={window.location.href} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta property="og:description" content="Elige la categoria que mas te guste y encuentra el lugar que estas buscando" />
                    <meta property="og:site_name" content="Find Out Aplication Web" />
                    <meta name="twitter:image:alt" content="summary_large_image" />
                </Helmet>
                <Row><Menu /></Row>
                <Row className="g-4 mt-3 contenedor-categorias">
                    <Col xs={12} md={6} lg={6} className="divcategoria">
                    <Link 
                        to={`/Descubre/Categoria_Id/${1}`} 
                        className="linkCategoria"
                    >
                        <Card className="cardCategoria">
                            <Card.Img src="/assets/imagenes/spots.jpg" alt="" />
                            <Card.ImgOverlay className="overlayCategoria">
                                <Card.Title className="tituloCategoria"> Spots </Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                        </Link>
                    </Col>
                                    
                    <Col xs={12} md={6} lg={6} className="divcategoria">
                        <Link 
                            to={`/Descubre/Categoria_Id/${3}`} 
                            className="linkCategoria"
                        >
                        <Card className="cardCategoria">
                            <Card.Img src="/assets/imagenes/restaurantes.jpg" alt="" />
                            <Card.ImgOverlay className="overlayCategoria">
                                <Card.Title className="tituloCategoria"> Restaurantes </Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                        </Link>
                    </Col>
                    <Col xs={12} md={6} lg={6} className="divcategoria">
                        <Link 
                            to={`/Descubre/Categoria_Id/${2}`}
                            className="linkCategoria"
                        >
                        <Card className="cardCategoria">
                            <Card.Img src="/assets/imagenes/pubs.jpg" alt="" />
                            <Card.ImgOverlay className="overlayCategoria">
                                <Card.Title className="tituloCategoria"> Pubs </Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                        </Link>
                    </Col>
                    <Col xs={12} md={6} lg={6} className="divcategoria">
                        <Link 
                            to={`/Descubre/Categoria_Id/${4}`} 
                            className="linkCategoria"
                        > 
                        <Card className="cardCategoria">
                            <Card.Img src="/assets/imagenes/lugares.jpg" alt="" />
                            <Card.ImgOverlay className="overlayCategoria">
                                <Card.Title className="tituloCategoria"> Lugares </Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Footer />
                </Row>
            </Container>
        </>
    );
}