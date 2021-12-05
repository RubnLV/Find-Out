import React from "react";
import { Container,Row, Col } from "react-bootstrap";
import {FiInstagram} from'react-icons/fi';
import {FiMail} from'react-icons/fi';

import Enlaces from './../Menu/Enlaces';
import './estilosFooter.scss';

export default function Footer() {
    return(
        <Container className="footer">
            <Row className="">
                <Col xs={12} md={6} lg={6} className="enlaces">
                    <Enlaces />
                </Col>
                <Col xs={12} md={6} lg={6} className="enlaces">
                    <FiInstagram size="1.8em"/>&nbsp;&nbsp;<FiMail size="1.8em"/>
                </Col>
            </Row>
            <Row className="info">
                <p>
                    &copy; {new Date().getFullYear()} Copyright: Find Out
                </p>
                <p>
                    Desarrollado por: Rubén López Valenzuela
                </p>
            </Row>
        </Container>
    );
}