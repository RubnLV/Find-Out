<?php
include_once('./../Modelo/direccion.php');
include_once('./../Modelo/filtrado.php');
include_once('./../Modelo/redimencionar.php');
include_once('./../Modelo/guardaDireccion.php');
$respuesta = [];

    if(!empty($_POST))
    {
        if(!empty($_POST['lugar']))
        {
            $lugar = filtrado($_POST['lugar']);
            //$respuesta['lugar'] = $lugar;
        }else{
            $respuesta['error'] = 'No se a recibido informacion del lugar';
        }
        if(!empty($_POST['direccion']))
        {
            $direccion = filtrado($_POST['direccion']);
            $direccion = str_replace("\t", '', $direccion); // quitar tabulacion
            $direccion = str_replace("\r", '', $direccion); // quitar retorno de carro
            //$respuesta['direccionmp'] = $direccion;
        }else{
            $respuesta['error'] = 'No se a recibido informacion de la dirección';
        }
        if(!empty($_POST['coordenadas']))
        {
            $coordenadas = filtrado($_POST['coordenadas']);
            //$respuesta['coordenadas'] = $coordenadas;
        }else{
            $coordenadas = '';
        }
        if(!empty($_POST['descripcion']))
        {
            $descripcion = filtrado($_POST['descripcion']);
            $descripcion = str_replace("\t", '', $descripcion); // quitar tabulacion
            $descripcion = str_replace("\r", '', $descripcion); // quitar retorno de carro
            //$respuesta['descripcion'] = $descripcion;
        }else{
            $respuesta['error'] = 'No se a recibido informacion de la descripcion';
        }
        if(!empty($_POST['categoria']))
        {
                $categoria = filtrado($_POST['categoria']);
                if($categoria >=1 || $categoria<=4){
                    $categoria = (int)$categoria;
                    //$respuesta['categoria'] = $categoria;
                }
                else{
                    $respuesta['error'] = 'La categoria es incorrecta';
                }
        }else{
            $respuesta['error'] = 'No se a recibido informacion de la categoria';
        }
        // $respuesta['a'] = 1;
        // $respuesta['files'] = $_FILES['imagen']['name'];
        if(!empty($_FILES['imagen']['name']) || $_FILES['imagen']['name'] != '')
        {
            //$respuesta['files'] = 'entro';
            if(strpos($_FILES['imagen']['type'],'jpeg') || strpos($_FILES['imagen']['type'],'jpg') || strpos($_FILES['imagen']['type'],'png')){
                $nombre_imagen = $_FILES['imagen']['name'];
                $tipo_imagen = $_FILES['imagen']['type'];
                $tmp_imagen = $_FILES['imagen']['tmp_name'];
                $tamaño_imagen = $_FILES['imagen']['size'];
                $default = false;
                // $respuesta['name-imagen'] = $_FILES['imagen']['name'];
                // $respuesta['type-imagen'] = $_FILES['imagen']['type'];
                // $respuesta['tmp-imagen'] = $_FILES['imagen']['tmp_name'];
                // $respuesta['size-imagen'] = $_FILES['imagen']['size'];
            }else{
                $respuesta['error'] = 'Error en el tipo de archivo';
            }            
        }else{
            $nombre_imagen_default = './../assets/imagenes/mapa_default.jpg';
            $default = true;
        }
        //$respuesta['default'] = $default;
        //acciones a realizar si no hay ningun error, si respuesta esta vacio
        if(empty($respuesta))
        {
            $dirImg = './../assets/imagenes';
            switch ($categoria) 
            {
                case 1:
                    $dirImg = $dirImg.'/Spots';
                    break;
                case 2:
                    $dirImg = $dirImg.'/Pubs';
                    break;
                case 3:
                    $dirImg = $dirImg.'/Restaurantes';
                    break;
                case 4:
                    $dirImg = $dirImg.'/Lugares';
                    break;
            }
            $respuesta['dirImg'] = $dirImg;
            if(is_dir($dirImg))
            {
                //$archivo = $dirImg.'/'.$nombre_imagen;
                //$respuesta['dafault2'] = $default;
                if(!$default)
                {
                    $archivo = $dirImg.'/'.$nombre_imagen;
                    //$respuesta['dafault'] = 0;
                    if(!file_exists($archivo)){
                        //$respuesta['subido'] = true;
                        if(move_uploaded_file($tmp_imagen, $archivo)){
                            $guardado = true;
                            $existe = false;
                            //$respuesta['guardado'] = $guardado;
                        }
                    }else{
                        $guardado = false;
                        $existe = true;
                        $respuesta['error'] = 'La imagen ya existe';
                    }
                }
            }else{
                //$respuesta['isdir'] = 'f';
                mkdir($dirImg ,0777,true);
                //$respuesta['isdir_'] = 'c';
                if(!$default){
                    $archivo = $dirImg.'/'.$nombre_imagen;
                    if(!file_exists($archivo)){
                        $respuesta['subido'] = true;
                        if(move_uploaded_file($tmp_imagen, $archivo)){
                            $guardado = true;
                            $existe = false;
                            //$respuesta['guardado'] = $guardado;
                        }
                    }else{
                        $guardado = false;
                        $existe = true;
                        $respuesta['error'] = 'La imagen ya existe';
                    }
                }
            }
//--------
            if(!$default)
            {
                if($guardado == true && $existe == false)
                {
                    //creamos la imagen para la web
                    $dirImgWeb = $dirImg.'_web';
                    $imagenWeb = $dirImgWeb.'/'.$nombre_imagen;
                    //$respuesta['web'] = $dirImgWeb.' y '.$imagenWeb;
                    if(is_dir($dirImgWeb)){
                        if(file_exists($archivo)){
                            $img = new Imaging();
                            $img->set_img($archivo);
                            $img->set_quality(80);
                            //---
                            $img->set_size(600);
                            $img->save_img($imagenWeb);
                            //---
                            $img->clear_cache();
    
                            $guardadoWeb = true;
                            //$respuesta['guardadoWeb 1'] = $guardadoWeb;
                        }else{
                            $guardadoWeb = false;
                            $respuesta['error'] = 'No se a podido generar la imagen web';
                        }
                        //$respuesta['dir'] = 'existe';
                    }else{
                        mkdir($dirImgWeb ,0777,true);
                        if(file_exists($archivo)){
                            $img = new Imaging();
                            $img->set_img($archivo);
                            $img->set_quality(80);
                            //---
                            $img->set_size(600);
                            $img->save_img($imagenWeb);
                            //---
                            $img->clear_cache();
    
                            $guardadoWeb = true;
                            //$respuesta['guardadoWeb 2'] = $guardadoWeb;
                        }else{
                            $guardadoWeb = false;
                            $respuesta['error'] = 'No se a podido generar la imagen web';
                        }
                        // $respuesta['dir'] = 'creado';
                        // $respuesta['g-e'] = $guardado.' -- '.$existe;
                    }
    
    
                }else{
                    $respuesta['error'] = 'La imagen ya existe 2';
                }
//----
                if($guardadoWeb)
                { //#fallo
                    $lugar = new GuardaDireccion();
                    $nuevoLugar = $lugar->guardaLugar($lugar,$direccion,$coordenadas,$categoria,$descripcion,$imagenWeb);
                    echo json_encode($nuevoLugar);

                    // $respuesta['datos'] = $lugar.' | '.$direccion.' | '.$coordenadas.' | '.$categoria.' | '.$descripcion.' | '.$imagenWeb;
                    // echo json_encode($respuesta);
                }else{
                    $respuesta['error'] = 'Error, no se puede guardar el lugar';
                }
                // $respuesta['guardado-web'] = $guardadoWeb;
                // $respuesta['imgWeb'] = $imagenWeb;
            }else{ //#fallo
                $lugar = new GuardaDireccion();
                $nuevoLugar = $lugar->guardaLugar($lugar,$direccion,$coordenadas,$categoria,$descripcion,$nombre_imagen_default);
                echo json_encode($nuevoLugar);

                // $respuesta['datos'] = $lugar.' | '.$direccion.' | '.$coordenadas.' | '.$categoria.' | '.$descripcion.' | '.$nombre_imagen_default;
                // echo json_encode($respuesta);
            }
        }else{
            echo json_encode($respuesta);
        }
        
    }else{
        $respuesta['error'] = 'No hay nada en post';
        echo json_encode($respuesta);
    }
?>