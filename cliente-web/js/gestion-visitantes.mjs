import { getRequest, postRequest, putRequest, deleteRequest } from '../../gestion/utils/httpRequestUtils.js';
import {modalWindow} from '../../gestion/utils/modalWindowUtil.js';


const cuerpoTabla = document.querySelector('#cuerpo-tabla-visitantes'); 

const cargarTabla = async () => {
    let cuerpoTabla =   document.querySelector('#cuerpo-tabla-visitantes'); 
    if (cuerpoTabla) {
        cuerpoTabla.innerHTML = '';
    } else {
        cuerpoTabla = document.createElement('tbody');
        cuerpoTabla.id = 'cuerpo-tabla-visitantes';
    }

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
                        <td class="table-actions">
                            <div>
                                <button id="btn-edit" onclick="actualizarVisitante('${v.id}', '${v.fecha_checkIn}')"
                                     style="color: #007ea9;"> 
                                    <i class="fa-solid fa-pencil"></i> 
                                </button>
                            </div>
                            <div>
                                <button id="btn-remove" onclick="eliminarVisitante('${v.id}')"
                                    style="color: red;">     
                                    <i class="fa-regular fa-circle-xmark"></i>
                                </button>
                            </div>

                    <div>
                         <button id="btn-tarjeta" onclick="cargarTarjeta('${v.id}')"
                             style="color: #007ea9;"> 
                             <i class="fa-regular fa-address-card"></i>
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

    let pisos_permitidos = selectPisos(selectionPisos);

    let visitante = {
        id: null,
        nombre,
        edad,
        email,
        pisos_permitidos,
        fecha_checkIn: null
    };

    const path = '/visitantes';

    postRequest(path, visitante);

    cargarTabla();
}


window.actualizarVisitante = (id, fecha_checkIn) => {

    modalWindow();

    document?.querySelector('#formVisitantes-modal').addEventListener('submit', function(event) {

        event.preventDefault();

        let nombre = document.querySelector('#nombre-modal').value;
        let edad = document.querySelector('#edad-modal').value;
        let email = document.querySelector('#email-modal').value;
        let selectionPisos = document.querySelector('#selectPisos-modal');

        let pisos_permitidos = selectPisos(selectionPisos);

        let visitante = {
            id,
            nombre,
            edad,
            email,
            pisos_permitidos,
            fecha_checkIn
        };

        console.log(visitante);

        const path = '/visitantes';

        putRequest(path, visitante);

        cargarTabla();

    });
    
}

window.eliminarVisitante = (id) => {
    
    const path = '/visitantes';
    
    deleteRequest(path, id);

    cargarTabla();
}

const generarOpciones = (pisos) => {
    let target = document.getElementById('selectPisos'); 
    if (target) {
        target.innerHTML = '';
    } else {
        target = document.createElement('select');
        target.id = 'selectPisos';
    }  

    let options = '';
    console.log(target)
        for (let i = 0; i < pisos; i++) {
            options += `<option value="${i}">${i}</option>`;
        }
        target.innerHTML = options;
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

var select = document.querySelector('#selectPisos');
select && select.addEventListener('change', generarOpciones(25));

var selectModal = document.querySelector('#selectPisos-modal');
selectModal && selectModal.addEventListener('change', generarOpcionesModal(25));

let doc = document.querySelector('#formVisitantes');
doc && (doc.addEventListener('submit', crearVisitante));

window.addEventListener('hashchange', function() {
    if (location.hash === '#gestion-visitantes') {
        this.setTimeout(init, 100);
    }
});

const init = () => {
    cargarTabla();
}

cargarTabla();

getRequest('/visitantes');