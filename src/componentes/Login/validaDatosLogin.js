//inicio valida datos
export function validaDatosLogin(props) {
    const { usuario, clave } = props;
    const exRegUsu = /^[a-zA-z]+[0-9]*$/;
    const exRegPwd = /^[a-zA-z0-9]+$/;

    var mensaje = {};

    //nombre
    if (usuario == null) {
        //alert('usuario vacio');
        mensaje['valido'] = false;
        mensaje['mensaje'] = "El usuario no puede estar vacio";
        return mensaje;
    } else {
        if (exRegUsu.test(usuario) == false) {
            //alert('El nombre del usuario no es valido, debe ser alfanumerico');
            mensaje['valido'] = false;
            mensaje['mensaje'] = "El usuario solo debe contener mayusculas, minusculas, numeros y guion bajo";
            return mensaje;
        } else if (usuario.length > 20) {
            //alert('el usuario no puede ser mayor a 20 caracteres')
            mensaje['valido'] = false;
            mensaje['mensaje'] = "El usuario debe contener maximo 20 caracteres";
            return mensaje;
        }
    }
    //clave
    if (clave == null) {
        mensaje['valido'] = false;
        mensaje['mensaje'] = "La contraseña no puede estar vacia";
        return mensaje;
    } else {
        if (exRegPwd.test(clave) == false) {
            //alert('la contraseña, debe ser alfanumerica');
            mensaje['valido'] = false;
            mensaje['mensaje'] = "La clave contiene caracteres no validos";
            return mensaje;
        } else {
            if (clave.length < 8) {
                //alert('La clave debe contener mas de 8 caracteres');
                mensaje['valido'] = false;
                mensaje['mensaje'] = "La clave debe contener mas de 8 caracteres";
                return mensaje;
            } else if (clave.length > 15) {
                //alert('La clave debe contener menos de 15 caracteres')
                mensaje['valido'] = false;
                mensaje['mensaje'] = "La clave debe contener menos de 15 caracteres";
                return mensaje;
            }
        }
    }
    // console.log('Errores validacion :');
    // console.log(errors);
    mensaje['valido'] = true;
    mensaje['mensaje'] = null;
    return mensaje;
}
//fin valida datos