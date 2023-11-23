import express from "express";
import { PasoReq } from "./requests.js"
const app = express();
app.use(express.json())

const puertoVisitantes = 8002;
const puertoAscensores = 8001;
const puertoPermisos = 8003;
const PUERTO_GATEWAY = 8004;

app.get("/ascensores", (req, res) => {
    const url = "/ascensores";

    PasoReq(puertoAscensores, url, "GET", null, (error, responseBody) => {
        manejarError(res, responseBody, error);
    })
});

app.get("/ascensores/:idAscensor", (req, res) => {
    const idAscensor = req.params.idAscensor;
    const url = `/ascensores/${idAscensor}`;

    PasoReq(puertoAscensores, url, "GET", null, (error, responseBody) => {
        manejarError(res, responseBody, error);
    })
});

app.post("/ascensores", (req, res) => { 
    const body = JSON.stringify(req.body);
    const url = "/ascensores";

    PasoReq(puertoAscensores, url, "POST", body, (error, responseBody) => {
        manejarError(res, responseBody, error);
    })
});

app.put("/ascensores", (req, res) => {
    const body = JSON.stringify(req.body);
    const url = "/ascensores";

    PasoReq(puertoAscensores, url, "PUT", body, (error, responseBody) => {
        manejarError(res, responseBody, error);
    })
})

app.delete("/ascensores/:idAscensor", (req, res) => {
    const idAscensor = req.params.idAscensor;
    const url = `/ascensores/${idAscensor}`;

    PasoReq(puertoAscensores, url, "DELETE", null, (error, responseBody) => {
        manejarError(res, responseBody, error);
    })
});

app.get("/visitantes", (req, res) => {
    const url = "/visitantes";

    PasoReq(puertoVisitantes, url, "GET", null, (error, responseBody) => {
        manejarError(res, responseBody, error);
    })
});

app.get("/visitantes/:idVisitante", (req, res) => {
    const idVisitante = req.params.idVisitante;
    const url = `/visitantes/${idVisitante}`;

    PasoReq(puertoVisitantes, url, "GET", null, (error, responseBody) => {
        manejarError(res, responseBody, error);
    })
});

app.post("/visitantes", (req, res) => {
    const body = JSON.stringify(req.body);
    const url = "/visitantes";

    PasoReq(puertoVisitantes, url, "POST", body, (error, responseBody) => {
        manejarError(res, responseBody, error);
    })
});

app.put("/visitantes", (req, res) => {
    const body = JSON.stringify(req.body);
    const url = `/visitantes`;

    PasoReq(puertoVisitantes, url, "PUT", body, (error, responseBody) => {
        manejarError(res, responseBody, error);
    })
});

app.delete("/visitantes/:idVisitante", (req, res) => {
    const idVisitante = req.params.idVisitante;
    const url = `/visitantes/${idVisitante}`;

    PasoReq(puertoVisitantes, url, "DELETE", null, (error, responseBody) => {
        manejarError(res, responseBody, error);
    })
});

app.get("/visitantes/:idVisitante/permisos", (req, res) => {
    const idVisitante = req.params.idVisitante;
    const url = `/visitantes/${idVisitante}/permisos`;

    PasoReq(puertoPermisos, url, "GET", null, (error, responseBody) => {
        manejarError(res, responseBody, error);
    })
});

app.put("/visitantes/:idVisitante/permisos", (req, res) => {
    const idVisitante = req.params.idVisitante;
    const body = JSON.stringify(req.body);
    const url = `/visitantes/${idVisitante}/permisos`;

    PasoReq(puertoPermisos, url, "PUT", body, (error, responseBody) => {
        manejarError(res, responseBody, error);
    })
});



const manejarError = (res, body, error) => {
    if (error) {
        return res.end(error);
    } else {
        return res.end(body)
    }
}



app.listen(PUERTO_GATEWAY, () => {
    console.log(`API Gateway express iniciada en el puerto ${PUERTO_GATEWAY}`);
});