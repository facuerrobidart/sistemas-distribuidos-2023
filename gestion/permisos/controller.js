import http from 'http';
import servicioPermisos from './index.js';
import stringUtils from '../utils/stringUtils.js';
import errorUtils from '../utils/errorUtils.js';
import { parseUrlPermisos } from '../utils/parseUrlUtils.js';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const params = parseUrlPermisos(req.url);
    let resultado;

    if(req.url.includes('/visitantes') && req.url.includes('/permisos') ){

        if (req.method === 'GET') {
            if (params.idVisitante !== undefined) {
                try{
                    resultado = servicioPermisos.obtenerPermisos(params.idVisitante);
                }
                catch(error){
                    resultado = errorUtils.generarRespuestaError(
                        "Ocurrio un error al obtener los permisos",
                        error
                    )
                    res.statusCode = 500;
                }

                if (resultado === 'NoExisteID') {
                    return res.end('No existe un visitante con ID = ' + params.idVisitante)
                } else {
                    return res.end(JSON.stringify(resultado));
                }
            } else {
                res.statusCode = 400;
                return res.end('Parametros incorrectos para el recurso requerido');
            }
        } else if (req.method === 'PUT') {
            stringUtils.obtenerBody(req).then(body => {
                const parsedData = stringUtils.parsearBody(body);

                try {
                    resultado = servicioPermisos.agregarPermisos(params.idVisitante, parsedData.pisos_permitidos);
                } catch (error) {
                    resultado = errorUtils.generarRespuestaError(
                        "Ocurrio un error al agregar el permiso",
                        error
                    )
                    res.statusCode = 500;
                }    
                if (resultado === 'ok') {
                    res.statusCode = 201;
                    resultado = errorUtils.generarRespuestaOk(
                        "Permisos modificados correctamente"
                    )
                } else {
                    res.statusCode = 400;
                }
    
                return res.end(resultado);
            });
        } else if (req.method === 'DELETE') {
            resultado = undefined;
            if(params.idVisitante !== undefined && params.piso !== undefined) {
                try {
                    resultado = servicioPermisos.quitarPermiso(params.idVisitante, params.piso);
                } catch(error) {
                    resultado = errorUtils.generarRespuestaError(
                        "Ocurrio un error al eliminar el permiso",
                        error
                    )
                    res.statusCode = 500;
                }
            } else if (params.idVisitante !== undefined && params.piso === undefined) {
                try {
                    resultado = servicioPermisos.quitarTodosLosPermisos(params.idVisitante);
                } catch(error){
                    resultado = errorUtils.generarRespuestaError(
                        "Ocurrio un error al eliminar los permisos",
                        error
                    )
                    res.statusCode = 500;
                }
            } else {
                res.statusCode = 404;
                return res.end('Parametros incorrectos para el recurso requerido');
            }

            if (resultado === 'ok') {
                res.statusCode = 200;
                return res.end('El vistante con id '+ params.idVisitante +' ya no puede ingresar al piso '+params.piso);
            } else {
                res.statusCode = 404;
                return res.end(resultado);
            }
        } else if (req.method === 'OPTIONS') {
            res.statusCode = 200;
            return res.end();
        } 
    }
    else {
        res.statusCode = 404;
        return res.end('Recurso no encontrado');
    }
});

server.listen(8003, () => {
  console.log('Server permisos iniciado en puerto 8003');
});
