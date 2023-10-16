import persistencia from '../persistencia/persistencia.js';
import { randomUUID } from 'crypto';
import stringUtils from '../utils/stringUtils.js';

const pathArchivo = './elevators.json';

const obtenerAscensores = () => {
    return obtenerDatos(pathArchivo);
};

const obtenerAscensor = (id) => {
    const ascensores = obtenerAscensores();
    const ascensorObtenido = ascensores.find(a => a.id === id);

    return ascensorObtenido !== undefined ? ascensorObtenido : console.log(`No existe un ascensor con id ${id}`);;
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
    const index = ascensores.findIndex(a => a.id === id);

    if (index === -1) {
        console.log(`No existe un ascensor con id ${id}`);
        return;
    }

    const mensajeValidacion = validarAscensor(ascensor);

    if( mensajeValidacion !== 'ok' ) {
        return mensajeValidacion; 
    }

    ascensores[index] = ascensor;
    persistencia.guardarDatos(pathArchivo, ascensores);
}

const eliminarAscensor = (id) => {
    const ascensores = obtenerAscensores();
    const index = ascensores.findIndex(a => a.id === id);

    if (index === -1) {
        console.log(`No existe un ascensor con id ${id}`);
        return;
    }

    ascensores.splice(index, 1);
    persistencia.guardarDatos(pathArchivo, ascensores);
}

export default {
    obtenerAscensores,
    obtenerAscensor,
    crearAscensor,
    actualizarAscensor,
    eliminarAscensor
};