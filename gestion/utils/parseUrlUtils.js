const parseUrlAscensores = (url) => {

    const urlParts = url.split('/');

    const lastItem = urlParts[urlParts.length - 1];

    return {
        idAscensor: (lastItem === 'ascensores')? undefined : lastItem
    }
}

const parseUrlVisitantes = (url) => {

    const urlParts = url.split('/');

    const lastItem = urlParts[urlParts.length - 1];

    return {
        idVisitante: (lastItem === 'visitantes')? undefined : lastItem
    }
}

const parseUrlPermisos = (url) => {

    const urlParts = url.split('/');

    const lastItem = urlParts[urlParts.length - 1];
    const ScndLastItem = urlParts[urlParts.length - 2];

    //http://endpoint.host/visitantes
    //http://endpoint.host/visitantes/<id visitante>
    //http://endpoint.host/visitantes/<id visitante>/<piso>

    if( lastItem === 'visitantes' ){
        
        return {
            idVisitante: undefined,
            piso: undefined
        }

    } else if ( ScndLastItem === 'visitantes' ) {

        return {
            idVisitante: lastItem,
            piso: undefined
        }
    
    } else {

        return {
            idVisitante: ScndLastItem,
            piso: lastItem
        }

    }

}

export {
    parseUrlAscensores,
    parseUrlVisitantes,
    parseUrlPermisos
}