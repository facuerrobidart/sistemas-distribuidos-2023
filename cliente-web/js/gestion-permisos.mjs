'use strict'

import { getRequest, putRequest } from '../../gestion/utils/httpRequestUtils.js';

const generarOpcionesPermisos = (pisos) => {
    let target = document.getElementById('selectPisosPermisos');

    if (target) {
        target.innerHTML = '';
    } else {
        target = document.createElement('select');
        target.id = 'selectPisosPermisos';
    }  

    let options = '';
    
    for (let i = 0; i < pisos; i++) {
        options += `<option value="${i}">${i}</option>`;
    }

    target && (target.innerHTML = options);
}

const cargarTabla = async () => {
    let cuerpoTabla = document.querySelector('#cuerpo-tabla-permisos'); 
    let selectVisitantes = document.querySelector('#select-visitantes-permisos')

    if (cuerpoTabla && selectVisitantes) {
        cuerpoTabla.innerHTML = '';
        selectVisitantes.innerHTML = '';
    } else {
        cuerpoTabla = document.createElement('tbody');
        cuerpoTabla.id = 'cuerpo-tabla-permisos';

        selectVisitantes = document.createElement('select');
        selectVisitantes.id = 'select-visitantes-permisos';
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
    console.log("Query selector:  ", id);
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

generarOpcionesPermisos(25);

var select = document.querySelector('#selectPisos');
select && select.addEventListener('change', generarOpcionesPermisos(25));

window.addEventListener('hashchange', function() {
    if (location.hash === '#gestion-permisos') {
        window.location.reload();
        this.setTimeout(init, 100);
    }
});

const init = () => {
    cargarTabla();
    generarOpcionesPermisos(25);
}

window.generarOpcionesPermisos = generarOpcionesPermisos;

cargarTabla();
   