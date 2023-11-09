'use strict'

import { getRequest, postRequest, putRequest, deleteRequest } from '../../gestion/utils/httpRequestUtils.js';

const cuerpoTabla = document.querySelector('#cuerpo-tabla-permisos'); 
const select = document.querySelector('#select-visitantes-permisos')

const cargarTabla = async () => {

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

    select.innerHTML=selectContent;
    cuerpoTabla.innerHTML = tableContent;
};

window.actualizarPisos = (id) => {


    document?.querySelector('#formPermisos').addEventListener('submit', function(event) {

        event.preventDefault();
        if(id!== ''){
             let nombre = document.querySelector('#nombre').value;
             let selectionPisos = document.querySelector('#selectPisosPermisos');
             let pisos_permitidos = selectPisos(selectionPisos);
             let body = {
                 pisos_permitidos:pisos_permitidos
                };

            const path = `/visitantes/${id}/permisos`;

            putRequest(path, body);

            cargarTabla();

        }
     });
    
}

cargarTabla();