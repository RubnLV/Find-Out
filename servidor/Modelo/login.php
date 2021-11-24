<?php
    class LoginUsuario
    {
        private $db;
        
        public function __construct()
        {
            include_once('./../Modelo/variablesEntorno.php');
            include_once('./../Modelo/ConectaBD.php');
            $this->db = ConectaBD::getInstance();
            $this->db = $this->db->conecta($host,$usuario,$clave,$base);
        }
       
        public function validaClave($login,$clave)
        {
            include_once('./../Modelo/password.php');
            $sql = '';
            $consulta = '';
            $datos = [];
            $t = null;
            $token = null;

            try
            {
                $sql = 'SELECT clave FROM usuarios WHERE id_user=:log';
                $consulta = $this->db->prepare($sql);
                $consulta->bindParam(':log',$login,PDO::PARAM_STR);
                $consulta->execute();

                if($consulta->rowCount() > 0)
                {
                    $fila = $consulta->fetch(PDO::FETCH_ASSOC);
                    $pass = $fila['clave'];

                    //utilizamos el metodo verify verify para comparar las claves
                    $valida_pswd = Password::verify($clave,$pass);
                    if($valida_pswd)
                    {
                        $datos['mensaje'] = 'login correcto';
                        $datos['conectado'] = true;
                        //$datos['id'] = $login;

                        $t = openssl_random_pseudo_bytes(16);
                        $token = bin2hex($t);

                        $datos['token'] = $token;
                    }else{
                        $datos['mensaje'] = 'login denegado, clave incorrecta';
                        $datos['conectado'] = false;
                    }
                    return $datos;
                }else{
                    $datos['mensaje'] = 'El usuario no es valido o no existe';
                    $datos['conectado'] = false;
                    return $datos;
                } 

            }catch (PDOExeption $e) {
                die('Error al realizar la consulta!! '.$e->getMessage());
            }
        }
    }
?>