
const getAscensores = async () => {

    let url = 'http://localhost:8080/ascensores';

    let options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    }

    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error(`Error! status: ${res.status}`);
        }

        return await res.json();

    } catch (err) {
        console.log('GET Request fallida');
    }

}

const postAscensor = async (ascensor) => {

    let url = 'http://localhost:8080/ascensores';
    let options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept':'application/json' 
        },
        body: JSON.stringify(ascensor)
    }

    try {

        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error(`Error! status: ${res.status}`);
        }

    } catch (err) {
        console.log('POST Request fallida');
    }

}

const putAscensor = async (ascensor) => {

    let url = 'http://localhost:8080/ascensores';
    let options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Accept':'application/json' 
        },
        body: JSON.stringify(ascensor)
    }

    try {

        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error(`Error! status: ${res.status}`);
        }

    } catch (err) {
        console.log('PUT Request fallida');
    }

}

const deleteAscensor = async (id) => {

    let url = `http://localhost:8080/ascensores?idAscensor=${id}`;
    let options = {
        method: 'DELETE'
    }

    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error(`Error! status: ${res.status}`);
        }

    } catch (err) {
        console.log('DELETE Request fallida');
    }

}

export {
    getAscensores,
    postAscensor,
    putAscensor,
    deleteAscensor,
}