import React from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

//import Login from './componentes/Login/login';
import FormLogin from './componentes/Login/formLogin';
import Registro from './componentes/AltaUsuario/altaUsuario'
import Inicio from './componentes/Inicio/inicio';

function App() {
  return (
    <Container fluid>
        <Router>
        <Switch>
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
