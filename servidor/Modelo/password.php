<?php
    class Password
    {
        private const SALT = 'Password';
        private $opciones = ['cost'=>10];

        public static function hash($clave)
        {
            return hash('sha256',$clave.self::SALT);
        }
        public static function verify($clave,$hash)
        {
            if(strcmp(self::hash($clave),$hash) === 0)
            {
                return true;
            }
            return false;
        }
    }

    // $pass = Password::hash('Berker01');
    // echo $pass;
    // $date = date('Y-m-d H:i:s');
    // echo '<br/>'.$date;
?>