<?php
    class CargaDirecciones
    {
        private $bd = null;
        
        public function __construct()
        {
            include_once('./../Modelo/variablesEntorno.php');
            include_once('./../Modelo/ConectaBD.php');
            $this->db = ConectaBD::getInstance();
            $this->db = $this->db->conecta($host,$usuario,$clave,$base);
        }

        public function getDirecciones(){
            $sql = '';
            $consulta = '';
            $datos = [];

            try
            {
                $sql = 'SELECT lugares.id_lugar, lugares.nombre, lugares.direccion, lugares.descripcion, categorias.categoria';
                $sql .= ' FROM lugares';
                $sql .= 'outer join left categorias on lugares.categoria_id = categorias.categoria_id';
                $consulta = $this->db->prepare($sql);
                $consulta->bindParam(':log',$login,PDO::PARAM_STR);
                $consulta->execute();

                if($consulta->rowCount() > 0)
                {
                    $datos['mensaje'] = 'El nombre de usuario ya existe, utilice otro nombre';
                    $datos['datos'] = true;
                    return $datos;
                }else{
                    $datos['mensaje'] = 'Aun no se han registrado lugares';
                    $datos['datos'] = false;
                    return $datos;
                }

            }catch(PDOException $e){   
                die( 'Error en la conexion con la base de datos!! '.$e->getMessage().' '. $e->getLine());
                
            }
        }
    }
?>