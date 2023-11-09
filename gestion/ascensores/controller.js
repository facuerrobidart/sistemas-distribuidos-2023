import http from 'http';
import servicioAscensores from './index.js';
import errorUtils from '../utils/errorUtils.js';
import stringUtils from '../utils/stringUtils.js';
import { parseUrlAscensores } from '../utils/parseUrlUtils.js';

const parseUrl = (url) => {

    const urlParts = url.split('/');

    const lastItem = urlParts[urlParts.length - 1];

    return {
        idAscensor: (lastItem === 'ascensores')? undefined : lastItem
    }
}

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accept','application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, accept, token")
    
    if( req.url.includes('/ascensores') ){

        const params = parseUrlAscensores(req.url);
        let resultado;

        if (req.method === 'GET') {
            if (params.idAscensor === undefined) {
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
            } else { //? Es necesario traer un ascensor especifico?
                try {
                    resultado = servicioAscensores.obtenerAscensor(params.idAscensor);
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
        } else if (req.method === 'POST') {
            stringUtils.obtenerBody(req).then(body => {
                const parsedData = stringUtils.parsearBody(body);

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
                    resultado = errorUtils.generarRespuestaOk(
                        "Ascensor creado correctamente"
                    );
                } else if (typeof(resultado) === 'string') {
                    res.statusCode = 400;
                }

                return res.end(resultado);
            });
        } else if (req.method === 'PUT') {
            stringUtils.obtenerBody(req).then(body => {
                const parsedData = stringUtils.parsearBody(body);

                try {
                    resultado = servicioAscensores.actualizarAscensor(parsedData.id, parsedData);
                } catch (error) {
                    resultado = errorUtils.generarRespuestaError(
                        "Ocurrio un error al actualizar el ascensor",
                        error
                    )
                    res.statusCode = 500;
                }

                if (resultado === 'ok') {
                    res.statusCode = 200;
                    resultado = errorUtils.generarRespuestaOk(
                        "Ascensor actualizado correctamente"
                    );
                } else if (typeof(resultado) === 'string') {
                    res.statusCode = 400;
                }

                res.end(resultado);
            });

        } else if (req.method === 'DELETE') {
            try {
                resultado = servicioAscensores.eliminarAscensor(params.idAscensor);
            } catch (error) {
                resultado = errorUtils.generarRespuestaError(
                    "Ocurrio un error al eliminar el ascensor",
                    error
                )
                res.statusCode = 500;
            }

            if (resultado === 'ok') {
                res.statusCode = 200;
                resultado = errorUtils.generarRespuestaOk(
                    "Ascensor eliminado correctamente"
                );
            } else if (typeof(resultado) === 'string') {
                res.statusCode = 404;
            }

            return res.end(resultado);
        }else if (req.method === 'OPTIONS') {
            res.statusCode = 200;
            return res.end();
        } 
}
    else {
        res.statusCode = 404;
        return res.end('Recurso no encontrado');
    }
});

server.listen(8080, () => {
  console.log('Server ascensores iniciado en puerto 8080');
});
