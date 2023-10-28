import persistencia from '../persistencia/persistencia.js';
import { randomUUID } from 'crypto';
import stringUtils from '../utils/stringUtils.js';
import { resolve } from 'path';
const scriptURL = import.meta.url;
const url = new URL(scriptURL);
let pathModulo = url.pathname.replace(/^\/[A-Za-z]:/, '');

const pathArchivo = resolve(pathModulo, '../../persistencia/elevators.json');

const obtenerAscensores = () => {
    return persistencia.obtenerDatos(pathArchivo);
};

const obtenerAscensor = (id) => {
    const ascensores = obtenerAscensores();
    const ascensorObtenido = ascensores.find(a => a.id === id);

    return ascensorObtenido !== undefined ? ascensorObtenido : `No existe un ascensor con id ${id}`;
}

const validarAscensor = (ascensor) => {
    
    const pisos = ascensor.pisos.length;
    const nombre = ascensor.nombre;
    const estado = ascensor.estado;

    if (pisos === 0) {
        return 'El ascensor debe tener al menos un piso';
    }
    if (stringUtils.validarVacio(nombre)) {
        return 'El ascensor debe tener un nombre';
    }
    if (stringUtils.validarVacio(estado)) {
        return 'Los pisos deben tener un nombre';
    }

    return 'ok';
}

const crearAscensor = (ascensor) => {
    ascensor.id = randomUUID();

    const mensajeValidacion = validarAscensor(ascensor);

    if( mensajeValidacion !== 'ok' ) {
        return mensajeValidacion ; 
    }

    const ascensores = obtenerAscensores();
    ascensores.push(ascensor);
    persistencia.guardarDatos(pathArchivo, ascensores);
}

const actualizarAscensor = (id, ascensor) => {
    const ascensores = obtenerAscensores();
    const index = ascensores.findIndex(a => a.id === ascensor.id);

    if (index === -1) {
        const error = `No existe un ascensor con id ${id}`
        console.log(error);
        return error;
    }

    const mensajeResultado = validarAscensor(ascensor);

    if (mensajeResultado === 'ok') {
        ascensores[index] = ascensor;
        try {
            persistencia.guardarDatos(pathArchivo, ascensores);
        } catch (error) {
            console.log(error);
            mensajeResultado = 'Error al actualizar el ascensor';
        }
    }

    return mensajeResultado; 
}

const eliminarAscensor = (id) => {
    const ascensores = obtenerAscensores();
    const index = ascensores.findIndex(a => a.id === id);

    if (index === -1) {
        const error = `No existe un ascensor con id ${id}`
        console.log(error);
        return error;
    }

    ascensores.splice(index, 1);
    persistencia.guardarDatos(pathArchivo, ascensores);
    
    return "ok";
}

export default {
    obtenerAscensores,
    obtenerAscensor,
    crearAscensor,
    actualizarAscensor,
    eliminarAscensor
};