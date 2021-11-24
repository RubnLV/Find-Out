import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { borraToken, getToken, validaToken, enviaDatos } from "../hooks/funciones";
import { validaDatosLugar } from "./validacionFormLugar";
import Menu from "./../Menu/NavBar";

import './estilosLugar.scss';

const URL_CONTROLADOR = 'http://localhost/FindOut/Controlador/controlador_guardaLugar.php';

export default function NuevoLugar() {
    const history = useHistory();
    const refLugar = useRef(null);
    const refDireccion = useRef(null);
    const refDescripcion = useRef(null);
    const refCategoria = useRef(null);
    const refCoords = useRef(null);
    const refFileInput = useRef(null);

    const [imagen, setImagen] = useState(null)
    const [preview, setPreview] = useState(null)

    const [mensaje, setMensajes] = useState('');
    const [error, setError] = useState(false);

    const handleChangeImagen = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setImagen(undefined)
            return
        }
        setImagen(e.target.files[0])
    }

    useEffect(() => {
        if (!imagen) {
            setImagen(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(imagen)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [imagen])

    const handleNuevoLugar = async (e) => {
        e.preventDefault();
        //recoge datos
        const datos = {
            "lugar": refLugar.current.value,
            "direccion": refDireccion.current.value,
            "coordenadas": refCoords.current.value,
            "descripcion": refDescripcion.current.value,
            "categoria_id": refCategoria.current.value,
            "imagen": imagen

        }
        console.log(datos);
        //valida datos
        var datosValidados = validaDatosLugar(datos);
        console.log(datosValidados);
        //creamos opciones de envio
        var form = new FormData(document.getElementById("formLogin"));
        console.log(form);
        const opciones = {
            method: 'POST',
            body: form

        };
        console.log(opciones);
        //acciones despues de validar los datos en el cliente
        // console.log(datosValidados);
        if (datosValidados.valido) {
            const datosServ = await enviaDatos(URL_CONTROLADOR, opciones);
            console.log(datosServ);
            if (datosServ.conectado) {
                history.push('/')
            }else{
                setMensajes(datosServ.mensaje);
                setError(true);
            } 

        } else {
             setMensajes(datosValidados.mensaje);
             setError(true);
            console.log('error al recibir info del php');
        }
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

        cargaTkn();
    },[]);

    return (
        <Container fluid className=" align-middle" style={{ margin: "0px", padding: "0px" }}>
            <Row style={{ margin: "0px", padding: "0px" }}>
                <Menu />
            </Row>
            <Row className="contenedor">
                <Col lg={7} md={9} xs={11} >
                    <div className="border-4 rounded divLugar">
                    <form
                        name="formLogin"
                        id="formLogin"
                        className="container-fluid "
                        style={{padding: 0}}
                        encType="multipart/form-data"
                        onSubmit={handleNuevoLugar}
                    >
                        <Row xl={8} className="jalign-items-center ">
                            <Col xl={12} className="form-floating mb-3">
                                <input
                                    name="lugar"
                                    id="lugar"
                                    type="text"
                                    className="form-control"
                                    placeholder="Lugar ..."
                                    maxLength="30"
                                    required="required"
                                    ref={refLugar}
                                />
                                <label htmlFor="lugar">&nbsp;Lugar</label>
                            </Col>
                            <Col xl={12} className="form-floating mb-3">
                                <input
                                    name="direccion"
                                    id="direccion"
                                    type="text"
                                    className="form-control"
                                    placeholder="Dirección ..."
                                    maxLength="30"
                                    required="required"
                                    ref={refDireccion}
                                />
                                <label htmlFor="direccion">&nbsp;Dirección</label>
                            </Col>
                            <Col xl={12} className="form-floating mb-3">
                                <input
                                    name="coordenadas"
                                    id="coordenadas"
                                    type="text"
                                    className="form-control"
                                    placeholder="Coordenadas ..."
                                    maxLength="500"
                                    ref={refCoords}
                                />
                                <label htmlFor="coordenadas">&nbsp;Coordenadas</label>
                            </Col>
                            <Col xl={12} className="form-floating mb-3">
                                <textarea
                                    name="descripcion"
                                    id="descripcion"
                                    className="form-control"
                                    placeholder="Descripcion"
                                    style={{ height: '100px' }}
                                    maxLength="500"
                                    required="required"
                                    ref={refDescripcion}
                                />
                                <label htmlFor="descripcion">&nbsp;Descripción</label>
                            </Col>
                            <Col xl={12} className="form-floating mb-3">
                                <p>Elige una Categoria</p>
                                <select
                                    name="categoria"
                                    id="categoria"
                                    className="form-select"
                                    style={{ padding: "10px 15px", fontSize: "0.9em" }}
                                    required="required"
                                    defaultValue={0}
                                    ref={refCategoria}
                                >
                                    <option value={0} >Categoria ...</option>
                                    <option value={1}>Spot</option>
                                    <option value={2}>Pubs</option>
                                    <option value={3}>Restaurante</option>
                                    <option value={4}>Lugar</option>
                                </select>
                            </Col>
                            <Col xl={12} className="form-floating mb-3">
                                <label 
                                htmlFor="imagen"
                                className="lblImagen"
                                >
                                    Elija una imagen
                                </label>
                                <input
                                    className="control iptImagen"
                                    type="file"
                                    id="imagen"
                                    name="imagen"
                                    accept="image/png,image/jpeg"
                                    placeholder="Elija Imagen"
                                    onChange={handleChangeImagen}
                                />
                            </Col>
                            {
                                imagen &&
                                <Col xl={12} className="form-floating img-thumbnail mb-3">
                                    <img src={preview} alt="Imagen" className="img-thumbnail"/>
                                    <Button
                                        variant="warning"
                                        className="d-block btn btn-warning"
                                        onClick={() => setImagen(null)}
                                    >
                                        Eliminar Imagen
                                    </Button>
                                </Col>
                            }

                            {
                                error &&
                                <Col lg={12} md={12} xs={12} className="mb-3">
                                    <Alert variant={'danger'} onClose={() => setError(false)} dismissible >
                                        {mensaje}
                                    </Alert>
                                </Col>

                            }

                            <Col xl={8} className="mb-3 d-grid">
                                <Button
                                    name="guardarLugar"
                                    type="submit"
                                    className="btn btnGuardar "
                                >
                                    Guardar
                                </Button>
                            </Col>
                        </Row>
                    </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}