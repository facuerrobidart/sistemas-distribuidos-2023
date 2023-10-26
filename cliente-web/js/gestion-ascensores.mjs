const cuerpoTabla = document.querySelector('#cuerpo-tabla-ascensores');

const cargarTabla = async () => {

    const ascensores = await getAscensores();

    console.log(ascensores);
    let tableContent = '';

    ascensores.map( (asc) => {
    
        
        const fila = `
                    <tr>
                        <td>${asc.id}</td>
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
                        </td>
                    </tr>`;

        tableContent += fila;

    } )
    
    cuerpoTabla.innerHTML = tableContent;
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

    addAscensor(ascensor);

    cargarTabla();
}

const addAscensor = async (ascensor) => {

    let url = 'http://localhost:8080/ascensores';
    let options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(ascensor)
    }
    const res = await fetch(url, options);
    
    if( !res.ok ) {
        console.log(`Falla al eliminar: ${res.status}`)
    }

}

const getAscensores = async () => {

    let url = 'http://localhost:8080/ascensores';

    let options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    }

    try {
        const res = await fetch(url, options);

        if( !res.ok ){
            throw new Error(`Error! status: ${res.status}`);
        }

        return await res.json();
    
    } catch (err) {
        console.log('GET Request fallida');
    }

}

const deleteAscensor = async (id) => {
    
    let url = `http://localhost:8080/ascensores?idAscensor=${id}`;
    let options = {
        method: 'DELETE'
    }

    try {
        const res = await fetch(url, options);

        if( !res.ok ){
            throw new Error(`Error! status: ${res.status}`);
        }

    } catch (err) {
        console.log('DELETE Request fallida');
    }

}

const generarOpciones = (pisos) => {
    const target = document.getElementById('selectPisos');
    let options = '';
    console.log(select)
    
    for (let i = 0; i < pisos; i++) {
        options += `<option value="${i}">${i}</option>`;
    }
    target.innerHTML = options;
}

window.eliminarAscensor = (id) => {
    
    deleteAscensor(id);

    cargarTabla();
}

cargarTabla();

getAscensores();

var select = document.querySelector('#selectPisos');
select && select.addEventListener('change', generarOpciones(25));

document.querySelector('#formAscensor').addEventListener('submit', agregarAscensor);