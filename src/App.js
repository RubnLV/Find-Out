import React from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

//import Login from './componentes/Login/login';
import FormLogin from './componentes/Login/formLogin';
import Registro from './componentes/AltaUsuario/altaUsuario';
import Inicio from './componentes/Inicio/inicio';
import NuevoLugar from './componentes/Lugares/nuevoLugar';

function App() {
  return (
    <Container fluid style={{margin: "0px", padding: "0px", height: "100%"}}>
        <Router>
        <Switch>
          <Route path="/Nuevo-Lugar" exact={true}>
            <NuevoLugar />
          </Route>
          <Route path="/Login" exact={true}>
            <FormLogin />
          </Route>
          <Route path="/Login" exact={true}>
            <FormLogin />
          </Route>
          <Route path="/Registro" exact={true}>
            <Registro />
          </Route>
          <Route path="/" exact={true}>
            <Inicio />
          </Route>
        </Switch>
      </Router>
      
    </Container>
  );
}

export default App;
