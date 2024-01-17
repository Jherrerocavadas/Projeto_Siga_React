import { api } from "../utils";



export async function inserirHorarioAula(navigation, periodo, numAula, inicioAula, fimAula, isIntervalo) {
    api.post(`/horariosAula`, {
        periodo: periodo,
        numAula: numAula,
        inicioAula: inicioAula,
        fimAula: fimAula,
        isIntervalo: isIntervalo


    }).then((response) => {// Enviar dados do usuário
        alert(
            "Sucesso!",
            "Cadastro de horarioaula concluído!"
        )
        navigation.navigate('HorarioAula'); // Depois abrir o detalhe da HorarioAula
    }).catch((error) => {
        console.warn("Erro ao inserir Horário de Aula!")
        console.error(error)
        alert(
            "Erro!",
            "Não foi possível inserir um Hórario de Aula!"
        )
    })

}

export async function alterarHorarioAula({ id, periodo, numAula, inicioAula, fimAula, isIntervalo }) {

    return api.put(`/horariosaula/${parseInt(id)}`, {
        periodo: periodo,
        numAula: numAula,
        inicioAula: inicioAula,
        fimAula: fimAula,
        isIntervalo: isIntervalo

    }).then(async (response) => {// Enviar dadoo
        // console.log(request.body)
        // console.log(response.data)
        return {
            title: "Sucesso!",
            text: "Cadastro de Horário de aula atualizado!"
        }


    }).catch((error) => {
        console.warn("ERRO!")
        console.error(error)
        return {
            title: "Ops!",
            text: "Algo deu errado."
        }
    })
}

export async function buscarHorarioAula({ id }) {
    console.log(`id: ${id}`)
    return api.get(`/horariosaula/${id}`)
        .then(async (response) => {
            //Retornar os dados de busca
            return response.data
        })
        .catch(async (error) => {

            console.warn("Erro ao buscar Horario de aula!")
            console.warn(`error: ${error.code}`)


        })
}

export async function excluirHorarioAula({ id }) {
    return api.delete(`/horariosaula/${parseInt(id)}`)
        .then(async (response) => {
            return {
                title: "Sucesso!",
                text: "Cadastro de Horário de Aula excluído!"
            }


        }).catch((error) => {
            console.warn("ERRO!")
            console.error(error)
            return {
                title: "Ops!",
                text: "Algo deu errado."
            }
        })

}


export async function listarHorarioAula() {
    return api.get('/horariosAula')
        .then(async (response) => {

            return response.data
        })
        .catch((error) => {
            console.log(error)
        })

}


export async function getLabelsHorarioAula(periodo) {
    return api.get(`/horariosAula/periodos/${periodo}`)
        .then(async (response) => {
            // console.warn(response.data)
            return response.data.map((horarioAula) => {
                return {
                    isIntervalo: horarioAula.isIntervalo,
                    label: horarioAula.inicioAula + " - " + horarioAula.fimAula
                }
            })
        })
        .catch((error) => {
            console.log(error)
        })


}
