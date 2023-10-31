import http from 'http';
import url from 'url';
import servicioPermisos from './index.js';
import stringUtils from '../utils/stringUtils.js';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const urlParseada = url.parse(req.url, true);
    const query = urlParseada.query;
    let resultado;

    if (req.method === 'GET' && req.url.includes('/permisos')) {
        if (query.idVisitante !== undefined) {
            try{
                resultado = servicioPermisos.obtenerPermisos(query.idVisitante);
            }
            catch(error){
                resultado = errorUtils.generarRespuestaError(
                    "Ocurrio un error al obtener los permisos",
                    error
                )
                res.statusCode = 500;
            }

            if (resultado === 'NoExisteID') {
                return res.end('No existe un visitante con ID = '+query.idVisitante)
            } else {
                return res.end(JSON.stringify(resultado));
            }
        } else {
            res.statusCode = 400;
            return res.end('Parametros incorrectos para el recurso requerido');
        }
    } else if (req.method === 'PUT' && req.url.includes('/permisos')) {
        try{
            resultado = servicioPermisos.agregarPermisos(query.idVisitante,stringUtils.parsearBody(req.body));
        }
        catch(error){
            resultado = errorUtils.generarRespuestaError(
                "Ocurrio un error al agregar el permiso",
                error
            )
            res.statusCode = 500;
        }    
        if (resultado === 'ok') {
            res.statusCode = 201;
        } else {
            res.statusCode = 400;
        }

        return res.end(resultado);
    } else if (req.method === 'DELETE' && req.url.includes('/permisos')) {

        resultado = undefined;
        if(query.idVisitante !== undefined && query.piso!==undefined)
            try{
                resultado = servicioPermisos.quitarPermiso(query.idVisitante, query.piso);
            }
            catch(error){
                resultado = errorUtils.generarRespuestaError(
                    "Ocurrio un error al eliminar el permiso",
                    error
                )
                res.statusCode = 500;
            }
        else if (query.idVisitante !== undefined && query.piso === undefined)
            try{
                resultado = servicioPermisos.quitarTodosLosPermisos(query.idVisitante);
            }
            catch(error){
                resultado = errorUtils.generarRespuestaError(
                    "Ocurrio un error al eliminar los permisos",
                    error
                )
                res.statusCode = 500;
            }
        else{
            res.statusCode = 404;
            return res.end('Parametros incorrectos para el recurso requerido');
        }

        if (resultado === 'ok') {
            res.statusCode = 200;
            return res.end('El vistante con id '+ query.idVisitante +' ya no puede ingresar al piso '+query.piso);
        } else {
            res.statusCode = 404;
            return res.end(resultado);
        }
    } else if (req.method === 'OPTIONS' && req.url.includes('/permisos')) {
        res.statusCode = 200;
        return res.end();
    } else {
        res.statusCode = 404;
        return res.end('Recurso no encontrado');
    }
});

server.listen(8082, () => {
  console.log('Server permisos iniciado en puerto 8082');
});
