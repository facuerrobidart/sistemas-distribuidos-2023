import ascensores from "../../gestion/persistencia/elevators.json" assert {type: "json"};
const cuerpoTabla = document.querySelector('#cuerpo-tabla');

const cargarTabla = () => {

    //GET (devuelve ascensores.json)

    cuerpoTabla.innerHTML = '';

    ascensores.map( (asc) => {
    
        const fila = document.createElement('tr');
        
        const celdas = `<td>${asc.id}</td>
                        <td>${asc.nombre}</td>
                        <td>${asc.pisos}</td>
                        <td>${asc.estado}</td>
                        <td class="table-actions">
                            <div>
                                <button id="btn-edit">
                                    <i class="fa-solid fa-pencil"></i>
                                </button>
                            </div>
                            <div>
                                <button id="btn-remove" onclick="eliminarAscensor('${asc.id}')">
                                    <i class="fa-regular fa-circle-xmark"></i>
                                </button>
                            </div>
                        </td>`;

        fila.innerHTML = celdas;
        cuerpoTabla.append(fila);
    } )
    
};

const agregarAscensor = () => {

    let nombre = document.querySelector('#nombre').value;
    let strPisos = document.querySelector('#pisos').value;
    let pisos = strPisos.split(',');
    let estado = document.querySelector('#estado').value;

    //POST
    let ascensor = {
        id: null,
        nombre, 
        pisos, 
        estado
    };

    //Realizo un GET y actualizo la tabla?
    
}

window.eliminarAscensor = (id) => {

    console.log(id);

    //DELETE 

    //Realizo un GET y actualizo la tabla?

}

cargarTabla();

document.querySelector('#formAscensor').addEventListener('submit', agregarAscensor);