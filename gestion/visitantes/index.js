import persistencia from '../persistencia/persistencia.js';
import stringUtils from '../utils/stringUtils.js';
import path from 'path';
const scriptURL = import.meta.url;
const url = new URL(scriptURL);
let pathModulo = url.pathname.replace(/^\/[A-Za-z]:/, '');

const pathArchivo = path.resolve(pathModulo, '../../persistencia/guests.json');

const obtenerVisitantes = () => {
    return persistencia.obtenerDatos(pathArchivo);
};

const obtenerVisitante = (id) => {
    const visitantes = obtenerVisitantes();
    const visitanteObtenido =visitantes.find(a => a.id === id);

    return visitanteObtenido !== undefined ? visitanteObtenido : `No existe un visitante con id ${id}`;
}

const validarVisitantes= (visitante) =>{
    const pisos_permitidos=visitante.pisos_permitidos.length;
    const nombre=visitante.nombre;
    const email=visitante.email
    const checkIn=visitante.fecha_checkIn
    const checkOut=visitante.fecha_checkOut

    if (pisos_permitidos === 0) {
        return 'El visitante debe tener al menos un piso permitido';
    }
    if (stringUtils.validarVacio(nombre)) {
        return 'El visitante debe tener un nombre';
    }
    if (validarVacio(email)) {
        return 'El visitante debe tener un email asignado';
    }
    if(validarVacio(checkIn)){
         return 'El visitante debe tener una fecha de check In asignada';
    }
    if(validarVacio(checkOut)){
       return 'El visitante debe tener una fecha de check out asignada';
    }
    
    return 'ok';
}

const crearVisitante = (visitante) => {
    const max = obtenerVisitantes().reduce(function(prev, current) {
        return (prev && prev.id > current.id) ? prev : current
    }) 
    visitante.id = max + 1 ;

    const mensajeValidacion = validarVisitantes(visitante)

    if(mensajeValidacion !== 'ok'){
        return mensajeValidacion;
    }

    const visitantes = obtenerVisitantes();
    visitantes.push(visitante);
    persistencia.guardarDatos(pathArchivo, visitantes);
}

const actualizarVisitante = (id, visitante) => {
    const visitantes = obtenerVisitantes();
    const index = visitantes.findIndex(a => a.id === id);
    
    if (index === -1) {
        console.log(`No existe un visitante con id ${id}`);
        return;
    }

    const mensajeResultado = validarVisitantes(visitante)

    if(mensajeResultado === 'ok'){
        visitantes[index] = visitante;
        try{
            persistencia.guardarDatos(pathArchivo, visitantes);
        }catch(error){
            console.log(error)
            mensajeResultado='Error al actualizar el visitante'
        }
     }

    return mensajeResultado;
}

const eliminarVisitante = (id) => {
    const visitantes = obtenerVisitantes();
    const index = visitantes.findIndex(a => a.id === id);

    if (index === -1) {
        const error= `No existe un visitante con id ${id}`
        console.log(error);
        return error;
    }

    visitantes.splice(index, 1);
    persistencia.guardarDatos(pathArchivo, visitantes);
}

export default {
    obtenerVisitantes,
    obtenerVisitante,
    crearVisitante,
    actualizarVisitante,
    eliminarVisitante
};