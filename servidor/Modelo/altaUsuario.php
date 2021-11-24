<?php
    class AltaUsuarios
    {
        private $bd = null;
        
        public function __construct()
        {
            include_once('./../Modelo/variablesEntorno.php');
            include_once('./../Modelo/ConectaBD.php');
            $this->db = ConectaBD::getInstance();
            $this->db = $this->db->conecta($host,$usuario,$clave,$base);
        }

        public function altaUsuario($login,$nombre,$apellidos,$correo,$clave,$fecha,$tipo)
        {
            include_once('./../Modelo/password.php');
            $sql = '';
            $consulta = '';
            $datos = [];
            try
            {
                $sql = 'SELECT nombre, apellidos FROM usuarios WHERE id_user = :log';
                $consulta = $this->db->prepare($sql);
                $consulta->bindParam(':log',$login,PDO::PARAM_STR);
                $consulta->execute();

                if($consulta->rowCount() > 0)
                {
                    $datos['mensaje'] = 'El nombre de usuario ya existe, utilice otro nombre';
                    $datos['conectado'] = false;
                    return $datos;
                }else{
                    $sql = 'SELECT id_user FROM usuarios WHERE correo = :correo';
                    $consulta = $this->db->prepare($sql);
                    $consulta->bindParam(':correo',$correo,PDO::PARAM_STR);
                    $consulta->execute();

                    if($consulta->rowCount() > 0){
                        $datos['mensaje'] = 'Ya existe un usuario registrado con este correo';
                        $datos['conectado'] = false;
                        return $datos;
                    }else{
                        $sql = 'INSERT INTO usuarios(id_user,nombre,apellidos,correo,clave,fecha_registro,tipo_id)';
                        $sql .= ' VALUES(:user,:nombre,:apellidos,:correo,:clave,:fecha,:tipo)';

                        $pwd = Password::hash($clave);

                        $consulta = $this->db->prepare($sql);
                        $consulta->bindParam(':user',$login,PDO::PARAM_STR);
                        $consulta->bindParam(':nombre',$nombre,PDO::PARAM_STR);
                        $consulta->bindParam(':apellidos',$apellidos,PDO::PARAM_STR);
                        $consulta->bindParam(':correo',$correo,PDO::PARAM_STR);
                        $consulta->bindParam(':clave',$pwd,PDO::PARAM_STR);
                        $consulta->bindParam(':fecha',$fecha,PDO::PARAM_STR);
                        $consulta->bindParam(':tipo',$tipo,PDO::PARAM_INT);
                        $consulta->execute();

                        if($consulta->rowCount() > 0)
                        {   
                            $datos['mensaje'] = 'se a dado de alta correctamente al usuario';
                            $datos['conectado'] = true;
                            return $datos;
                        }
                    }                
                }
            }catch(PDOException $e){   
                die( 'Error en la conexion con la base de datos!! '.$e->getMessage().' '. $e->getLine());   
            }
        }
    }