import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Helmet } from "react-helmet";
import {FiInstagram} from'react-icons/fi';
import {FiMail} from'react-icons/fi';

import Menu from "./../Menu/NavBar";
import Footer from "./../Footer/footer";
import './estilosQueEs.scss';

export default function QueEs() {
    const metas = {
        og_title: "¿Que es Find Out?", 
        og_type: "Website",
        og_image: "http://localhost/FindOut/assets/imagenes/Find-Out.png",
        og_url: "http://localhost:3000/Que-es-Find-Out",
        og_description: "En Find Out podras descubrir sitios interesantes y publicar tus sitios favoritos para los demas. Sorprendete con los diversos lugares que puedes entrar en nuestra app.",
        og_siteName: "Find Out Aplication Web",
        twitter_card: "summary_large_image",
        twitter_image_alt: "Find Out"
    }

    return(
        <>
            <Container fluid className="divPadre">
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
                <Row className="divInfo">
                   <Col xs={12} md={12} lg={12} className="info-text">
                        <p>
                            <span>¿Quieres descubrir nuevos lugares que visitar?</span><br/>

                            No te preocupes, hemos pensado en ello y 
                            hemos creado Find Out para que puedes buscar los mejores lugares para que encuentres la opción ideal para que puedas visitar.
                        </p>
                   </Col>
                   <Col xs={12} md={6} lg={6} className="info-img">
                        <Image src="http://localhost/FindOut/assets/imagenes/descubrir.jpg" fluid className="img-borde"/>
                   </Col>
                    <Col xs={12} md={6} lg={6} className="info-text">
                        <p>
                            <span>Explora, descubre, fotografía</span><br />

                            Explora los rincones de tu ciudad mediante nuestro catalogo, elige el lugar que más te guste y descubrelo.
                        </p>
                        
                    </Col>
                   <Col xs={12} md={6} lg={6} className="info-img">
                        <Image src="http://localhost/FindOut/assets/imagenes/contribuye.jpg" fluid className="img-borde"/>
                    </Col>
                    <Col xs={12} md={6} lg={6} className="info-text">
                        <p>
                            <span>Contribuye</span><br />

                            ¿Conoces algún sitio increíble y querrías compartirlo con los demás? Agrega lo rellenando el formulario y compartelo con los demas.
                        </p>
                        
                    </Col>
                    <Col xs={12} md={12} lg={12} className="info-text">
                        <p>
                            <span>¿Alguna duda?</span><br />

                            Tener preguntas es lo más normal. Puedes contactarnos enviándonos un email o a través de nuestras redes sociales.
                        </p>
                        
                    </Col>
                    <Col xs={12} md={12} lg={12} className="info-redes">
                    <FiInstagram size="2.5em"/>&nbsp;&nbsp;<FiMail size="2.5em"/>
                    </Col>
                </Row>
                <Row>
                    <Footer />
                </Row>
            </Container>
        </>
    );
}