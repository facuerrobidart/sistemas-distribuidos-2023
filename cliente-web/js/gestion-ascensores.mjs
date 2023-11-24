'use strict'

import { getRequest, postRequest, putRequest, deleteRequest } from '../../gestion/utils/httpRequestUtils.js';
import {modalWindow} from '../../gestion/utils/modalWindowUtil.js';

const cargarTabla = async () => {
    let cuerpoTabla = document.querySelector('#cuerpo-tabla-ascensores'); 
    if (cuerpoTabla) {
        cuerpoTabla.innerHTML = '';
    } else {
        cuerpoTabla = document.createElement('tbody');
        cuerpoTabla.id = 'cuerpo-tabla-ascensores';
    }

    console.log('Cargando tabla de ascensores...');

    const path = '/ascensores';

    const ascensores = await getRequest(path);

    let tableContent = '';

    ascensores.forEach((asc) => {
        const fila = `
            <tr>
                <td>${asc.id}</td>
                <td>${asc.nombre}</td>
                <td>${asc.pisos}</td>
                <td>${asc.estado}</td>
                <td class="table-actions">
                    <div>
                        <button id="btn-edit" onclick="actualizarAscensor('${asc.id}')"
                            style="color: #007ea9;"> 
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                    </div>
                    <div>
                        <button id="btn-remove" onclick="eliminarAscensor('${asc.id}')"
                            style="color: red;"> 
                            <i class="fa-regular fa-circle-xmark"></i>
                        </button>
                    </div>
                </td>
            </tr>`;

        tableContent += fila;
    })

    console.log("tableContent");
    console.log(tableContent);
    console.log("cuerpoTabla");
    console.log(cuerpoTabla);

    cuerpoTabla.innerHTML = tableContent;
};

const crearAscensor = (event) => {

    //event.preventDefault();

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

    document?.querySelector('#formAscensor-modal').addEventListener('submit', function(event) {

        event.preventDefault();

        let nombre = document.querySelector('#nombre-modal').value;
        let selectionPisos = document.querySelector('#selectPisos-modal')
        let estado = selectionEstadoModal();

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

    });
  
}

window.eliminarAscensor = (id) => {
    
    const path = '/ascensores';
    
    deleteRequest(path,id);

    cargarTabla();
}


const generarOpciones = (pisos) => {
    const target = document.getElementById('selectPisos');
    let options = '';
    
    for (let i = 0; i < pisos; i++) {
        options += `<option value="${i}">${i}</option>`;
    }
    target && (target.innerHTML = options);
}

const generarOpcionesModal = (pisos) => {
    const target = document.getElementById('selectPisos-modal');
    let options = '';
    
    for (let i = 0; i < pisos; i++) {
        options += `<option value="${i}">${i}</option>`;
    }
    target && (target.innerHTML = options);
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

//Podria hacerse mas eficiente
const selectionEstadoModal = () => {

    let elementoActivo = document.querySelector('input[name="estado-modal"]:checked');
    if(elementoActivo) {
        return elementoActivo.value;
    } else {
        alert('No hay ninún elemento activo');
    }

}

var select = document.querySelector('#selectPisos');
select && select.addEventListener('change', generarOpciones(25));

var selectModal = document.querySelector('#selectPisos-modal');
selectModal && selectModal.addEventListener('change', generarOpcionesModal(25));

var doc = document.querySelector('#formAscensor');
doc && (doc.addEventListener('submit', crearAscensor));

window.addEventListener('hashchange', function() {
    if (location.hash === '#gestion-ascensores') {
        this.setTimeout(init, 100);
    }
});

const init = () => {
    cargarTabla();
    //generarOpciones();
}

getRequest('/ascensores');


