import http from 'http';
import url from 'url';
import stringUtils from '../utils/stringUtils.js';
import servicioPermisos from './index.js';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    const urlParseada = url.parse(req.url, true);
    const query = urlParseada.query;

    if (req.method === 'GET' && req.url.includes('/permisos')) {
        if (query.id !== undefined) {
            return res.end(
                JSON.stringify(servicioPermisos.obtenerPermisos(query.id))
            );
        } else {
            res.statusCode = 400;
            return res.end('Parametros incorrectos para el recurso requerido');
        }
    } else if (req.method === 'POST' && req.url.includes('/permisos')) {
        const resultado = servicioPermisos.agregarPermisos(query.id,query.piso);

        if (resultado === 'ok') {
            res.statusCode = 201;
        } else {
            res.statusCode = 400;
        }

        return res.end(resultado);
    } else if (req.method === 'DELETE' && req.url.includes('/visitantes')) {

        const resultado = undefined;
        if(query.id !== undefined && query.piso!==undefined)
            resultado = servicioPermisos.eliminarPermiso(query.id, query.piso);
        else if (query.id !== undefined && query.piso === undefined)
            resultado = servicioPermisos.quitarTodosLosPermisos(query.id);
        else{
            res.statusCode = 404;
            return res.end('Parametros incorrectos para el recurso requerido');
        }

        if (resultado === 'ok') {
            res.statusCode = 200;
            return res.end("Visitante eliminado correctamente");
        } else {
            res.statusCode = 404;
            return res.end(resultado);
        }
    } else {
        res.statusCode = 404;
        return res.end('Recurso no encontrado');
    }
});

server.listen(8081, () => {
  console.log('Server visitantes iniciado en puerto 8081');
});