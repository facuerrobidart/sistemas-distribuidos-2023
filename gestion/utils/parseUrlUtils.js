import servicioPermisos from '../permisos/index.js';

const parseUrlAscensores = (url) => {
    const urlParts = url.split('/');
    const lastItem = urlParts[urlParts.length - 1];

    return {
        idAscensor: (lastItem === 'ascensores') ? undefined : lastItem
    }
}

const parseUrlVisitantes = (url) => {
    const urlParts = url.split('/');
    const lastItem = urlParts[urlParts.length - 1];

    return {
        idVisitante: (lastItem === 'visitantes') ? undefined : lastItem
    }
}

const parseUrlPermisos = (url) => {

    const urlParts = url.split('/');

    const ScndLastItem = urlParts[urlParts.length - 2];
    const thirdLastItem = urlParts[urlParts.length-3];

    //http://endpoint.host/visitantes/<id visitante>/<piso>/permisos

    //http://endpoint.host/visitantes/<id visitante>/permisos

    if (thirdLastItem === 'visitantes') {
        return {   
                piso:undefined,
                idVisitante: ScndLastItem
            }
        } else { //caso del delete
            return {
                piso: ScndLastItem,
                idVisitante: thirdLastItem}
        }

}

export {
    parseUrlAscensores,
    parseUrlVisitantes,
    parseUrlPermisos
}