import http from 'http';
import url from 'url';
import stringUtils from '../utils/stringUtils.js';
import servicioAscensores from './index.js';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accept','application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, accept, token")
    
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

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const parsedData = JSON.parse(body);

                const resultado = servicioAscensores.crearAscensor(parsedData);

                if (resultado === 'ok') {
                    res.statusCode = 201; // Created status
                } else {
                    res.statusCode = 400;
                }
                
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        });

    } else if (req.method === 'PUT' && req.url.includes('/ascensores')) {

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const parsedData = JSON.parse(body);

                const resultado = servicioAscensores.actualizarAscensor(parsedData);

                if (resultado === 'ok') {
                    res.statusCode = 200;
                    res.body("Ascensor actualizado correctamente");
                } else {
                    res.statusCode = 400;
                }
                
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        });

    } else if ( req.method === 'DELETE' && req.url.includes('/ascensores')) {

        const resultado = servicioAscensores.eliminarAscensor(query.idAscensor);

        if (resultado === 'ok') {
            res.statusCode = 200;
            return res.end("Ascensor eliminado correctamente");
        } else {
            res.statusCode = 404;
            return res.end(resultado);
        }
    }else if (req.method === 'OPTIONS' && req.url.includes('/ascensores')) {

        res.statusCode = 200;
        return res.end();
    
    } else {
        res.statusCode = 404;
        return res.end('Recurso no encontrado');
    }
});

server.listen(8080, () => {
  console.log('Server ascensores iniciado en puerto 8080');
});
