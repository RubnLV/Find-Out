import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { setToken, borraToken, getToken, validaToken, enviaDatos } from "../hooks/funciones";
import { validaDatosLogin } from "./validaDatosLogin"

import './../estilos/estilosLoginRegistro.scss';

const URL_CONTROLADOR = 'http://localhost/FindOut/Controlador/controlador_login.php';

export default function FormLogin() {
    const history = useHistory();
    const refUsuario = useRef(null);
    const refClave = useRef(null);
    const [mensaje, setMensajes] = useState('');
    const [error, setError] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        //recoge datos
        const datos = {
            "usuario": refUsuario.current.value,
            "clave": refClave.current.value
        }
        //valida datos
        var datosValidados = validaDatosLogin(datos);
        //console.log(opciones);
        //acciones despues de validar los datos en el cliente
        console.log(datosValidados);
        if (datosValidados.valido) {
            //creamos opciones de envio
            const opciones = {
                method: 'POST',
                body: JSON.stringify(datos),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            };
            const datosServ = await enviaDatos(URL_CONTROLADOR, opciones);
            console.log(datosServ);
            if (datosServ.conectado) {
                const objLS = {
                    "tkn": datosServ.token,
                    "time": new Date()
                }
                setToken(objLS);
                history.push('/')
            } else {
                setMensajes(datosServ.mensaje);
                setError(true);
            }
        } else {
            setMensajes(datosValidados.mensaje);
            setError(true);
        }
    }

    useEffect(() => {
        async function cargaTkn() {
            const keys = getToken();
            console.log('login-getTkn');
            //console.log(keys);
            if (!validaToken(keys)) {
                borraToken();
                history.push('/Login');
            } else {
                history.push('/');
            }
        }

        cargaTkn();
    }, []);

    return (
        <Container fluid className="align-middle contenedorInicio" style={{ margin: "0px", padding: "0px" }}>
            <Row className="barraSuperior">
                <h3 className="titulo">Finf Out</h3>
            </Row>
            <Row className="contenedor">
                <Col lg={5} md={6} xs={9} >
                    <div className="border border-4 rounded divLogin">
                        <Row>
                            <form name="formLogin"
                                className="container-fluid flex-column" onSubmit={handleLogin}>
                                <Row className="jalign-items-center mt-4">
                                    <Col lg={12} md={12} xs={12} className="form-floating mb-3">
                                        <input
                                            name="username"
                                            type="text"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Login ..."
                                            maxLength="30"
                                            required="required"
                                            ref={refUsuario}
                                        />
                                        <label htmlFor="floatingInput">&nbsp;Usuario</label>
                                    </Col>
                                    <Col lg={12} md={12} xs={12} className="form-floating mb-3">
                                        <input
                                            name="userpass"
                                            type="password"
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder="Contraseña"
                                            maxLength="15"
                                            required="required"
                                            ref={refClave}
                                        />
                                        <label htmlFor="floatingPassword">&nbsp;Contraseña</label>
                                    </Col>
                                    <Col className="mb-3 d-grid">
                                        <button
                                            name="enviodatos"
                                            type="submit"
                                            className="btn btnEntrar"
                                        >
                                            Entrar
                                        </button>
                                    </Col>
                                </Row>
                            </form>
                        </Row>
                        <Row>
                            {
                                error &&
                                <Col lg={12} md={12} xs={12} className="mb-3">
                                    <Alert variant={'danger'} onClose={() => setError(false)} dismissible>
                                        {mensaje}
                                    </Alert>
                                </Col>

                            }
                        </Row>
                        <Row>
                            <Col lg={12} md={12} xs={12} className="mb-3">
                                <Link to="/RecuperarClave" className="recuperaPwd">¿Olvidó su contraseña?</Link>

                            </Col>
                            <Col lg={12} md={12} xs={12} className="mb-3">
                                <Link to="/Registro" className="btn btnRegistro">Registro</Link>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

