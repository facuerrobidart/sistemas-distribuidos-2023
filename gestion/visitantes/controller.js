import http from 'http';
import url from 'url';
import stringUtils from '../utils/stringUtils.js';
import servicioVisitantes from './index.js';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    const urlParseada = url.parse(req.url, true);
    const query = urlParseada.query;
    let resultado

    if (req.method === 'GET' && req.url.includes('/visitantes')) {
        
        if (query.idVisitante === undefined) {
            try{
                resultado = servicioVisitantes.obtenerVisitantes();
            }
            catch(error){
                resultado = errorUtils.generarRespuestaError(
                    "Ocurrio un error al obtener los visitantes",
                    error
                )
                res.statusCode = 500;
            }
            return res.end(JSON.stringify(resultado));
        } else {
            try{
                resultado = servicioVisitantes.obtenerVisitante(query.idVisitante);
            }
            catch(error){
                resultado = errorUtils.generarRespuestaError(
                    "Ocurrio un error al obtener el visitante",
                    error
                )
                res.statusCode = 500;
            }
            return res.end(JSON.stringify(resultado));
        }
    } else if (req.method === 'POST' && req.url.includes('/visitantes')) {
        try{
            resultado = servicioVisitantes.crearVisitante(stringUtils.parsearBody(req.body));
        }
        catch(error){
            resultado = errorUtils.generarRespuestaError(
                "Ocurrio un error al agregar el visitante",
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
    } else if (req.method === 'PUT' && req.url.includes('/visitantes')) {
        try{
            resultado = servicioVisitantes.actualizarVisitante(query.idVisitante, stringUtils.parsearBody(req.body));
        }
        catch(error){
            resultado = errorUtils.generarRespuestaError(
                "Ocurrio un error al actualizar el visitante",
                error
            )
            res.statusCode = 500;
        }

        if (resultado === 'ok') {
            res.statusCode = 200;
            return res.end("Visitante actualizado correctamente");
        } else {
            res.statusCode = 400;
            return res.end(resultado);
        }
    } else if (req.method === 'DELETE' && req.url.includes('/visitantes')) {
        try{
            resultado = servicioVisitantes.eliminarVisitante(query.idVisitante);
        }
        catch(error){
            resultado = errorUtils.generarRespuestaError(
                "Ocurrio un error al eliminar el visitante",
                error
            )
            res.statusCode = 500;
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
