<?php

    class ConectaBD
    {
        private $con = null;
        static private $instance = null;

        private function __construct(){}
        private function __clone(){}

        public static function getInstance()
        {
            if(self::$instance == null)
            {
                self::$instance = new ConectaBD();
            }
            return self::$instance;    
        }
        public function conecta($host,$usuario,$clave,$base)
        {
            try
            {
                $dsn = "mysql:host=$host;dbname=$base;charset=utf8";
                $this->con = new PDO($dsn,$usuario,$clave);
            }catch(PDOExeption $e){
                die('Error en la conexión con la base de datos!!'.$e->getMessage());
            }
            return $this->con;
        }
        public function desconecta()
        {
            $this->con = null;
        }
    }