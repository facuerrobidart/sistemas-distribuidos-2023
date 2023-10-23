import http from 'http';
import url from 'url';
import stringUtils from '../utils/stringUtils.js';
import servicioAscensores from './index.js';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    const urlParseada = url.parse(req.url, true);
    const query = urlParseada.query;

    if (req.method === 'GET' && req.url.includes('/ascensores')) {
        if (query.idAscensor === undefined) {
            return res.end(
                JSON.stringify(servicioAscensores.obtenerAscensores())
            );
        } else {
            return res.end(
                JSON.stringify(servicioAscensores.obtenerAscensor(query.idAscensor))
            );
        }
    } else if (req.method === 'POST' && req.url.includes('/ascensores')) {
        const resultado = servicioAscensores.crearAscensor(stringUtils.parsearBody(req.body));

        if (resultado === 'ok') {
            res.statusCode = 201;
        } else {
            res.statusCode = 400;
        }

        return res.end(resultado);
    } else if (req.method === 'PUT' && req.url === '/ascensores') {
        const resultado = servicioAscensores.actualizarAscensor(query.idAscensor, stringUtils.parsearBody(req.body));

        if (resultado === 'ok') {
            res.statusCode = 200;
            return res.end("Ascensor actualizado correctamente");
        } else {
            res.statusCode = 400;
            return res.end(resultado);
        }
    } else if (req.method === 'DELETE' && req.url === '/ascensores') {
        const resultado = servicioAscensores.eliminarAscensor(query.idAscensor);

        if (resultado === 'ok') {
            res.statusCode = 200;
            return res.end("Ascensor eliminado correctamente");
        } else {
            res.statusCode = 404;
            return res.end(resultado);
        }
    } else {
        res.statusCode = 404;
        return res.end('Recurso no encontrado');
    }
});

server.listen(8080, () => {
  console.log('Server ascensores iniciado en puerto 8080');
});
