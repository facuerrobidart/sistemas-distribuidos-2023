import http from 'http';
import url from 'url';
import stringUtils from '../gestion/utils/stringUtils.js';

// TODO: TESTEAR TODO

const puertoVisitantes = 8081;
const puertoAscensores = 8080;
const puertoPermisos = 8082;
const puertoGateway = 8083;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accept','application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, accept, token")

    const urlParseada = url.parse(req.url, true);
    const query = urlParseada.query;

    if(req.method === 'GET'){
        if (req.url.includes('/permisos')){
            if (query.idVisitante !== undefined){
                PasoReq(puertoPermisos, `/permisos?idVisitante=${query.idVisitante}`, 'GET', null, (error, responseBody) => {
                    if (error)
                        return res.end(error);
                    else
                        return res.end(responseBody)});
            } else {
                res.statusCode = 400;
                return res.end('Parametros incorrectos para el recurso requerido');
            }    
        }else if (req.url.includes('/visitantes')){
            let path;
            if(query.idVisitante === undefined)
                path = '/visitantes';
            else
                path = `/visitantes?idVisitante=${query.idVisitante}`;

            PasoReq(puertoVisitantes, path, 'GET', null, (error, responseBody) => {
                if (error)
                    return res.end(error);
                else
                    return res.end(responseBody)});
        }else if (req.url.includes('/ascensores')){
            let path;
            
            if(query.idAscensor === undefined)
                path = '/ascensores';
            else
                path = `/ascensores?idAscensores=${query.idAscensor}`;

            PasoReq(puertoAscensores, path, 'GET', null, (error, responseBody) => {
                if (error)
                    return res.end(error);
                else
                    return res.end(responseBody)});
        } else{
            res.statusCode = 400;
            return res.end('Recurso no encontrado');
        }
    }else if (req.method === 'POST'){        ///Permisos no tiene Post
        if (req.url.includes('/visitantes')){
            stringUtils.obtenerBody(req).then(body => {
                PasoReq(puertoVisitantes, '/visitantes' , 'POST', body, (error, responseBody) => {
                    if (error)
                        return res.end(error);
                    else
                        return res.end(responseBody)});
            });
        }else if (req.url.includes('/ascensores')){
            stringUtils.obtenerBody(req).then(body => {
                PasoReq(puertoAscensores, '/ascensores', 'POST', body, (error, responseBody) => {
                    if (error)
                        return res.end(error);
                    else
                        return res.end(responseBody)});
            }).catch(error => {
                res.statusCode = 500;
                return res.end('Error al obtener el body');
            });
        } else{
            res.statusCode = 400;
            return res.end('Recurso no encontrado');
        }
    } else if (req.method === 'PUT'){
        if (req.url.includes('/permisos')){
            if(query.idVisitante !== undefined && query.piso !== undefined){
                PasoReq(puertoPermisos, `/permisos?idVisitante=${query.idVisitante}&piso=${query.piso}`, 'PUT', null, (error, responseBody) => {
                    if (error)
                        return res.end(error);
                    else
                        return res.end(responseBody)});
            }else{
                res.statusCode = 400;
                return res.end('Parametros incorrectos para la operacion solicitada');
            }
        } else if (req.url.includes('/visitantes')){
            if (query.idVisitante !== undefined) {
                stringUtils.obtenerBody(req).then(body => {
                    PasoReq(puertoVisitantes, `/visitantes?idVisitante=${query.idVisitante}`,'PUT', body, (error, responseBody) => {
                        if (error)
                            return res.end(error);
                        else
                            return res.end(responseBody)});
                });
            } else {
                res.statusCode = 400;
                return res.end('Parametros incorrectos para la operacion solicitada');
            }
        } else if (req.url.includes('/ascensores')){
            stringUtils.obtenerBody(req).then(body => {
                PasoReq(puertoAscensores, `/ascensores`, 'PUT', body, (error, responseBody) => {
                    if (error)
                        return res.end(error);
                    else
                        return res.end(responseBody)});
            });
        } else {
            res.statusCode = 400;
            return res.end('Recurso no encontrado');
        }
    } else if( req.method === 'DELETE' ) { //Caso method = 'DELETE'
        if (req.url.includes('/permisos')){
            if (query.idVisitante === undefined && query.piso==undefined) {
                res.statusCode = 400;
                return res.end('Parametros incorrectos para la operacion solicitada');
            } else { 
                let path;
                if (query.piso==undefined)
                    path = `/permisos?idVisitante=${query.idVisitante}`;
                else
                    path = `/permisos?idVisitante=${query.idVisitante}&piso=${query.piso}`;
                PasoReq(puertoPermisos, path, 'DELETE', null, (error, responseBody) => {
                    if (error)
                        return res.end(error);
                    else
                        return res.end(responseBody)});
            }
        } else if (req.url.includes('/visitantes')) {
                if(query.idVisitante !== undefined)
                    PasoReq(puertoVisitantes, `/visitantes?idVisitante=${query.idVisitante}`, 'DELETE', null, (error, responseBody) => {
                        if (error)
                            return res.end(error);
                        else
                            return res.end(responseBody)});
                else{
                    res.statusCode = 400;
                    return res.end('Parametros incorrectos para la operacion solicitada');
                }       
        } else if (req.url.includes('/ascensores')) {
            if (query.idAscensor !== undefined) {
                PasoReq(puertoAscensores, `/ascensores?idAscensor=${query.idAscensor}`, 'DELETE', null, (error, responseBody) => {
                    if (error)
                        return res.end(error);
                    else
                        return res.end(responseBody)});
            } else {
                res.statusCode = 400;
                return res.end('Parametros incorrectos para la operacion solicitada');
            }
        } 
    } else if(req.method === 'OPTIONS'){ //PREFLIGHT
        res.statusCode = 200;
        return res.end();
    } else {
        res.statusCode = 400;
        return res.end('Recurso no encontrado');
    }
});

server.listen(puertoGateway, () => {
    console.log(`API Gateway iniciada en el puerto ${puertoGateway}`);
});

const PasoReq = function (puerto, queryPath, queryMethod, body, callback){
    let options = {
            hostname: 'localhost', // Cambia esto a la dirección del servidor si es diferente
            port: puerto,            // Puerto en el que se ejecuta el servidor
            path: queryPath,
            method: queryMethod          // Método de solicitud (GET en este caso)
    };

    const req = http.request(options, (res) => {
        let responseBody= '';
    
        res.on('data', (chunk) => {
            responseBody += chunk;
        });
        
        res.on('end', () => {
            callback(null, responseBody); 
        });
    });

    if (body !== null) {
        req.write(body);
    }
    
    req.on('error', (error) => {
        console.error('Error en la solicitud:', error);
        callback(error);	
    });
    
    req.end(); // Envía la solicitud al servidor
}