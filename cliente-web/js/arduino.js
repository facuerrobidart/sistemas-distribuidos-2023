window.cargarTarjeta = (v) => {
    console.log(v)
    fetch('http://localhost:8085?id='+v)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert("Tarjeta grabada exitosamente");
        })
        .catch(err => console.log(err));
}

console.log("Cargando arduino.js");