<?php
    include_once('./../Modelo/guardaDireccion.php');

    $nombreLugar = 'retiro';
    $direccion = 'retiro 12';
    $coordenadas = '';
    $categoria = 4;
    $descripcion = 'retiro 12retiro 12retiro 12retiro 12retiro 12retiro 12';
    $url = './../assets/imagenes/mapa_default.jpg';


    $lugar = new GuardaDireccion();
    $nuevoLugar = $lugar->guardaLugar($nombreLugar,$direccion,$coordenadas,$categoria,$descripcion,$url);
    echo json_encode($nuevoLugar);

?>