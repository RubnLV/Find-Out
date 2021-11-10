import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { setToken, borraToken, getToken, validaToken, enviaDatos } from "../hooks/funciones";
import { validaDatosLogin } from "./validaDatosLogin"

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
        //creamos opciones de envio
        const opciones = {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };
        //console.log(opciones);
        //acciones despues de validar los datos en el cliente
        console.log(datosValidados);
        if (datosValidados.valido) {
            const datosServ = await enviaDatos(URL_CONTROLADOR, opciones);
            console.log(datosServ);
            if (datosServ.conectado) {
                const objLS = {
                    "tkn": datosServ.token,
                    "time": new Date()
                }
                setToken(objLS);
                history.push('/')
            }else{
                setMensajes(datosServ.mensaje);
                setError(true);
            }  
        }else{
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
        <Container className=" align-middle p-4">
            <Row className="justify-content-center border border-4 rounded">
                <Col md={8}>
                    <form name="formLogin"
                        className="container-fluid " onSubmit={handleLogin}>
                        <Row xl={8} className="jalign-items-center mt-5">
                            <Col xl={12} className="form-floating mb-3">
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
                                <label htmlFor="floatingInput">Usuario</label>
                            </Col>
                            <Col xl={8} className="form-floating mb-3">
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
                                <label htmlFor="floatingPassword">Contraseña</label>
                            </Col>
                            <Col xl={8} className="mb-3 d-grid">
                            <button
                                name="enviodatos"
                                type="submit"
                                className="btn btn-primary "
                            >
                                Entrar
                            </button>
                            </Col> 
                        </Row>
                    </form>
                </Col>
                {
                    error &&
                    <Col xl={8} md={8} className="mb-3">
                        <Alert variant={'danger'}>
                            {mensaje}
                        </Alert>
                    </Col>
                    
                }
                <Col xl={8} md={8} className="mb-3">
                    ¿Olvidó su contraseña?&nbsp;&nbsp;
                    <Link to="/RecuperarClave" className="link-primary">Recuperar contraseña</Link>

                </Col>
                <Col xl={8} md={8} className="mb-3">
                    <Link to="/Registro" className="btn btn-outline-primary">Registro</Link>
                </Col>
            </Row>
        </Container>
    )
}

