import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { enviaDatos } from "../hooks/funciones";
import { validaDatosRegistro } from './validaDatosRegistro';

const URL_CONTROLADOR = 'http://localhost/FindOut/Controlador/controlador_altaUsuario.php';

export default function AltaUsuario() {
    const history = useHistory();
    const refNombre = useRef(null);
    const refApellidos = useRef(null);
    const refNombreUsuario = useRef(null);
    const refCorreo = useRef(null);
    const refClave = useRef(null);
    const refTipo = useRef(null);
    const [mensaje, setMensajes] = useState('');
    const [error, setError] = useState(false);
    const [show, setShow] = useState(true);

    const handleAlta = async (e) => {
        e.preventDefault();
        const datos = {
            "nombre": refNombre.current.value,
            "apellidos": refApellidos.current.value,
            "nombreUsuario": refNombreUsuario.current.value,
            "correo": refCorreo.current.value,
            "clave": refClave.current.value,
            "tipo": refTipo.current.value
        };
        console.log(datos);
        //validacion
        const datosValidados = validaDatosRegistro(datos);
        console.log(datosValidados);
        //creamos opciones de envio
        const opciones = {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };
        if (datosValidados.valido) {
            const datosServ = await enviaDatos(URL_CONTROLADOR, opciones);
            console.log(datosServ);
            if (datosServ.conectado) {
                setMensajes(datosServ.mensaje);
                setShow(true);
                //history.push('/Login')
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
        setShow(false);
    },[]);

    return (
        <Container fluid className="align-middle">
            {
                show &&
                <Alert show={show} variant="success">
                    <Alert.Heading>How's it going?!</Alert.Heading>
                    {mensaje}
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => history.push('/Login')} variant="outline-success">
                            Ir al Login
                        </Button>
                    </div>
                </Alert>
            }
            <Row className="justify-content-md-center mt-5">
                <Col ms={12} md={8}>
                    <form name="formAlta" className="container-fluid " onSubmit={handleAlta}>
                        <Row className="justify-content-md-center">
                            <Col md={6} xs={12} className="form-floating mb-3">
                                <input
                                    name="nombre"
                                    id="nombre"
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Login ..."
                                    maxLength="30"
                                    required="required"
                                    ref={refNombre}
                                />
                                <label htmlFor="floatingInput">&nbsp;Nombre</label>
                            </Col>

                            <Col md={6} xs={12} className="form-floating mb-3">
                                <input
                                    name="apellidos"
                                    id="apellidos"
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Login ..."
                                    maxLength="60"
                                    required="required"
                                    ref={refApellidos}
                                />
                                <label htmlFor="floatingInput">&nbsp;Apellidos</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4} xs={12} className="form-floating mb-3">
                                <input
                                    name="nombreUsuario"
                                    id="nombreUsuario"
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Login ..."
                                    maxLength="30"
                                    required="required"
                                    ref={refNombreUsuario}
                                />
                                <label htmlFor="floatingInput">&nbsp;Nombre de Usuario</label>
                            </Col>

                            <Col md={8} xs={12} className="form-floating mb-3">
                                <input
                                    name="correo"
                                    id="correo"
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Login ..."
                                    maxLength="120"
                                    required="required"
                                    ref={refCorreo}
                                />
                                <label htmlFor="floatingInput">&nbsp;Correo</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} xs={12} className="form-floating mb-3">
                                <input
                                    name="clave"
                                    id="clave"
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
                        </Row>
                        <Row>
                            {
                                error &&
                                <Col xl={8} md={8} className="mb-3">
                                    <Alert variant={'danger'}>
                                        {mensaje}
                                    </Alert>
                                </Col>

                            }
                            <Col xl={8} md={8} className="mb-3">
                                <button
                                    name="enviodatos"
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                >
                                    Registrarse
                                </button>
                            </Col>
                        </Row>

                        <input name="tipo" id="tipo" type="hidden" value="x" ref={refTipo} />

                    </form>
                </Col>
            </Row>
        </Container>
    );
}