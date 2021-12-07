import React, { useEffect, useState } from "react";
import { Container, Row, Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

import {borraToken, getToken, validaToken, enviaDatos} from "./../hooks/funciones";
//import {Metas} from './../hooks/metadatos';
import {MdAddLocationAlt} from 'react-icons/md'
import ListaLugares from "./../ListaLugares/listaLugares";
import Menu from "./../Menu/NavBar";
import Footer from "./../Footer/footer";
import "./estilosInicio.scss";

// const URL_CONTROLADOR = 'http://localhost/FindOut/Controlador/controlador_cargaDirecciones.php';
const URL_CONTROLADOR = '/Controlador/controlador_cargaDirecciones.php';

export default function Inicio() {
    const history = useHistory();
    const [direcciones, setDirecciones] = useState(null);
    const metas = {
        og_title: "Find Out App", 
        og_type: "Website",
        og_image: "/assets/imagenes/Find-Out.png",
        og_url: window.location.href,
        og_description: "En Find Out podras descubrir sitios interesantes y publicar tus sitios favoritos para los demas. Sorprendete con los diversos lugares que puedes entrar en nuestra app.",
        og_siteName: "Find Out Aplication Web",
        twitter_card: "summary_large_image",
        twitter_image_alt: "Find Out"
    }

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
        <>
            <Container fluid>
                <Helmet>
                    <meta property="og:title" content={metas.og_title} />
                    <meta property="og:type" content={metas.og_type} />
                    <meta property="og:image" content={metas.og_image} />
                    <meta property="og:url" content={metas.og_url} />
                    <meta name="twitter:card" content={metas.twitter_card} />
                    <meta property="og:description" content={metas.og_description} />
                    <meta property="og:site_name" content={metas.og_siteName} />
                    <meta name="twitter:image:alt" content={metas.twitter_image_alt} />
                </Helmet>
                <Row
                    style={{
                        zIndex: "100"
                    }}>
                    <Menu />
                </Row>
                <Row
                    style={{
                        marginTop: "20px",
                        zIndex: "10"
                    }}>
                    <ListaLugares lugares={direcciones} />
                </Row>
                <Row>
                    <Button
                        className="btnNuevoLugar"
                        onClick={() => history.push('/Nuevo-Lugar')}
                    >
                        <MdAddLocationAlt size="1.5em" />
                    </Button>
                </Row>
                <Row>
                    <Footer />
                </Row>
            </Container>
        </>
    )
}