import Button from "@restart/ui/esm/Button";
import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

import { validaDatosLugar } from "./validacionFormLugar";
import { enviaDatos } from "../hooks/funciones";
import Menu from "./../Menu/NavBar";

import './estilosLugar.scss';

const URL_CONTROLADOR = 'http://localhost/FindOut/Controlador/controlador_guardaLugar.php';

export default function NuevoLugar() {

    const refLugar = useRef(null);
    const refDireccion = useRef(null);
    const refDescripcion = useRef(null);
    const refCategoria = useRef(null);
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
            "descripcion": refDescripcion.current.value,
            "categoria_id": refCategoria.current.value,
            "imagen": imagen

        }
        console.log(datos);
        //valida datos
        var datosValidados = validaDatosLugar(datos);
        console.log(datosValidados);
        //creamos opciones de envio
        var form = document.getElementById("formLogin");
        const opciones = {
            method: 'POST',
            body: new FormData(form)

        };
        console.log(opciones);
        //acciones despues de validar los datos en el cliente
        // console.log(datosValidados);
        if (datosValidados.valido) {
            const datosServ = await enviaDatos(URL_CONTROLADOR, opciones);
            console.log(datosServ);
            // if (datosServ.conectado) {
            //     history.push('/')
            // }else{
            //     setMensajes(datosServ.mensaje);
            //     setError(true);
            // } 

        } else {
            // setMensajes(datosValidados.mensaje);
            // setError(true);
            console.log('error al recibir info del php');
        }
    }

    return (
        <Container fluid className=" align-middle" style={{ margin: "0px", padding: "0px" }}>
            <Row style={{ margin: "0px", padding: "0px" }}>
                <Menu />
            </Row>
            <Row className="contenedor">
                <Col lg={5} md={6} xs={11} >
                    <div className="border-4 rounded divLugar">
                    <form
                        name="formLogin"
                        id="formLogin"
                        className="container-fluid "
                        style={{padding: 0}}
                        onSubmit={handleNuevoLugar}
                    >
                        <Row xl={8} className="jalign-items-center ">
                            <Col xl={12} className="form-floating mb-3">
                                <input
                                    name="lugar"
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Login ..."
                                    maxLength="30"
                                    required="required"
                                    ref={refLugar}
                                />
                                <label htmlFor="floatingInput">&nbsp;Lugar</label>
                            </Col>
                            <Col xl={12} className="form-floating mb-3">
                                <input
                                    name="direccion"
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Login ..."
                                    maxLength="30"
                                    required="required"
                                    ref={refDireccion}
                                />
                                <label htmlFor="floatingInput">&nbsp;Dirección</label>
                            </Col>
                            <Col xl={12} className="form-floating mb-3">
                                <textarea
                                    className="form-control"
                                    placeholder="Descripcion"
                                    id="floatingTextarea2"
                                    style={{ height: '100px' }}
                                    maxLength="500"
                                    required="required"
                                    ref={refDescripcion}
                                />
                                <label htmlFor="floatingTextarea2">&nbsp;Descripción</label>
                            </Col>
                            <Col xl={12} className="form-floating mb-3">
                                <p>Elige una Categoria</p>
                                <select
                                    className="form-select"
                                    style={{ padding: "10px 15px", fontSize: "0.9em" }}
                                    id="inputGroupSelect01"
                                    required="required"
                                    defaultValue={0}
                                    ref={refCategoria}
                                >
                                    <option value={0} >Categoria ...</option>
                                    <option value={1}>Spot</option>
                                    <option value={2}>Pubs</option>
                                    <option value={3}>Restaurante</option>
                                    <option value={3}>Lugar</option>
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
                                    <img src={preview} alt="Imagen" />
                                    <Button
                                        variant="warning"
                                        className="d-block btn btn-warning"
                                        onClick={() => setImagen(null)}
                                    >
                                        Eliminar Imagen
                                    </Button>
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

                    {
                        error &&
                        <Col xl={8} md={8} className="mb-3">
                            <Alert variant={'danger'}>
                                {mensaje}
                            </Alert>
                        </Col>

                    }
                    </div>
                </Col>
            </Row>
        </Container>
    );
}