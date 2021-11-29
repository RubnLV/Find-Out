import React from "react";
import { Container,Row, Col } from "react-bootstrap";

import './estilosFooter.scss';

export default function Footer() {
    return(
        <Container className="footer">
            <Row className="enlaces">
                <Col xs={6} md={6} lg={6}>
                link
                </Col>
                <Col xs={6} md={6} lg={6}>
                link 2
                </Col>
            </Row>
            <Row className="info">
                <p>
                    &copy; {new Date().getFullYear()} Copyright: Find Out
                </p>
                <p>
                    Creador: Rubén López Valenzuela
                </p>
            </Row>
        </Container>
    );
}