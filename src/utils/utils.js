import axios from "axios"

export const api = axios.create({

    baseURL: "http://192.168.0.10:8080/sae-api/api/v1"
    // baseURL: process.env.BASE_URL // endereço de hospedagem da API (definido na variável de ambiente)
})


export async function getLabelsDiasSemana() {
    return api.get('/diasSemana')
        .then(async (response) => {
          
            return response.data
        })
        .catch((error) => {
            console.log(error)
        })


}
