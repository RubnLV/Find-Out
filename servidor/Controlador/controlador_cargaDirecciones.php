<?php
    include_once('./../Modelo/direccion.php');
    //recoger los datos json del cliente
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    if (!empty($data))
    {
        $carga = $data->carga;
        // $carga = ['carga' => $carga];
        // echo json_encode($carga);
        if($carga)
        {
            // $info = ['info' => 'obtener info'];
            // echo json_encode($info);
            include_once('./../Modelo/cargarDirecciones.php');
            $direcciones = new CargaDirecciones();
            $info = $direcciones->getDirecciones();
            echo json_encode($info);
        }
        
    }else{
        $error = ['error' => 'No se ha resivido ningun dato'];
        echo json_encode($error);
    }
?>