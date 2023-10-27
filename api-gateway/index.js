//import query from 'express/lib/middleware/query';
import http from 'http';
import url from 'url';

// TODO: TESTEAR TODO

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const urlParseada = url.parse(req.url, true);
    const query = urlParseada.query;

    if(req.method === 'GET'){
        if (req.url.includes('/permisos')){
            if (query.idVisitante !== undefined){
                PasoReq(8082, '/permisos?idVisitante='+ query.idVisitante,'GET',null, (error, responseBody) => {
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
                path = '/visitantes?idVisitante='+query.idVisitante;

            PasoReq(8081,path,'GET', null, (error, responseBody) => {
                if (error)
                    return res.end(error);
                else
                    return res.end(responseBody)});
        }else if (req.url.includes('/ascensores')){
            let path;
            if(query.idAscensor === undefined)
                path = '/ascensores';
            else
                path = '/ascensores?idAscensores='+query.idAscensor;

            PasoReq(8080,path,'GET', null, (error, responseBody) => {
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
            PasoReq(8080,'/visitantes','POST', req.body, (error, responseBody) => {
                if (error)
                    return res.end(error);
                else
                    return res.end(responseBody)});
        }else if (req.url.includes('/ascensores')){
            PasoReq(8080,'/ascensores','POST', req.body, (error, responseBody) => {
                if (error)
                    return res.end(error);
                else
                    return res.end(responseBody)});
        } else{
            res.statusCode = 400;
            return res.end('Recurso no encontrado');
        }
    }else if (req.method === 'PUT'){
        if (req.url.includes('/permisos')){
            if(query.idVisitante !== undefined && query.piso!==undefined){
                PasoReq(8082,'/permisos?idVisitante='+query.idVisitante+'&piso='+query.piso,'PUT',null, (error, responseBody) => {
                    if (error)
                        return res.end(error);
                    else
                        return res.end(responseBody)});
            }else{
                res.statusCode = 400;
                return res.end('Parametros incorrectos para la operacion solicitada');
            }
        }else if (req.url.includes('/visitantes')){
            if(query.idVisitante !== undefined){
                PasoReq(8081,'/visitantes?idVisitante='+query.idVisitante,'POST', req.body, (error, responseBody) => {
                    if (error)
                        return res.end(error);
                    else
                        return res.end(responseBody)});
            }
            else{
                res.statusCode = 400;
                return res.end('Parametros incorrectos para la operacion solicitada');
            }
        }else if (req.url.includes('/ascensores')){
            if(query.idAscensor !== undefined)
                PasoReq(8080,'/visitantes?idVisitante='+query.idAscensor,'POST', req.body, (error, responseBody) => {
                    if (error)
                        return res.end(error);
                    else
                        return res.end(responseBody)});
            else{
                res.statusCode = 400;
                return res.end('Parametros incorrectos para la operacion solicitada');
            }
        }else{
            res.statusCode = 400;
            return res.end('Recurso no encontrado');
        }
    }else //Caso method = 'DELETE'
        if (req.url.includes('/permisos')){
            if(query.idVisitante === undefined && query.piso==undefined){
                res.statusCode = 400;
                return res.end('Parametros incorrectos para la operacion solicitada');
            }else{ 
                let path;
                if(query.piso==undefined)
                    path = '/permisos?idVisitante='+query.idVisitante;
                else
                    path = '/permisos?idVisitante='+query.idVisitante+'&piso='+query.piso;
                PasoReq(8082,path,'DELETE',null, (error, responseBody) => {
                    if (error)
                        return res.end(error);
                    else
                        return res.end(responseBody)});
            }
        }else if (req.url.includes('/visitantes')){
                if(query.idVisitante !== undefined)
                    PasoReq(8081,'/visitantes?idVisitante='+query.idVisitante,'DELETE',null, (error, responseBody) => {
                        if (error)
                            return res.end(error);
                        else
                            return res.end(responseBody)});
                else{
                    res.statusCode = 400;
                    return res.end('Parametros incorrectos para la operacion solicitada');
                }       
        }else if (req.url.includes('/ascensores')){
            if(query.idAscensor !== undefined){
                PasoReq(8080,'/ascensores?idAscensor='+query.idAscensor,'DELETE',null, (error, responseBody) => {
                    if (error)
                        return res.end(error);
                    else
                        return res.end(responseBody)});
            }else{
                res.statusCode = 400;
                return res.end('Parametros incorrectos para la operacion solicitada');
            }
        } else{
            res.statusCode = 400;
            return res.end('Recurso no encontrado');
        }
    }
    );

server.listen(8083, () => {
    console.log('API Gateway iniciada en el puerto 8083');
});

const PasoReq = function (puerto, queryPath, queryMethod,body,callback){
    
    if(body==null){
        var options = {
            hostname: 'localhost', // Cambia esto a la dirección del servidor si es diferente
            port: puerto,            // Puerto en el que se ejecuta el servidor
            path: queryPath,
            method: queryMethod,          // Método de solicitud (GET en este caso)
        };
    }
    else{
        var options = {
            hostname: 'localhost', // Cambia esto a la dirección del servidor si es diferente
            port: puerto,            // Puerto en el que se ejecuta el servidor
            path: queryPath,
            method: queryMethod,          // Método de solicitud (GET en este caso)
          };
    }  
    
    const req = http.request(options, (res) => {
    let responseBody= '';
    
        res.on('data', (chunk) => {
            responseBody += chunk;
        });
        
        res.on('end', () => {
            callback(null,responseBody); 
        });
    });
    
    req.on('error', (error) => {
        console.error('Error en la solicitud:', error);
        callback(error,null);	
    });
    
    req.end(); // Envía la solicitud al servidor
}