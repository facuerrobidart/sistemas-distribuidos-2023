const validarVacio = (valor) => {
    return valor === undefined || valor === null || valor === '';
}

const parsearBody = (body) => {
    return JSON.parse(body);
}

export default {
    validarVacio,
    parsearBody
};