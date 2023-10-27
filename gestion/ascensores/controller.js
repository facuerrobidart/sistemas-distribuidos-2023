import http from 'http';
import url from 'url';
import servicioAscensores from './index.js';
import errorUtils from '../utils/errorUtils.js';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accept','application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, accept, token")
    
    const urlParseada = url.parse(req.url, true);
    const query = urlParseada.query;
    let resultado;

    if (req.method === 'GET' && req.url.includes('/ascensores')) {
        if (query.idAscensor === undefined) {
            try {
                resultado = servicioAscensores.obtenerAscensores();
            } catch (error) {
                resultado = errorUtils.generarRespuestaError(
                    "Ocurrio un error al obtener los ascensores",
                    error
                )
                res.statusCode = 500;
            }
             
            return res.end(
                JSON.stringify(resultado)
            );
        } else {
            try {
                resultado = servicioAscensores.obtenerAscensor(query.idAscensor);
            } catch (error) {
                resultado = errorUtils.generarRespuestaError(
                    "Ocurrio un error al obtener el ascensor",
                    error
                )
                res.statusCode = 500;
            }
            return res.end(
                JSON.stringify(resultado)
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


                try {
                    resultado = servicioAscensores.crearAscensor(parsedData);
                } catch (error) {
                    resultado = errorUtils.generarRespuestaError(
                        "Ocurrio un error al crear el ascensor",
                        error
                    )
                    res.statusCode = 500;
                }

                if (resultado === 'ok') {
                    res.statusCode = 201; // Created status
                } else if (typeof(resultado) === 'string') {
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

                try {
                    resultado = servicioAscensores.actualizarAscensor(query.idAscensor, parsedData);
                } catch (error) {
                    resultado = errorUtils.generarRespuestaError(
                        "Ocurrio un error al actualizar el ascensor",
                        error
                    )
                    res.statusCode = 500;
                }

                if (resultado === 'ok') {
                    res.statusCode = 200;
                    res.body("Ascensor actualizado correctamente");
                } else if (typeof(resultado) === 'string') {
                    res.statusCode = 400;
                }
                
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        });

    } else if ( req.method === 'DELETE' && req.url.includes('/ascensores')) {

        try {
            resultado = servicioAscensores.eliminarAscensor(query.idAscensor);
        } catch (error) {
            resultado = errorUtils.generarRespuestaError(
                "Ocurrio un error al eliminar el ascensor",
                error
            )
            res.statusCode = 500;
        }

        if (resultado === 'ok') {
            res.statusCode = 200;
            return res.end("Ascensor eliminado correctamente");
        } else if (typeof(resultado) === 'string') {
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
