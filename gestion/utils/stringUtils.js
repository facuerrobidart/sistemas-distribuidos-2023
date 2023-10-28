const validarVacio = (valor) => {
    return valor === undefined || valor === null || valor === '';
}

const parsearBody = (body) => {
    return JSON.parse(body);
}

const obtenerBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        })

        req.on('end', () => {
            resolve(body);
        })
    })
}

export default {
    validarVacio,
    parsearBody,
    obtenerBody
};