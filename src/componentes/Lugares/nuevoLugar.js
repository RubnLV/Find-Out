import Button from "@restart/ui/esm/Button";
import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

import{validaDatosLugar} from "./validacionFormLugar";

export default function NuevoLugar(){

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

        // I've kept this example simple by using the first image instead of multiple
        setImagen(e.target.files[0])
    }

    useEffect(() => {
        if (!imagen) {
            setImagen(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(imagen)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
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
        // console.log(datosValidados);
        // if (datosValidados.valido) {
        //     const datosServ = await enviaDatos(URL_CONTROLADOR, opciones);
        //     console.log(datosServ);
        //     if (datosServ.conectado) {
        //         const objLS = {
        //             "tkn": datosServ.token,
        //             "time": new Date()
        //         }
        //         setToken(objLS);
        //         history.push('/')
        //     }else{
        //         setMensajes(datosServ.mensaje);
        //         setError(true);
        //     }  
        // }else{
        //     setMensajes(datosValidados.mensaje);
        //     setError(true);
        // }
    }

    return(
        <Container className=" align-middle p-4">
            <Row className="justify-content-center border border-4 rounded">
                <Col md={8}>
                    <form name="formLogin"
                        className="container-fluid " onSubmit={handleNuevoLugar}>
                        <Row xl={8} className="jalign-items-center mt-5">
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
                                style={{padding: "10px 15px", fontSize: "0.9em"}} 
                                id="inputGroupSelect01"
                                required="required"
                                ref={refCategoria}
                                >
                                    <option selected>Categoria ...</option>
                                    <option value={1}>Spot</option>
                                    <option value={2}>Pubs</option>
                                    <option value={3}>Restaurante</option>
                                    <option value={3}>Lugar</option>
                                </select>
                            </Col>
                            <Col xl={12} className="form-floating mb-3">
                                <p>Elija una imagen</p>
                                <input
                                    className="control"
                                    type="file"
                                    id="formFile"
                                    accept="image/png,image/jpeg"
                                    onChange={handleChangeImagen}
                                />
                            </Col>
                            {
                                imagen &&
                                <Col xl={12} className="form-floating mb-3">
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
                                className="btn btn-primary "
                            >
                                Guardar
                            </Button>
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
            </Row>
        </Container>
    );
}