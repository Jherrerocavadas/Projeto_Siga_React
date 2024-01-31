import "../styles/GradeHorarioStyle.css"
import { CabecalhoAula } from "../Components/CabecalhoAula"
import { GridHorarioAulas, GridDisciplinas } from "../Components/GridAulas"
import { SelecaoMateriaField } from "../Components/SelecaoMateriaField"
import { useEffect, useState } from "react";
import { getLabelsDiasSemana } from "../utils/utils";
import { getLabelsHorarioAula } from "../utils/HorarioAula/horarioAulaController";
import { listarDisciplinasPorCurso } from "../utils/DisciplinaCurso/disciplinaController";
import OptionsMenu from "../Components/OptionsMenu";

export function Matricula({ }) {
//Vão vir do cadastro do usuário
  const [periodo, setPeriodo] = useState("MANHA"); //Enum Periodo
  const horarioUsuario = "Manhã"; //Enum Periodo.getnomePeriodo Só pra ficar bonitinho a label
  const siglaCurso = "DMD"
  const codFaculdade = "FAT128"
  const [semestre, setSemestre] = useState(4)
  
  const [diasSemana, setDiasSemana] = useState([{"valor":"Segunda","cod":"SEGUNDA"},{"valor":"Terça","cod":"TERCA"},{"valor":"Quarta","cod":"QUARTA"},{"valor":"Quinta","cod":"QUINTA"},{"valor":"Sexta","cod":"SEXTA"},{"valor":"Sábado","cod":"SABADO"}])
  const [horarioAula, setHorarioAula] = useState(["7h40 - 8h30", "8h30 - 9h20", "9h20 - 9h30", "9h30 - 10h20", "10h20 - 11h10", "11h10 - 11h20", "11h20 - 12h10", "12h10 - 13h00"])
  const [disciplinasCursos, setDisciplinasCursos] = useState([
    {
      "id": 1,
      "faculdade": {
        "id": 1,
        "codFaculdade": "FAT128",
        "nomeFaculdade": "Fatec Carapicuíba",
        "siglaFaculdade": "FAT128",
        "cidade": "Carapicuíba",
        "endereco": "Rua Francisco Pignatari"
      },
      "curso": {
        "id": 1,
        "nomeCurso": "Design de Mídias Digitais",
        "siglaCurso": "DMD",
        "qtdSemestres": 6
      },
      "disciplina": {
        "id": 0,
        "codDisciplina": "",
        "nomeDisciplina": "",
        "siglaDisciplina": "",
        "quantidadeAulas": 0,
        "isDisciplinaEspecial": false,
        "corDisciplina": ""
      },
      "horasAula": [
        {
          "id": 0,
          "periodo": "",
          "numeroAula": 0,
          "inicioAula": "",
          "fimAula": "",
          "isIntervalo": false
        }
      ],
      "semestre": 0,
      "diasDeAula": [
        ""
      ]
    }
  ])

  const [disciplinas, setDisciplinas] = useState([{
    "id": 0,
    "codDisciplina": "",
    "nomeDisciplina": "",
    "siglaDisciplina": "",
    "quantidadeAulas": 0,
    "isDisciplinaEspecial": false,
    "corDisciplina": ""
  },])

  const curso = {qtdSemestres: 6} // puxar do curso (pelo siglaCurso)


  const dropdownSemestre = []

  
  for (let semestre = 1; semestre <= curso.qtdSemestres; semestre++) {
    dropdownSemestre.push(
      {label: `${semestre}°Semestre`, value: semestre, callbackText: `Semestre alterado para ${semestre}º Semestre! `},
    )
    
  }




  const dropdownPeriodo = [
    {label: "Manhã", value: "MANHA", callbackText: "Período alterado para Manhã! "},
    {label: "Tarde", value: "TARDE", callbackText: "Período alterado para Tarde! "},
    {label: "Noite", value: "NOITE", callbackText: "Período alterado para Noite! "},
  ]




  const funcionalidades = [
    // {type: "Button", key: "btn001", label: "Semestre:", value: semestre, action: setSemestre, callbackText: "Alteração de semestre concluída!"},
    // {type: "Button", key: "btn002", label: "Periodo:", value: periodo, action: setPeriodo, callbackText: "Alteração de Período concluída!"},
    {type: "Dropbox", key: "dpb001", label: "Selecione o Semestre:", value: dropdownSemestre, action: setSemestre, callbackText: "Alteração de Período concluída!"},
    {type: "Dropbox", key: "dpb002", label: "Selecione o Periodo:", value: dropdownPeriodo, action: setPeriodo, callbackText: "Alteração de Período concluída!"},

  ]


 

  // var disciplinas = []

  useEffect(() => {
    getLabelsDiasSemana().then((response) => {
      setDiasSemana(response)
    }).catch((error) => {
      console.log("Erro ao criar grid de aulas: " + error)
    })
  }, {})


  useEffect(() => {
    getLabelsHorarioAula(periodo).then((response) => {
      setHorarioAula(response)
    }).catch((error) => {
      console.log("ErroLabelsHorarioAula: " + error)
    })
  }, {periodo})

  useEffect(() => {
    listarDisciplinasPorCurso(false, siglaCurso, codFaculdade).then((response) => {
      setDisciplinasCursos(response)
      var tempDisciplinas = []
      response.forEach(disciplinaCurso => {
        tempDisciplinas.push(disciplinaCurso.disciplina) 
        console.warn(tempDisciplinas)
      });
      setDisciplinas(tempDisciplinas)
           
    }).catch((error) => {
      console.log("Erro setar disciplinas Cursos: " + error)
    })
  }, {})
  
  // Estrutura da tela

  /*
  container
    OptionsMenu (Só se tiver vendo o horário de aula fixo por semestre/período)
    Cabeçalho (Horário - {periodo.getNomePeriodo}, Segunda, Terça, ...) -> OK
    LabelHorariosAula (7h40-8h30, ...) -> OK
    GridHorarioAula (Matemática Discreta, IA, ...) Vai retornar a matéria que o usuário tem cadastrado para aquele horário. -> Andando
  
    GridDisciplinas (Matricula) (Matemática Discreta, IA, ...) Vai ser clicável, permitindo ao usuário setar a matéria.
    Se setar uma matéria, deve setar automáticamente essa matéria para os outros dias também

    SelecaoMateriaField (Matricula) -> Vai conter as matérias so dia que o usuário selecionou, permitindo que
    ele se matricule nela para o dia.

    Também terá as matérias especiais, onde ao clicar, ele já registra na matrícula automático
  
  */


  return (

    <div class="container">
      
      <OptionsMenu
      funcionalidades={funcionalidades}/>

      

      <CabecalhoAula horarioUsuario={horarioUsuario}
      diasSemana={diasSemana}/>

      <div class="container_columns" style={{ display: "inline-flex" }}>
        <GridHorarioAulas labelsHorarioAula={horarioAula} />



        <GridDisciplinas
        diaDisciplina={diasSemana}
        qtdAulasDias={horarioAula.length}
        disciplinas={disciplinasCursos}
        semestre={semestre}/>
      </div>

      <SelecaoMateriaField disciplinas={disciplinas}/>

    </div>



  )

}