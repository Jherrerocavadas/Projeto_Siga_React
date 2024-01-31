import axios from "axios"

export const api = axios.create({

    baseURL: "http://192.168.0.10:8080/sae-api/api/v1"
    // baseURL: process.env.BASE_URL // endereço de hospedagem da API (definido na variável de ambiente)
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

export async function getLabelsDiasSemana() {
    return api.get('/diasSemana/teste')
        .then(async (response) => {
          
            return response.data
        })
        .catch((error) => {
            console.log(error)
        })

}


export function complementTextColor(bgColor, lightColor, darkColor) {
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
      darkColor : lightColor;
  }