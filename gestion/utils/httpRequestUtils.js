const urlGateway = 'http://localhost:8000';

const getRequest = async (path) => {
    let url = `${urlGateway}${path}`;

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

const postRequest = async (path, item) => {
    let url = `${urlGateway}${path}`;
    let options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept':'application/json' 
        },
        body: JSON.stringify(item)
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

const putRequest = async (path, item) => {

    let url = `${urlGateway}${path}`;
    let options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Accept':'application/json' 
        },
        body: JSON.stringify(item)
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

const deleteRequest = async (path, id) => {

    let url = `${urlGateway}${path}/${id}`;
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
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
}