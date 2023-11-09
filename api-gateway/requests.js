import http from 'http';

const PasoReq = function (puerto, queryPath, queryMethod, body, callback){
    let options = {
            hostname: 'localhost', // dirección del servidor
            port: puerto,            
            path: queryPath,
            method: queryMethod        
    };

    const req = http.request(options, (res) => {
        let responseBody = '';
    
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

export {
    PasoReq
}