<?php
    class InfoLugar
    {
        private $db;

        public function __construct()
        {
            include_once('./../Modelo/variablesEntorno.php');
            include_once('./../Modelo/ConectaBD.php');
            $this->db = ConectaBD::getInstance();
            $this->db = $this->db->conecta($host,$usuario,$clave,$base);
        }

        public function getInfo($id)
        {
            $sql = '';
            $consulta = '';
            $datos = [];
            try
            {                
                $sql = 'SELECT lugares.nombre, lugares.direccion, lugares.coordenadas, lugares.descripcion, categorias.categoria, imagenes.urlImagen';
                $sql .= ' FROM lugares';
                $sql .= ' left outer join categorias on lugares.categoria_id = categorias.categoria_id';
                $sql .= ' left outer join imagenes on lugares.id_lugar = imagenes.id_lugar';
                $sql .= ' WHERE lugares.id_lugar = :ID';
                $consulta = $this->db->prepare($sql);
                $consulta->bindParam(':ID',$id,PDO::PARAM_INT);
                $consulta->execute();

                while($fila=$consulta->fetch(PDO::FETCH_ASSOC)){
                    $datos[] = $fila;
                }
                return($datos);
            } catch (PDOException $e) {
                die( 'Error en la conexion con la base de datos!! '.$e->getMessage().' '. $e->getLine());
            }
        }
    }
?>