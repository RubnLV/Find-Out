const token = 'key';

export function setToken(obj){
    localStorage.setItem(token,JSON.stringify(obj));
}

export function getToken(){
    return JSON.parse(localStorage.getItem(token));   
}

export function validaToken(obj){
    //debugger
    if(obj != null){
    const {tkn, time} = obj;

        if(tkn != null && time != null){
            const duracion = ((30 * 60)*1000);
            console.log('duracion '+duracion);
            const tActual = new Date();
            console.log('time-act = '+tActual);
            const resto = tActual.getTime() - Date.parse(time);
            console.log('resto '+(resto));
            if( resto >= 0 && resto <= duracion){
                return true;
            }
        }
    }
    return false;
}

export function borraToken(){
    localStorage.removeItem(token);
}

export async function enviaDatos (url, opciones) {  
    //creamos una funcion asincrona
    const res = await fetch(url, opciones); // guardamos el resultado que nos devuelve fetch
    const json = await res.json(); // el resultado lo convertimos a un json
    //console.log(json);
    return json;
}

export async function enviaLugar (url, opciones) {  
    //creamos una funcion asincrona
    const res = await fetch(url, opciones); // guardamos el resultado que nos devuelve fetch
    const data = await res.text(); // el resultado lo convertimos a un json
    //console.log(json);
    return data;
}