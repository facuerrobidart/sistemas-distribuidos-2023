import { obtenerDatos, guardarDatos } from '../persistencia/persistencia.js';
import { validarVacio } from '../utils/stringUtils.js';

const pathArchivo = './visitors.json';

const obtenerVisitantes = () => {
    return obtenerDatos(pathArchivo);
};

const obtenerVisitante = (id) => {
    const visitantes = obtenerVisitantes();
    const visitanteObtenido =visitantes.find(a => a.id === id);

    return visitanteObtenido !== undefined ? visitanteObtenido : console.log(`No existe un visitante con id ${id}`);;
}

const validarVisitantes= (visitante) =>{
    if (visitante.pisos_permitidos.length === 0) {
        return 'El visitante debe tener al menos un piso permitido';
    }
    if (validarVacio(visitante.nombre)) {
        return 'El visitante debe tener un nombre';
    }
    if (validarVacio(visitante.email)) {
        return 'El visitante debe tener un email asignado';
    }
    if(validarVacio(visitante.fecha_checkIn)){
         return 'El visitante debe tener una fecha de check In asignada';
    }
    if(validarVacio(visitante.fecha_checkOut)){
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

    if(mensajeValidacion!='ok'){
        return mensajeValidacion;
    }

    const visitantes = obtenerVisitantes();
    visitantes.push(visitante);
    guardarDatos(pathArchivo, visitantes);
}

const actualizarVisitante = (id, visitante) => {
    const visitantes = obtenerVisitantes();
    const index = visitantes.findIndex(a => a.id === id);
    const mensajeValidacion = validarVisitantes(visitante)
    if (index === -1) {
        console.log(`No existe un visitante con id ${id}`);
        return;
    }
    if(mensajeValidacion!='ok'){
        return mensajeValidacion;

    }

    visitantes[index] = visitante;
    guardarDatos(pathArchivo, visitantes);
}

const eliminarVisitante = (id) => {
    const visitantes = obtenerVisitantes();
    const index = visitantes.findIndex(a => a.id === id);

    if (index === -1) {
        console.log(`No existe un visitante con id ${id}`);
        return;
    }

    visitantes.splice(index, 1);
    guardarDatos(pathArchivo, visitantes);
}

export default {
    obtenerVisitantes,
    obtenerVisitante,
    crearVisitante,
    actualizarVisitante,
    eliminarVisitante
};