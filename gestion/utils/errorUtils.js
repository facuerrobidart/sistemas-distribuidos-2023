const generarRespuestaError = (mensaje, error) => {
    console.log(error);
    
    return JSON.stringify({
        status: 'error',
        mensaje: mensaje,
        error: error
    });
}

const generarRespuestaOk = (mensaje) => {
    return JSON.stringify({
        status: 'ok',
        mensaje: mensaje,
    });
}

export default {
    generarRespuestaError,
    generarRespuestaOk,
};