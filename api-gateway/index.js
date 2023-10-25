import http from 'http';
import url from 'url';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const urlParseada = url.parse(req.url, true);
    const query = urlParseada.query;

    if(req.method === 'GET'){
        if (req.url.includes('/permisos')){
            if (query.id !== undefined){
                PasoReq(8082,'/permisos?id='+query.id,'GET', (error, responseBody) => {
                    if (error)
                        return res.end('Ocurrio un error en el servidor');
                    else
                        return res.end(responseBody)});
            } else {
                res.statusCode = 400;
                return res.end('Parametros incorrectos para el recurso requerido');
            }    
        }else if (req.url.includes('/visitantes')){
            //No evaluo nada de la query, la paso directamente
        }else if (req.url.includes('/ascensores')){
            //No evaluo nada de la query, la paso directamente
        } else{
            res.statusCode = 400;
            return res.end('Recurso no encontrado');
        }
    }else if (req.method === 'POST'){        ///Permisos no tiene Post
        if (req.url.includes('/visitantes')){
            //Mando directamente, lo gestiona el MS
        }else if (req.url.includes('/ascensores')){
            //Mando directamente, lo gestiona el MS
        } else{
            res.statusCode = 400;
            return res.end('Recurso no encontrado');
        }
    }else if (req.method === 'PUT'){
        if (req.url.includes('/permisos')){
            if(query.id !== undefined && query.piso!==undefined){
                return res.end(PasoReq(8082,query))
            }else{
                res.statusCode = 400;
                return res.end('Parametros incorrectos para la operacion solicitada');
            }
        }else if (req.url.includes('/visitantes')){
            if(query.idVisitante !== undefined){
                //Mando
            }
            else{
                res.statusCode = 400;
                return res.end('Parametros incorrectos para la operacion solicitada');
            }
        }else if (req.url.includes('/ascensores')){
            if(query.idAscensor !== undefined){
            //Mando
            }
            else{
                res.statusCode = 400;
                return res.end('Parametros incorrectos para la operacion solicitada');
            }
        }else{
            res.statusCode = 400;
            return res.end('Recurso no encontrado');
        }
    }else{ //Caso method = 'DELETE'
        if (req.url.includes('/permisos')){
        if(query.id === undefined && query.piso==undefined){
            res.statusCode = 400;
            return res.end('Parametros incorrectos para la operacion solicitada');
        }else{
            return res.end(PasoReq(8082,query));
        }
        }else if (req.url.includes('/visitantes')){
            if(query.idVisitante !== undefined){
                //Mando
            }else{
                res.statusCode = 400;
                return res.end('Parametros incorrectos para la operacion solicitada');
            }       
        }else if (req.url.includes('/ascensores')){
            if(query.idAscensor !== undefined){
                //Mando
            }else{
                res.statusCode = 400;
                return res.end('Parametros incorrectos para la operacion solicitada');
            } 
        } else{
            res.statusCode = 400;
            return res.end('Recurso no encontrado');
        }
    }
    }
    );

server.listen(8083, () => {
    console.log('API Gateway iniciada en el puerto 8083');
});

const PasoReq = function (puerto, queryPath, queryMethod,callback){
    
    const options = {
        hostname: 'localhost', // Cambia esto a la dirección del servidor si es diferente
        port: puerto,            // Puerto en el que se ejecuta el servidor
        path: queryPath,
        method: queryMethod,          // Método de solicitud (GET en este caso)
      };
    
    const req = http.request(options, (res) => {
    let responseBody= '';
    
    res.on('data', (chunk) => {
        responseBody += chunk;
    });
    
    res.on('end', () => {
        callback(null,responseBody) 
    });
    });
    
    req.on('error', (error) => {
        console.error('Error en la solicitud:', error);
        callback(error,null);	
    });
    
    req.end(); // Envía la solicitud al servidor
}