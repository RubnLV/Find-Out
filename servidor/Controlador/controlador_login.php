<?php
    include_once('./../Modelo/direccion.php');
    include_once('./../Modelo/filtrado.php');
    //recoger los datos json del cliente
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    if (!empty($data))
    {
        $infoUsu = $data-> usuario;
        $infoPwd = $data-> clave;
    
        if(!empty($infoUsu) and !empty($infoPwd))
        {
            include_once('./../Modelo/login.php');
            $usuario = filtrado($infoUsu);
            $clave = filtrado($infoPwd);

            $login = new LoginUsuario();
            $logueo = $login->validaClave($usuario,$clave);
            //echo $logueo['id'];
            echo json_encode($logueo);
        }
        
    }else{
        $error = ['error' => 'No se ha resivido ningun dato'];
        echo json_encode($error);
    }
?>