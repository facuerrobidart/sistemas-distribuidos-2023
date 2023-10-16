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

const crearAscensor = (ascensor) => {
    ascensor.id = randomUUID();

    //TODO: Crear metodo que valide los datos del ascensor
    if (ascensor.pisos.length === 0) {
        console.log('El ascensor debe tener al menos un piso');
        return;
    }
    if (validarVacio(ascensor.nombre)) {
        console.log('El ascensor debe tener un nombre');
        return;
    }
    if (validarVacio(ascensor.estado)) {
        console.log('Los pisos deben tener un nombre');
        return;
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

    if (ascensor.pisos.length === 0) {
        console.log('El ascensor debe tener al menos un piso');
        return;
    }
    if (validarVacio(ascensor.nombre)) {
        console.log('El ascensor debe tener un nombre');
        return;
    }
    if (validarVacio(ascensor.estado)) {
        console.log('Los pisos deben tener un nombre');
        return;
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