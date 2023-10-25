const cuerpoTabla = document.querySelector('#cuerpo-tabla');

const cargarTabla = async () => {

    const ascensores = await getAscensores();

    console.log(ascensores);

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

    addAscensor(ascensor);

    cargarTabla();
    
}

const addAscensor = async (ascensor) => {

    let url = 'http:/gw/ascensores';
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

// TODO: testear
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

// TODO: testear
const deleteAscensor = async (id) => {
    
    let url = `http://localhost:8083/ascensores?id=${id}`;
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

getAscensores();

document.querySelector('#formAscensor').addEventListener('submit', agregarAscensor);