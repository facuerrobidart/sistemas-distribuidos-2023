import fs from 'fs';

const obtenerDatos = (pathArchivo) => {
    const contenidoString = fs.readFileSync(pathArchivo, 'utf-8');
    return JSON.parse(contenidoString);
};

const guardarDatos = (pathArchivo, contenido) => {
    const contenidoString = JSON.stringify(contenido);
    fs.writeFileSync(pathArchivo, contenidoString, 'utf-8');
}

module.exports = {
    obtenerDatos,
    guardarDatos
};