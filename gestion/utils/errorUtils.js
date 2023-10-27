const generarRespuestaError = (mensaje, error) => {
    console.log(error);
    
    return {
        mensaje: mensaje,
        error: error
    }
}

export default {
    generarRespuestaError,
};