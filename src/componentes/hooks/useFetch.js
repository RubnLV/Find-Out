import { useState, useEffect } from "react"; 

export default function useFetch(url, opciones) { // la funcion resive la url a donde hay que hacer el fetch y las opciones
    const [loading, setLoading] = useState(true); // para saber si esta haciendo la peticion o ya acabado
    const [result, setResult] = useState(null); // para guardar el resultado
    const [error, setError] = useState(null); // para guardar el error que nos devuelva

    useEffect( () => {
        //creamos una funcion asincrona
        (async () => { 
            try{
                const res = await fetch(url, opciones); // guardamos el resultado que nos devuelve fetch
                const json = await res.json(); // el resultado lo convertimos a un json
                setResult(json); // guardamos el json en el result  
                setLoading(false); // decimos que acaba de cargar los datos
            
            }catch (err){
              setError(err); // guardamos el error 
              setLoading(false) ;
            }
        })();
    }, [opciones, url]
    );

    return{loading, result, error};
}

//--->hook personalizado para hacer peticiones http para hacer fetch a TMDB (un servidor o vase de datos)
/* 
async/awaitcayuda a escribir código asincrónico de una manera que parece sincrónica. Además, puede usar try / catch para el manejo adecuado de errores.
Se utiliza principalmente para la obtención de datos y otras cosas de inicialización.
*/