import visitantes from "../../gestion/persistencia/guests.json" assert {type: "json"};
const cuerpoTabla = document.querySelector('#cuerpo-tabla-visitantes');

const cargarTabla = () => {

    //GET (devuelve ascensores.json)

    cuerpoTabla.innerHTML = '';

    visitantes.map( (vis) => {
    
        const fila = document.createElement('tr');
        
        const celdas = `<td>${vis.id}</td>
                        <td>${vis.nombre}</td>
                        <td>${vis.edad}</td>
                        <td>${vis.email}</td>
                        <td>${vis.pisos_permitidos}</td>
                        <td>${vis.fecha_checkIn}</td>
                        <td>${vis.fecha_checkOut}</td>
                        <td class="table-actions">
                            <div>
                                <button id="btn-edit">
                                    <i class="fa-solid fa-pencil"></i>
                                </button>
                            </div>
                            <div>
                                <button id="btn-remove" onclick="eliminarVisitante('${vis.id}')">
                                    <i class="fa-regular fa-circle-xmark"></i>
                                </button>
                            </div>
                        </td>`;

        fila.innerHTML = celdas;
        cuerpoTabla.append(fila);
    } )
    
};

const agregarVisitante = () => {

    let nombre = document.querySelector('#nombre').value;
    let edad = document.querySelector('#edad').value;
    let email = document.querySelector('#email').value;
    let strPisos = document.querySelector('#pisos').value;
    let pisos_permitidos = strPisos.split(',');
    
    //(?) Fecha checkIn, checkOut 

    //POST
    let visitante = {
        id: null,
        nombre,
        edad,
        email, 
        pisos_permitidos, 
    };

    //Realizo un GET y actualizo la tabla?
    
}

window.eliminarVisitante = (id) => {

    console.log(id);

    //DELETE 

    //Realizo un GET y actualizo la tabla?

}

cargarTabla();

document.querySelector('#formVisitante').addEventListener('submit', agregarVisitante);