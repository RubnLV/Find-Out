import React from 'react';
import { Container} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

//import Login from './componentes/Login/login';
import FormLogin from './componentes/Login/formLogin';
import Registro from './componentes/AltaUsuario/altaUsuario';
import Inicio from './componentes/Inicio/inicio';
import NuevoLugar from './componentes/Lugares/nuevoLugar';
import Lugar from './componentes/Lugar/lugar';

function App() {
  return (
    <Container fluid style={{margin: "0px", padding: "0px", height: "100%"}}>
        <Router>
        <Switch>
        <Route path="/" exact={true}>
            <Inicio />
          </Route>
          <Route path="/Login" exact={true}>
            <FormLogin />
          </Route>
          <Route path="/Registro" exact={true}>
            <Registro />
          </Route>
          <Route path="/Nuevo-Lugar" exact={true}>
            <NuevoLugar />
          </Route>
          <Route path="/Find-Out/:nombre/id/:id" exact={true}>
            <Lugar />
          </Route>
          <Route path="/Descubre" exact={true}>
          Descubre
          </Route>  
          <Route path="/Que-es-Find-Out" exact={true}>
          Que-es-Find-Out
          </Route>
          <Route path="/Contacto" exact={true}>
          Contacto
          </Route> 
        </Switch>
      </Router>
      
    </Container>
  );
}

export default App;
