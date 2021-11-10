import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

export default function NuevoLugar(){

    const refLugar = useRef(null);
    const refDireccion = useRef(null);
    const refDescripcion = useRef(null);
    const refCategoria = useRef(null);
    const refFileInput = useRef(null);

    const [mensaje, setMensajes] = useState('');
    const [error, setError] = useState(false);


    const handleNuevoLugar = async (e) => {
        e.preventDefault();
        //recoge datos
        const datos = {
            "lugar": refLugar.current.value,
            "direccion": refDireccion.current.value,
            "descripcion": refDescripcion.current.value,
            "categoria_id": refCategoria.current.value

        }
        console.log(datos);
        //valida datos
        
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
                                    ref={refDescripcion}
                                />
                                <label htmlFor="floatingTextarea2">Descripción</label>
                            </Col>
                            <Col xl={12} className="form-floating mb-3">
                                <p>Elige una Categoria</p>
                                <select 
                                className="form-select"
                                style={{padding: "10px 15px"}} 
                                id="inputGroupSelect01"
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
                                />

                            </Col>
                            <Col xl={8} className="mb-3 d-grid">
                            <button
                                name="guardarLugar"
                                type="submit"
                                className="btn btn-primary "
                            >
                                Guardar
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
            </Row>
        </Container>
    );
}