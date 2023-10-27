'use strict'

import { getAscensores, postAscensor, putAscensor, deleteAscensor } from '../../gestion/utils/httpRequestUtils.js';

const cuerpoTabla = document.querySelector('#cuerpo-tabla-ascensores');

const cargarTabla = async () => {

    const ascensores = await getAscensores();

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
                                <button id="btn-edit" onclick="actualizarAscensor('${asc.id}')>
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

const crearAscensor = (event) => {

    event.preventDefault();

    let nombre = document.querySelector('#nombre').value;
    let selectionPisos = document.querySelector('#selectPisos')
    let estado = document.querySelector('#estado').value;

    let pisos = selectPisos(selectionPisos);

    let ascensor = {
        id: null,
        nombre,
        pisos,
        estado
    };

    postAscensor(ascensor);

    cargarTabla();
}


const actualizarAscensor = (event, id) => {

    event.preventDefault();

    //TODO: ventana modal para la actualizacion

    let nombre = document.querySelector('#nombre-modal').value;
    let selectionPisos = document.querySelector('#selectPisos-modal')
    let estado = document.querySelector('#estado-modal').value;

    let pisos = selectPisos(selectionPisos);

    let ascensor = {
        id,
        nombre,
        pisos,
        estado
    };

    putAscensor(ascensor);

    cargarTabla();
}

window.eliminarAscensor = (id) => {

    deleteAscensor(id);

    cargarTabla();
}


const generarOpciones = (pisos) => {
    const target = document.getElementById('selectPisos');
    let options = '';
    
    for (let i = 0; i < pisos; i++) {
        options += `<option value="${i}">${i}</option>`;
    }
    target.innerHTML = options;
}

const selectPisos = (selectionPisos) => {
    
    var collection = selectionPisos.selectedOptions;

    const pisos = collection.map( item => item.label );
    
    return pisos;   

}

var select = document.querySelector('#selectPisos');
select && select.addEventListener('change', generarOpciones(25));

document?.querySelector('#formAscensor').addEventListener('submit', crearAscensor);

cargarTabla();

getAscensores();


