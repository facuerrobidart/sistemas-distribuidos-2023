'use strict'

import { getRequest, postRequest, putRequest, deleteRequest } from '../../gestion/utils/httpRequestUtils.js';
import {modalWindow} from '../../gestion/utils/modalWindowUtil.js';

const cuerpoTabla = document.querySelector('#cuerpo-tabla-ascensores'); 

const cargarTabla = async () => {

    const path = '/ascensores';

    const ascensores = await getRequest(path);

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
                                <button id="btn-edit" onclick="actualizarAscensor('${asc.id}')">
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
    let estado = selectionEstado();

    let pisos = selectPisos(selectionPisos);

    let ascensor = {
        id: null,
        nombre,
        pisos,
        estado
    };

    const path = '/ascensores';

    postRequest(path, ascensor);

    cargarTabla();
}


window.actualizarAscensor = (id) => {

    modalWindow();

    //TODO: extraer values de la ventana modal
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

    const path = '/ascensores';

    putRequest(path, ascensor);

    cargarTabla();
}

window.eliminarAscensor = (id) => {
    
    const path = '/ascensores?idAscensor';
    
    deleteRequest(path,id);

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
    
    let collection = selectionPisos.selectedOptions;

    let pisos = [];

    for (var i = 0; i < collection.length; i++) {
        pisos.push(collection[i].label);
    }
    
    return pisos;   

}

const selectionEstado = () => {

    let elementoActivo = document.querySelector('input[name="estado"]:checked');
    if(elementoActivo) {
        return elementoActivo.value;
    } else {
        alert('No hay ninún elemento activo');
    }

}

var select = document.querySelector('#selectPisos');
select && select.addEventListener('change', generarOpciones(25));

document?.querySelector('#formAscensor').addEventListener('submit', crearAscensor);

cargarTabla();

getRequest('/ascensores');


