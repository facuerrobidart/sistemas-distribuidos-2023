import persistencia from '../persistencia/persistencia.js';
import { resolve } from 'path';
const scriptURL = import.meta.url;
const url = new URL(scriptURL);
let pathModulo = url.pathname.replace(/^\/[A-Za-z]:/, '');

let pathArchivo = resolve(pathModulo, '../../persistencia/guests.json');
pathArchivo = decodeURI(pathArchivo); //Problema con %20. No lo reconocia como espacio en blanco


const obtenerGuests = () => {
    return persistencia.obtenerDatos(pathArchivo);
}

const obtenerPermisos = (id) => {
    const visitanes = obtenerGuests();
    const guestObtenido = visitanes.find(a => a.id === id);

    //return guestObtenido !== undefined ? guestObtenido.pisos_permitidos : `No existe un visitante con id ${id}`;
    return guestObtenido !== undefined ? 
        {
            pisos_permitidos: guestObtenido.pisos_permitidos
        } 
        : `NoExisteID`;
}

const quitarPermiso = (id, piso) => {
    const visitanes = obtenerGuests();
    const guestObtenido = visitanes.find(a => a.id === id);

    if (guestObtenido !== undefined){
        const pisos = guestObtenido.pisos_permitidos;
        const indicePiso = pisos.indexOf(parseInt(piso));
        if (indicePiso !== -1 )
         pisos.splice(indicePiso,1);
        else
         return `El visitante con el id ${id}, ya no podia ingresar al piso ${piso}`;
    }
    else{
        return `No existe un visitante con id ${id}`;
    }

    persistencia.guardarDatos(pathArchivo,visitanes);
    return 'ok';
}

const quitarTodosLosPermisos = (id) => {
    const visitanes = obtenerGuests();
    const guestObtenido = visitanes.find(a => a.id === id);

    if (guestObtenido !== undefined){
        guestObtenido.pisos_permitidos = [];
    }
    else{
        return `No existe un visitante con id ${id}`;
    }

    persistencia.guardarDatos(pathArchivo,visitanes);
    return 'ok';
}

const agregarPermisos = (id, pisos) => {
    const visitantes = obtenerGuests();
    const guestObtenido = visitantes.find(a => a.id === id);
    const objIndex = visitantes.findIndex(a => a.id === id);

    if (guestObtenido !== undefined){
        visitantes[objIndex].pisos_permitidos = Array.from([pisos]);
    }
    else{
        return `No existe un visitante con id ${id}` ;
    }

    persistencia.guardarDatos(pathArchivo, visitantes);
    return 'ok';
}

export default {
    obtenerPermisos,
    quitarPermiso,
    quitarTodosLosPermisos,
    agregarPermisos
};