import { api } from "../utils";


export const disciplinaCursoPlaceholder = [
    {
      id: 1,
      faculdade: {
        "id": 1,
        "codFaculdade": "FAT128",
        "nomeFaculdade": "Fatec Carapicuíba",
        "siglaFaculdade": "FAT128",
        "cidade": "Carapicuíba",
        "endereco": "Rua Francisco Pignatari"
      },
      curso: {
        "id": 1,
        "nomeCurso": "Design de Mídias Digitais",
        "siglaCurso": "DMD",
        "qtdSemestres": 6
      },
      disciplina: {
        "id": 0,
        "codDisciplina": "",
        "nomeDisciplina": "",
        "siglaDisciplina": "",
        "quantidadeAulas": 0,
        "isDisciplinaEspecial": false,
        "corDisciplina": ""
      },
      horasAula: [
        {
          "id": 0,
          "periodo": "",
          "numeroAula": 0,
          "inicioAula": "",
          "fimAula": "",
          "isIntervalo": false
        }
      ],
      semestre: 0,
      "diasDeAula": [
        ""
      ]
    }
  ]
  
export async function listarDisciplinasPorCurso(isPesquisaPorNomeCompleto, curso, faculdade) {

    if(isPesquisaPorNomeCompleto){
        return api.get(`/disciplinasCursos/cursos/${curso}`)
    .then(async (response)=>
            {
                
               return response.data     
            })
            .catch((error)=>{
                
                console.error("Listagem Disciplina por curso: " + error)
                return disciplinaCursoPlaceholder
            })

    }

    return api.get(`/disciplinasCursos/cursos?siglaCurso=${curso}&codFaculdade=${faculdade}`)
    .then(async (response)=>
            {
                
               return response.data     
            })
            .catch((error)=>{
                console.error("Listagem Disciplinas por cursos e Faculdade: " + error)
                return disciplinaCursoPlaceholder
            })

    
}
