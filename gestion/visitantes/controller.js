import http from 'http';
import url from 'url';
import stringUtils from '../utils/stringUtils.js';
import errorUtils from '../utils/errorUtils.js';
import servicioVisitantes from './index.js';
import { parseUrlVisitantes } from '../utils/parseUrlUtils.js';

const server = http.createServer((req, res) => {
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accept','application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, accept, token")
    

    if( req.url.includes('/visitantes') && !(req.url.includes('/permisos'))) {
    
        const params = parseUrlVisitantes(req.url);
        let resultado;

        if (req.method === 'GET') {
            if (params.idVisitante === undefined) {
                try {
                    resultado = servicioVisitantes.obtenerVisitantes();
                } catch(error){
                    resultado = errorUtils.generarRespuestaError(
                        "Ocurrio un error al obtener los visitantes",
                        error
                    )
                    res.statusCode = 500;
                }
                return res.end(JSON.stringify(resultado));
            } else {
                try{
                    resultado = servicioVisitantes.obtenerVisitante(params.idVisitante);
                } catch(error) {
                    resultado = errorUtils.generarRespuestaError(
                        "Ocurrio un error al obtener el visitante",
                        error
                    )
                    res.statusCode = 500;
                }
                return res.end(JSON.stringify(resultado));
            }
        } else if (req.method === 'POST') {
            stringUtils.obtenerBody(req).then(body => {
                const parsedData = stringUtils.parsearBody(body);
                try {
                    resultado = servicioVisitantes.crearVisitante(parsedData);
                } catch (error) {
                    resultado = errorUtils.generarRespuestaError(
                        "Ocurrio un error al agregar el visitante",
                        error
                    )
                    res.statusCode = 500;
                }

                if (resultado === 'ok') {
                    res.statusCode = 201;
                } else if (typeof resultado === 'string') {
                    res.statusCode = 400;
                }

                return res.end(resultado);
            });
        } else if (req.method === 'PUT') {
            stringUtils.obtenerBody(req).then(body => {
                const parsedData = stringUtils.parsearBody(body);
                try {
                    resultado = servicioVisitantes.actualizarVisitante(parsedData.id, parsedData);
                } catch(error) {
                    resultado = errorUtils.generarRespuestaError(
                        "Ocurrio un error al actualizar el visitante",
                        error
                    )
                    res.statusCode = 500;
                }

                if (resultado === 'ok') {
                    res.statusCode = 200;
                    return res.end("Visitante actualizado correctamente");
                } else if (typeof resultado === 'string') {
                    res.statusCode = 400;
                    return res.end(resultado);
                }
            });
        } else if (req.method === 'DELETE') {
            try {
                resultado = servicioVisitantes.eliminarVisitante(params.idVisitante);
            } catch(error) {
                resultado = errorUtils.generarRespuestaError(
                    "Ocurrio un error al eliminar el visitante",
                    error
                )
                res.statusCode = 500;
            }    

            if (resultado === 'ok') {
                res.statusCode = 200;
                return res.end("Visitante eliminado correctamente");
            } else if (typeof resultado === 'string') {
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

server.listen(8081, () => {
  console.log('Server visitantes iniciado en puerto 8081');
});
