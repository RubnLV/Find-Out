<?php
    class GuardaDireccion
    {
        private $db;

        public function __construct()
        {
            include_once('./../Modelo/variablesEntorno.php');
            include_once('./../Modelo/ConectaBD.php');
            $this->db = ConectaBD::getInstance();
            $this->db = $this->db->conecta($host,$usuario,$clave,$base);
        }

        public function guardaLugar($lugar, $direccion, $coordenadas, $categoria, $descripcion, $urlImg)
        {
            $sql = '';
            $consulta = '';
            $datos = [];
            try
            {
                $sql = 'SELECT id_lugar FROM lugares WHERE direccion=:direc AND categoria_id=:categoria';
                $consulta= $this->db->prepare($sql);
                $consulta->bindParam(':direc',$direccion,PDO::PARAM_STR);
                $consulta->bindParam(':categoria',$categoria,PDO::PARAM_INT);
                $consulta->execute();

                if($consulta->rowCount() > 0){
                    $datos['mensaje'] = 'Ya existe un lugar con esa dirección y categoria';
                    $datos['conectado'] = false;
                    return $datos;
                }else{   
                    $sql = 'INSERT INTO lugares(nombre, direccion, coordenadas, categoria_id, descripcion) ';
                    $sql .= ' VALUES(:lugar,:direccion,:coords,:categoria,:descripcion)';

                    $consulta= $this->db->prepare($sql);
                    $consulta->bindParam(':lugar',$lugar,PDO::PARAM_STR);
                    $consulta->bindParam(':direccion',$direccion,PDO::PARAM_STR);
                    $consulta->bindParam(':coords',$coordenadas,PDO::PARAM_STR);
                    $consulta->bindParam(':categoria',$categoria,PDO::PARAM_INT);
                    $consulta->bindParam(':descripcion',$descripcion,PDO::PARAM_STR);
                    $consulta->execute();

                    if($consulta->rowCount() > 0)
                    {
                        $sql = 'SELECT id_lugar FROM lugares WHERE direccion=:direc AND categoria_id=:categoria';
                        $consulta= $this->db->prepare($sql);
                        $consulta->bindParam(':direc',$direccion,PDO::PARAM_STR);
                        $consulta->bindParam(':categoria',$categoria,PDO::PARAM_INT);
                        $consulta->execute();
                        
                        $lugar_id = $consulta->fetchColumn();

                        $sql = 'INSERT INTO imagenes(id_lugar, urlImagen, categoria_id) ';
                        $sql .= 'VALUES(:lugar_id, :urlImg, :categoria)';

                        $consulta= $this->db->prepare($sql);
                        $consulta->bindParam(':lugar_id',$lugar_id,PDO::PARAM_INT);
                        $consulta->bindParam(':urlImg',$urlImg,PDO::PARAM_STR);
                        $consulta->bindParam(':categoria',$categoria,PDO::PARAM_INT);
                        $consulta->execute();

                        if($consulta->rowCount() > 0)
                        {
                            $datos['mensaje'] = 'Se a guardado correctamente el lugar ';
                            $datos['conectado'] = true;
                            return $datos;
                        }
                    }else{
                        $datos['mensaje'] = 'No se a podido guardar el lugar';
                        $datos['conectado'] = false;
                        return $datos;
                    }
                }
            } catch (PDOException $e) {
                die( 'Error en la conexion con la base de datos!! '.$e->getMessage().' '. $e->getLine());
            }
        }
    }

    // $lugar = 'retiro';
    // $direccion = 'retiro 12';
    // $coordenadas = '';
    // $categoria = 4;
    // $descripcion = 'retiro 12retiro 12retiro 12retiro 12retiro 12retiro 12';
    // $url = './../assets/imagenes/mapa_default.jpg';

    // $lug = new GuardaDireccion();
    // $nuevo = $lug->guardaLugar($lugar,$direccion,$coordenadas,$categoria,$descripcion,$url);

    // echo json_encode($nuevo);


?>