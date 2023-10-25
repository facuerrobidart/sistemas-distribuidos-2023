import http from 'http';

const server = http.createServer((req, res) => {
    console.log('Algo que hace la API');
})

server.listen(8083, () => {
    console.log('API Gateway iniciada en el puerto 8083');
});