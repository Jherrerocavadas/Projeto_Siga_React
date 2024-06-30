import axios from "axios"

export const api = axios.create({

   
    baseURL: process.env.REACT_APP_BASE_URL // endereço de hospedagem da API (definido na variável de ambiente)
})


export const api_usuarios = axios.create({

   
    baseURL: process.env.REACT_APP_BASE_URL_AUTH // endereço de hospedagem da API (definido na variável de ambiente)
})


// export async function getLabelsDiasSemana() {
//     return api.get('/diasSemana')
//         .then(async (response) => {
          
//             return response.data
//         })
//         .catch((error) => {
//             console.log(error)
//         })


// }

export const diasSemanaPlaceholder = [{ valor: "Segunda", cod: "SEGUNDA" }, { valor: "Terça", cod: "TERCA" }, { valor: "Quarta", cod: "QUARTA" }, { valor: "Quinta", cod: "QUINTA" }, { valor: "Sexta", cod: "SEXTA" }, { valor: "Sábado", cod: "SABADO" }]


export async function getLabelsDiasSemana() {
    return api.get('/diasSemana/teste')
        .then(async (response) => {
          
            return response.data
        })
        .catch((error) => {
            console.log("Get Labels de dias da semana" + error)
            return diasSemanaPlaceholder
        })

}