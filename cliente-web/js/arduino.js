window.cargarTarjeta = (v) => {
    fetch('http://localhost:8086?id='+v)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert("Tarjeta grabada exitosamente");
        })
        .catch(err => console.log(err));
}

console.log("Cargando arduino.js");