import ascensores from "../../gestion/persistencia/elevators.json" assert {type: "json"};
const cuerpoTabla = document.querySelector('#cuerpo-tabla');

async function cargarTabla() {

    ascensores = await getAscensores();

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

// TODO: testear
const agregarAscensor = () => {

    let nombre = document.querySelector('#nombre').value;
    let strPisos = document.querySelector('#pisos').value;
    let pisos = strPisos.split(',');
    let estado = document.querySelector('#estado').value;

    let ascensor = {
        id: null,
        nombre, 
        pisos, 
        estado
    };

    let url = 'http:/gw/ascensores';
    let options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(ascensor)    
    }
    

    cargarTabla();
    
}

// TODO: testear
async function getAscensores() {
    
    let url = 'http:/gw/ascensores';
    const res = await fetch(url);

    if( res.ok ) {
        return await response.json();
    }
    
    console.log('GET Request fallida')

}

// TODO: testear
async function deleteAscensor(id) {
    
    let url = `http:/gw/ascensores/${id}`;
    let options = {
        method: 'DELETE'
    }

    const res = await fetch(url, options);

    if( !res.ok ) {
        console.log(`Falla al eliminar: ${res.status}`)
    }
    
}

window.eliminarAscensor = (id) => {
    
    deleteAscensor(id);

    cargarTabla();
}

cargarTabla();

document.querySelector('#formAscensor').addEventListener('submit', agregarAscensor);