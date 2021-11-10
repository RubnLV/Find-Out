//inicio valida datos
export function validaDatosRegistro(props) {
    //debugger
    const { nombre, apellidos, nombreUsuario, correo, clave } = props;
    const exRegNom_Ape = /^[a-zA-Z]+$/;
    const exRegUsu = /^[a-zA-Z]+[0-9]*$/;
    const exRegCorreo = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
    const exRegPwd = /^[a-zA-z0-9]+$/;

    var mensaje = {};

    //nombre
    if(nombre === null){
        mensaje['valido'] = false;
        mensaje['mensaje'] = "El nombre no puede estar vacio";
        return mensaje;
    }else{
        if (exRegNom_Ape.test(nombre) === false) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "El nombre solo debe contener mayusculas y minusculas";
            return mensaje;
        } else if (nombre.length > 30) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "El nombre debe contener maximo 30 caracteres";
            return mensaje;
        }
    }
    //apellidos
    if(apellidos === null){
        mensaje['valido'] = false;
        mensaje['mensaje'] = "El apellido/s no puede estar vacio";
        return mensaje;
    }else{
        if (exRegNom_Ape.test(apellidos) === false) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "El apellido/s solo debe contener mayusculas y minusculas";
            return mensaje;
        } else if (apellidos.length > 60) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "El apellido/s debe contener maximo 30 caracteres";
            return mensaje;
        }
    }
    //id_usuario
    if (nombreUsuario === null) {
        mensaje['valido'] = false;
        mensaje['mensaje'] = "El nombre de suario no puede estar vacio";
        return mensaje;
    } else {
        if (exRegUsu.test(nombreUsuario) === false) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "El nombre de usuario solo debe contener mayusculas, minusculas, numeros y guion bajo";
            return mensaje;
        } else if (nombreUsuario.length > 30) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "El nombre de usuario debe contener maximo 30 caracteres";
            return mensaje;
        }
    }
    //correo
    if (correo === null) {
        mensaje['valido'] = false;
        mensaje['mensaje'] = "El correo no puede estar vacio";
        return mensaje;
    } else {
        if (exRegCorreo.test(correo) === false) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "El formato del correo no es valido";
            return mensaje;
        } else if (correo.length > 120) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "El nombre de usuario debe contener maximo 120 caracteres";
            return mensaje;
        }
    }
    //clave
    if (clave === null) {
        mensaje['valido'] = false;
        mensaje['mensaje'] = "La contraseña no puede estar vacia";
        return mensaje;
    } else {
        if (exRegPwd.test(clave) === false) {
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