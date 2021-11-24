export function validaDatosLugar(props) {
    //debugger
    const { lugar, direccion, coordenadas, descripcion, categoria_id, imagen } = props;
    //const exReg = /^[a-zA-Z]+[0-9]*$/;
    const exRegText = /^[a-zA-Z0-9]+(\s[a-zA-Z0-9]*)*$/;
    const exRegImg = /\.(jpg|png)$/i;
    const exRegCoords = /^[-]?\d+[\.]?\d*, {0,1}[-]?\d+[\.]?\d*$/;
    const tamanio = 3 * 1048576; //tamaño maximo en Mb
    var mensaje = {};

    //lugar
    if (lugar == null) {
        mensaje['valido'] = false;
        mensaje['mensaje'] = "El Lugar no puede estar vacio";
        return mensaje;
    } else {
        if (exRegText.test(lugar) == false) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "Lugar solo debe contener mayusculas, minusculas y numeros";
            return mensaje;
        } else if (lugar.length > 50) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "Lugar debe contener maximo 50 caracteres";
            return mensaje;
        }
    }
    //direccion
    if (direccion == null) {
        mensaje['valido'] = false;
        mensaje['mensaje'] = "La dirección no puede estar vacia";
        return mensaje;
    } else {
        if (exRegText.test(direccion) == false) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "La dirección solo debe contener mayusculas, minusculas y numeros";
            return mensaje;
        } else if (direccion.length > 150) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "La dirección debe contener maximo 150 caracteres";
            return mensaje;
        }
    }
    //coordenadas
    if(coordenadas != null && coordenadas != undefined && coordenadas.length != 0){
        if (exRegCoords.test(coordenadas) == false) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "Las coordenadas deben tener el siguite formato Ejem: 40.749825, -73.090443";
            return mensaje;
        } else if (coordenadas.length > 300) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "Las coordenadas deben contener maximo 300 caracteres";
            return mensaje;
        }
    }
    //descripcion
    if (descripcion == null) {
        mensaje['valido'] = false;
        mensaje['mensaje'] = "La descripción no puede estar vacia";
        return mensaje;
    } else {
        if (exRegText.test(descripcion) == false) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "La descripción solo puede contener mayusculas, minusculas y numeros";
            return mensaje;
        } else if (descripcion.length > 500) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "La descripción debe contener maximo 500 caracteres";
            return mensaje;
        }
    }
    //categoria
    if (categoria_id == null) {
        mensaje['valido'] = false;
        mensaje['mensaje'] = "Debe elegir una categoría";
        return mensaje;
    } else {
        if (categoria_id <= 0 || categoria_id >= 5) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "La categoría no es correcta";
            return mensaje;
        }
    }
    //imagen
    // if (imagen == null || imagen == 'undefined') {
    //     mensaje['valido'] = false;
    //     mensaje['mensaje'] = "No se ha recibido ninguna imagen";
    //     return mensaje;
    // }else{
    //     if (exRegImg.test(imagen.name) == false) {
    //         mensaje['valido'] = false;
    //         mensaje['mensaje'] = "El archivo adjunto no es una imagen, solo se aceptan archivos .png o .jpg";
    //         return mensaje;
    //     }else{
    //         if(imagen.size > tamanio){
    //             mensaje['valido'] = false;
    //             mensaje['mensaje'] = "La imagen no puede ser mayor a 10Mb";
    //             return mensaje;
    //         }
    //     }
    // }
    if (imagen != null && imagen != undefined) {
        if (exRegImg.test(imagen.name) == false) {
            mensaje['valido'] = false;
            mensaje['mensaje'] = "El archivo adjunto no es una imagen, solo se aceptan archivos .png o .jpg";
            return mensaje;
        }else{
            if(imagen.size > tamanio){
                mensaje['valido'] = false;
                mensaje['mensaje'] = "La imagen no puede ser mayor a 10Mb";
                return mensaje;
            }
        }
    }
    mensaje['valido'] = true;
    mensaje['mensaje'] = null;
    return mensaje;
}