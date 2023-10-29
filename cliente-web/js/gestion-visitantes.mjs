'use strict'

import { getRequest, postRequest, putRequest, deleteRequest } from '../../gestion/utils/httpRequestUtils.js';
import {modalWindow} from '../../gestion/utils/modalWindowUtil.js';

const cuerpoTabla = document.querySelector('#cuerpo-tabla-visitantes'); 

const cargarTabla = async () => {

    const path = '/visitantes';

    const visitantes = await getRequest(path);

    let tableContent = '';

    visitantes.map( (v) => {
    
        const fila = `
                    <tr>
                        <td>${v.id}</td>
                        <td>${v.nombre}</td>
                        <td>${v.edad}</td>
                        <td>${v.email}</td>
                        <td>${v.pisos_permitidos}</td>
                        <td>${v.fecha_checkIn}</td>
                        <td>${v.fecha_checkOut}</td>
                        <td class="table-actions">
                            <div>
                                <button id="btn-edit" onclick="actualizarVisitante('${v.id}')">
                                    <i class="fa-solid fa-pencil"></i> 
                                </button>
                            </div>
                            <div>
                                <button id="btn-remove" onclick="eliminarVisitante('${v.id}')">
                                    <i class="fa-regular fa-circle-xmark"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`;

        tableContent += fila;

    } )
    
    cuerpoTabla.innerHTML = tableContent;
};

const crearVisitante = (event) => {

    event.preventDefault();

    let nombre = document.querySelector('#nombre').value;
    let edad = document.querySelector('#edad').value;
    let email = document.querySelector('#email').value;
    let selectionPisos = document.querySelector('#selectPisos');

    //TODO: logica para fechas
    let fecha_checkIn = document.querySelector('#');
    let fecha_checkOut = document.querySelector('#');

    let pisos_permitidos = selectPisos(selectionPisos);

    let visitante = {
        id: null,
        nombre,
        edad,
        email,
        pisos_permitidos,
        fecha_checkIn,
        fecha_checkOut
    };

    const path = '/visitantes';

    postRequest(path, visitante);

    cargarTabla();
}


window.actualizarVisitante = (id) => {

    modalWindow();

    //TODO: extraer values de la ventana modal
    let nombre = document.querySelector('#nombre').value;
    let edad = document.querySelector('#edad').value;
    let email = document.querySelector('#email').value;
    let selectionPisos = document.querySelector('#selectPisos');

    //TODO: logica para fechas
    let fecha_checkIn = document.querySelector('#');
    let fecha_checkOut = document.querySelector('#');

    let pisos_permitidos = selectPisos(selectionPisos);

    let visitante = {
        id,
        nombre,
        edad,
        email,
        pisos_permitidos,
        fecha_checkIn,
        fecha_checkOut
    };

    const path = '/visitantes';

    putRequest(path, visitante);

    cargarTabla();
}

window.eliminarVisitante = (id) => {
    
    const path = '/visitantes?idVisitante';
    
    deleteRequest(path, id);

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

document?.querySelector('#formVisitante').addEventListener('submit', crearVisitante);

cargarTabla();

getRequest('/visitantes');


