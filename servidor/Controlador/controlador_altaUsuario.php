<?php
    include_once('./../Modelo/direccion.php');
    include_once('./../Modelo/filtrado.php');
    //recoger los datos json del cliente
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    if (!empty($data))
    {
        $infoNombre = $data-> nombre;
        $infoApellidos = $data-> apellidos;
        $infoIdUser = $data-> nombreUsuario;
        $infoCorreo = $data-> correo;
        $infoPwd = $data-> clave;
        $infoTipo = $data-> tipo;
    
        if(!empty($infoNombre) and !empty($infoApellidos) and !empty($infoIdUser) and !empty($infoCorreo) and !empty($infoPwd) and !empty($infoTipo))
        {
            include_once('./../Modelo/altaUsuario.php');
            $nombre = filtrado($infoNombre);
            $apellidos = filtrado($infoApellidos);
            $login = filtrado($infoIdUser);
            $correo = filtrado($infoCorreo);
            $clave = filtrado($infoPwd);
            $fecha = date('Y-m-d H:i:s');
            if($infoTipo == 'x'){
                $tipo = 2;
            }

            $user = new AltaUsuarios();
            $alta = $user->altaUsuario($login,$nombre,$apellidos,$correo,$clave,$fecha,$tipo);
            echo json_encode($alta);
            //validar usuario desde controlador ingresando los datos aqui mismo
        }
        
    }else{
        $error = ['error' => 'No se ha resivido ningun dato'];
        echo json_encode($error);
    }
?>