const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline');
const http = require('http');

// Crea el puerto
/*const port = new SerialPort({
  path: 'COM3',
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});
*/

//const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));  //Ayuda a leer lineas de codigo

/*
port.on('open', () => {
  console.log('Conexión establecida con el puerto serial');
});



// Manejo de errores
port.on('error', (err) => {
  console.error('Error en el puerto serial:', err.message);
});

port.on('end', (err) => {
  console.log('Datos del Arduino:', chunk);
});*/

http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, accept, token")
    const urlParams = new URLSearchParams(req.url);

   // console.log('urlParams:', urlParams);
   // console.log('query:', urlParams.get("/?id"));
      const jsonData = [
        {
        "id": "1234f6a4-564a-4511-b96c-0e9fa114abcd", //formato UUID
        "type": 1, // 0: sensor de movimiento PIR, 1: tarjeta RFID
        "owner_id": "" + urlParams.get("/?id"), // id del visitante
        "serial_number": "125" // id físico del dispositov
        }
        ]
        ;

      //console.log('JSON:', jsonData);
      
      //Le mando el json al arduino
      /*  
      port.write(JSON.stringify(jsonData) + '\n', (err) => {
        if (err) {
          return socket.write('Error al enviar datos al Arduino:', err.message);
        }
        console.log('Datos enviados al Arduino');
      });


      parser.on('data', (data) => {
        console.log('Datos del Arduino:', data.toString());
        if(data.toString() === "Escritura exitosa")
          res.end("Escritura exitosa");
        else
          res.end("Fallo la escritura");
      });
      */
     return res.end("prueba todo bien");
  }).listen(8086, () => {
  console.log('Servidor iniciado en puerto 8086');
});

const obtenerBody = (req) => {
  return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
          body += chunk.toString();
      })

      req.on('end', () => {
          resolve(body);
      })
  })
}