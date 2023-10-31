import http from 'http';
import url from 'url';
import stringUtils from '../gestion/utils/stringUtils.js';
import { parseUrlAscensores, parseUrlPermisos, parseUrlVisitantes } from '../gestion/utils/parseUrlUtils.js';

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

    //const urlParseada = url.parse(req.url, true);
    //const query = urlParseada.query;

    if(req.method === 'GET'){
        if (req.url.includes('/visitantes') && req.url.includes('/permisos') ){
            const params = parseUrlPermisos(req.url);
            
            if (params.idVisitante !== undefined){
                PasoReq(puertoPermisos, `/visitantes/${params.idVisitante}/permisos`, 'GET', null, (error, responseBody) => {
                    if (error)
                        return res.end(error);
                    else
                        return res.end(responseBody)});
            } else {
                res.statusCode = 400;
                return res.end('Parametros incorrectos para el recurso requerido');
            }    
        }else if (req.url.includes('/visitantes')){
            const params = parseUrlVisitantes(req.url);
            let path;
            if(params.idVisitante === undefined)
                path = '/visitantes';
            else
                path = `/visitantes/${params.idVisitante}`;

            PasoReq(puertoVisitantes, path, 'GET', null, (error, responseBody) => {
                if (error)
                    return res.end(error);
                else
                    return res.end(responseBody)});
        }else if (req.url.includes('/ascensores')){
            let path;
            const params = parseUrlAscensores(req.url);
            if(params.idAscensor === undefined)
                path = '/ascensores';
            else
                path = `/ascensores/${params.idAscensor}`;

            PasoReq(puertoAscensores, path, 'GET', null, (error, responseBody) => {
                if (error)
                    return res.end(error);
                else
                    return res.end(responseBody)});
        } else{
            res.statusCode = 400;
            return res.end('Recurso no encontrado');
        }
    } else if (req.method === 'POST') {        ///Permisos no tiene Post
        if (req.url.includes('/visitantes')){
            stringUtils.obtenerBody(req).then(body => {
                PasoReq(puertoVisitantes, '/visitantes' , 'POST', body, (error, responseBody) => {
                    if (error)
                        return res.end(error);
                    else
                        return res.end(responseBody)});
            });

            return res.end("Visitante agregado");
        } else if (req.url.includes('/ascensores')){
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

            return res.end("Ascensor agregado");
        } else{
            res.statusCode = 400;
            return res.end('Recurso no encontrado');
        }
    } else if (req.method === 'PUT'){
        if (req.url.includes('/visitantes') && req.url.includes('/permisos') ){

            const params = parseUrlPermisos(req.url);

            if(params.idVisitante !== undefined){
                stringUtils.obtenerBody(req).then( body =>{

                    PasoReq(puertoPermisos, `/visitantes/${params.idVisitante}/permisos`, 'PUT', body, (error, responseBody) => {
                        if (error)
                            return res.end(error);
                        else
                            return res.end(responseBody)});
                        
                    });
            }else{
                res.statusCode = 400;
                return res.end('Parametros incorrectos para la operacion solicitada');
            }
        } else if (req.url.includes('/visitantes')){
            stringUtils.obtenerBody(req).then(body => {
                PasoReq(puertoVisitantes, `/visitantes`,'PUT', body, (error, responseBody) => {
                    if (error)
                        return res.end(error);
                    else
                        return res.end(responseBody)});
            });
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
        if ( req.url.includes('/visitantes') && req.url.includes('/permisos')){
            const params = parseUrlPermisos(req.url);
            if (params.idVisitante === undefined && params.piso==undefined) {
                res.statusCode = 400;
                return res.end('Parametros incorrectos para la operacion solicitada');
            } else { 
                let path;
                if (params.piso == undefined) {
                    path = `/visitantes/${params.idVisitante}/permisos`;
                } else {
                    path = `/visitantes/${params.idVisitante}/${params.piso}/permisos`;
                }

                PasoReq(puertoPermisos, path, 'DELETE', null, (error, responseBody) => {
                    if (error)
                        return res.end(error);
                    else
                        return res.end(responseBody)});

                return res.end("Permiso eliminado");
            }
        } else if (req.url.includes('/visitantes')) {
                const params = parseUrlVisitantes(req.url);
                if (params.idVisitante !== undefined) {
                    PasoReq(puertoVisitantes, `/visitantes/${params.idVisitante}`, 'DELETE', null, (error, responseBody) => {
                        if (error)
                            return res.end(error);
                        else
                            return res.end(responseBody)});
                    
                    return res.end("Visitante eliminado");
                } else {
                    res.statusCode = 400;
                    return res.end('Parametros incorrectos para la operacion solicitada');
                }       
        } else if (req.url.includes('/ascensores')) {
            const params=parseUrlAscensores(req.url)
            if (params.idAscensor !== undefined) {
                PasoReq(puertoAscensores, `/ascensores/${params.idAscensor}`, 'DELETE', null, (error, responseBody) => {
                    if (error)
                        return res.end(error);
                    else
                        return res.end(responseBody)});
                
                return res.end("Ascensor eliminado");
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