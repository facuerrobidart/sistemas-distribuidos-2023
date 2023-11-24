window.cargarTarjeta = (v) => {
    let options = {
        method: 'GET',
        headers: {
            accept: 'text/plain',
        }
    }

    fetch('http://localhost:8086?id='+v,options)
        //.then(response => response.json())
        .then(data => {
            console.log(data);
            alert("Tarjeta grabada exitosamente");
        })
        .catch(err => console.log(err));
}

//console.log("Cargando arduino.js");