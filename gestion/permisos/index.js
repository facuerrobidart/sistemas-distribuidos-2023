import persistencia from '../persistencia/persistencia.js';
import { resolve } from 'path';
const scriptURL = import.meta.url;
const url = new URL(scriptURL);
let pathModulo = url.pathname.replace(/^\/[A-Za-z]:/, '');

const pathArchivo = resolve(pathModulo, '../../persistencia/guests.json');
console.log(pathArchivo);

const obtenerGuests = () => {
    return persistencia.obtenerDatos(pathArchivo);
}

const obtenerPermisos = (id) => {
    const visitanes = obtenerGuests();
    const guestObtenido = visitanes.find(a => a.id === id);

    return guestObtenido !== undefined ? guestObtenido.pisos_permitidos : `No existe un visitante con id ${id}`;
}

const quitarPermiso = (id,piso) => {
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

const agregarPermisos = (id,piso) => {
    const visitanes = obtenerGuests();
    const guestObtenido = visitanes.find(a => a.id === id);

    if (guestObtenido !== undefined){
        var pisos = guestObtenido.pisos_permitidos;
        const indicePiso = pisos.indexOf(parseInt(piso));
        if (indicePiso === -1)
          pisos.push(parseInt(piso));
        else{
            return `El visitante con el id ${id}, ya tenia permiso para ingresar al piso ${piso}`;
            }
    }
    else{
        return `No existe un visitante con id ${id}` ;
    }

    persistencia.guardarDatos(pathArchivo,visitanes);
    return 'ok';
}

export default {
    obtenerPermisos,
    quitarPermiso,
    quitarTodosLosPermisos,
    agregarPermisos
};