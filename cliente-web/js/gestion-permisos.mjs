'use strict'

import { getRequest, putRequest } from '../../gestion/utils/httpRequestUtils.js';

const cuerpoTabla = document.querySelector('#cuerpo-tabla-permisos'); 
const selectVisitantes = document.querySelector('#select-visitantes-permisos')


const generarOpciones = (pisos) => {
    const target = document.getElementById('selectPisosPermitidos');
    let options = '';
    
    for (let i = 0; i < pisos; i++) {
        options += `<option value="${i}">${i}</option>`;
    }

    target && (target.innerHTML = options);
}

const cargarTabla = async () => {
    let cuerpoTabla = document.querySelector('#cuerpo-tabla-permisos'); 
    if (cuerpoTabla) {
        cuerpoTabla.innerHTML = '';
    } else {
        cuerpoTabla = document.createElement('tbody');
        cuerpoTabla.id = 'cuerpo-tabla-permisos';
    }


    const path = '/visitantes';

    const visitantes = await getRequest(path);

    let tableContent = '';
    let selectContent='';

    visitantes.map( (v) => {
    
        const fila = `
                    <tr>
                        <td>${v.id}</td>
                        <td>${v.nombre}</td>
                        <td>${v.pisos_permitidos}</td>
                     </tr>`;

        tableContent += fila;

        const option= ` 
         <option 
            value="${v.id}">
            ${v.nombre}
        </option>` 
        selectContent+=option;
    } )

    selectVisitantes && (selectVisitantes.innerHTML=selectContent);
    cuerpoTabla && (cuerpoTabla.innerHTML = tableContent);
};

window.actualizarPisos = () => {

    let id = document.getElementById("select-visitantes-permisos").value
    console.log("Query selector:  ",id);
        if(id && id !== ''){
             let selectionPisos = document.querySelector('#selectPisosPermisos');
             let pisos_permitidos = selectPisos(selectionPisos);
             let body = {
                 pisos_permitidos:pisos_permitidos
                };

            const path = `/visitantes/${id}/permisos`;

            putRequest(path, body);

            cargarTabla();

        }
    
    
}

const selectPisos = (selectionPisos) => {
    
    let collection = selectionPisos.selectedOptions;

    let pisos = [];

    for (var i = 0; i < collection.length; i++) {
        pisos.push(collection[i].label);
    }
    
    return pisos;   

}

generarOpciones(25);

var select = document.querySelector('#selectPisos');
select && select.addEventListener('change', generarOpciones(25));

window.addEventListener('hashchange', function() {
    if (location.hash === '#gestion-permisos') {
        this.setTimeout(init, 100);
    }
});

const init = () => {
    cargarTabla();
    //generarOpciones(25);
}


   