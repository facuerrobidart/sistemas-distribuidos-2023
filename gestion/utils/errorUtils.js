const generarRespuestaError = (mensaje, error) => {
    console.log(error);
    
    return JSON.stringify({
        status: 'error',
        message: mensaje,
        error: error
    });
}

const generarRespuestaOk = (mensaje) => {
    return JSON.stringify({
        status: 'ok',
        message: mensaje,
    });
}

export default {
    generarRespuestaError,
    generarRespuestaOk,
};