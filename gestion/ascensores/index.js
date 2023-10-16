import { obtenerDatos, guardarDatos } from '../persistencia/persistencia.js';
import { randomUUID } from 'crypto';
import { validarVacio } from '../utils/stringUtils.js';

const pathArchivo = './elevators.json';

const obtenerAscensores = () => {
    return obtenerDatos(pathArchivo);
};

const obtenerAscensor = (id) => {
    const ascensores = obtenerAscensores();
    const ascensorObtenido = ascensores.find(a => a.id === id);

    return ascensorObtenido !== undefined ? ascensorObtenido : console.log(`No existe un ascensor con id ${id}`);;
}

const validarDatos = (pisos, nombre, estado) => {
    
    if (pisos === 0) {
        console.log('El ascensor debe tener al menos un piso');
        return false;
    }
    if (validarVacio(nombre)) {
        console.log('El ascensor debe tener un nombre');
        return false;
    }
    if (validarVacio(estado)) {
        console.log('Los pisos deben tener un nombre');
        return false;
    }

    return true;

}

const crearAscensor = (ascensor) => {
    ascensor.id = randomUUID();

    if( !validarDatos(ascensor.pisos.length, ascensor.nombre, ascensor.estado) ){
        return 0;
    }

    const ascensores = obtenerAscensores();
    ascensores.push(ascensor);
    guardarDatos(pathArchivo, ascensores);
}

const actualizarAscensor = (id, ascensor) => {
    const ascensores = obtenerAscensores();
    const index = ascensores.findIndex(a => a.id === id);

    if (index === -1) {
        console.log(`No existe un ascensor con id ${id}`);
        return;
    }

    if( !validarDatos(ascensor.pisos.length, ascensor.nombre, ascensor.estado) ){
        return 0;
    }

    ascensores[index] = ascensor;
    guardarDatos(pathArchivo, ascensores);
}

const eliminarAscensor = (id) => {
    const ascensores = obtenerAscensores();
    const index = ascensores.findIndex(a => a.id === id);

    if (index === -1) {
        console.log(`No existe un ascensor con id ${id}`);
        return;
    }

    ascensores.splice(index, 1);
    guardarDatos(pathArchivo, ascensores);
}