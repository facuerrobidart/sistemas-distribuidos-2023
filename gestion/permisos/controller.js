import http from 'http';
import url from 'url';
import stringUtils from '../utils/stringUtils.js';
import servicioPermisos from './index.js';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const urlParseada = url.parse(req.url, true);
    const query = urlParseada.query;

    if (req.method === 'GET' && req.url.includes('/permisos')) {
        if (query.idVisitante !== undefined) {
            const resultado = servicioPermisos.obtenerPermisos(query.idVisitante);
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
        const resultado = servicioPermisos.agregarPermisos(query.idVisitante,query.piso);

        if (resultado === 'ok') {
            res.statusCode = 201;
        } else {
            res.statusCode = 400;
        }

        return res.end(resultado);
    } else if (req.method === 'DELETE' && req.url.includes('/permisos')) {

        var resultado = undefined;
        if(query.idVisitante !== undefined && query.piso!==undefined)
            resultado = servicioPermisos.quitarPermiso(query.idVisitante, query.piso);
        else if (query.idVisitante !== undefined && query.piso === undefined)
            resultado = servicioPermisos.quitarTodosLosPermisos(query.idVisitante);
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
    } else {
        res.statusCode = 404;
        return res.end('Recurso no encontrado');
    }
});

server.listen(8082, () => {
  console.log('Server permisos iniciado en puerto 8082');
});
