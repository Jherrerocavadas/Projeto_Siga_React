import "../styles/GradeHorarioStyle.css"
import { CabecalhoAula } from "../Components/CabecalhoAula"
import { GridHorarioAulas, GridDisciplinas, GridDisciplinasMatricula } from "../Components/GridAulas"
import { MateriasEspeciaisField, SelecaoMateriaField } from "../Components/SelecaoMateriaField"
import React, { useEffect, useState } from "react";
import { diasSemanaPlaceholder, getLabelsDiasSemana } from "../utils/utils";
import { getLabelsHorarioAula, horarioAulaPlaceholder } from "../utils/HorarioAula/horarioAulaController";
import { listarDisciplinasPorCurso } from "../utils/DisciplinaCurso/disciplinaCursoController";
import OptionsMenu from "../Components/OptionsMenu";


function realizarMatriculaAluno(aluno, disciplinas, setMatriculaConfirmada) {

  setMatriculaConfirmada(true)
  
}



export function Matricula({ }) {
//Vão vir do cadastro do usuário

  /* ---------------------------------------------<Dados Mockados>--------------------------------------------- */
  const [periodo, setPeriodo] = useState({ value: "Manhã", cod: "MANHA" }); //Enum Periodo
  // const siglaCurso = "DMD" //Puxar do cadastro do aluno ou da seleção
  const codFaculdade = "FAT128" //puxar do cadastro do aluno ou da seleção
  const [semestre, setSemestre] = useState(1) //puxar do período selecionado
  const curso = { siglaCurso: "DMD", qtdSemestres: 6 } // puxar do curso (pelo siglaCurso) 
  const aluno = null;

  /*------------------------------------------------------------------------------------------------------------*/


  const [diasSemana, setDiasSemana] = useState(diasSemanaPlaceholder)
  const [horarioAula, setHorarioAula] = useState(horarioAulaPlaceholder)
  const [disciplinasCursos, setDisciplinasCursos] = useState(null)

  const [disciplinasMatriculadas, setDisciplinasMatriculadas] = useState([])

  const [disciplinasEspeciais, setDisciplinasEspeciais] = useState(null)
  const [disciplinasParaSelecionar, setDisciplinasParaSelecionar] = useState([])
  
  const [isMatriculaPorSemestre, setIsMatriculaPorSemestre] = useState(false)

  const [isMatriculaConfirmada, setMatriculaConfirmada] = useState(false) // Confirmação de matrícula

  const dropdownSemestre = []

  
  for (let semestre = 1; semestre <= curso.qtdSemestres; semestre++) {
    dropdownSemestre.push(
      { label: `${semestre}°Semestre`, value: semestre, callbackText: `Semestre alterado para ${semestre}º Semestre! ` },
    )

  }

  const dropdownPeriodo = [
    { label: "Manhã", value: 0, callbackText: "Período alterado para Manhã! ", object: { value: "Manhã", cod: "MANHA" } },
    { label: "Tarde", value: 1, callbackText: "Período alterado para Tarde! ", object: { value: "Tarde", cod: "TARDE" } },
    { label: "Noite", value: 2, callbackText: "Período alterado para Noite! ", object: { value: "Noite", cod: "NOITE" } },
  ]
  
  const funcionalidades = [
    { type: "Dropbox", key: "dpb001", label: "Selecione o Semestre: ", value: dropdownSemestre, action: setSemestre, callbackText: "Alteração de Período concluída!", disabled: !isMatriculaPorSemestre},
    { type: "Button",
     key: "btn001",
     label: "Matrícula por semestre: ",
     value: isMatriculaPorSemestre,
     action: () => {setIsMatriculaPorSemestre(!isMatriculaPorSemestre)},
     callbackText: isMatriculaPorSemestre? "Matricula por Semestre ativada!" :"Matricula por Semestre desativada" ,
     normalizedValue: isMatriculaPorSemestre? "SIM" : "NÃO",
    },
    { type: "Text", key: "txt001", label: "Curso: ", value: curso.siglaCurso},
    { type: "Text", key: "txt002", label: "Semestre: ", value: semestre?  semestre + "°": ""},

    { type: "Button",
     key: "btn002",
     label: isMatriculaConfirmada? "Matricula Confirmada!" :"Confirmar Matricula",
     value: "",
     action: disciplinasMatriculadas.length == 0? () => {realizarMatriculaAluno(aluno, disciplinasMatriculadas, setMatriculaConfirmada)} : null,
     callbackText: isMatriculaConfirmada? "Matricula Confirmada!" :"Confirmar Matricula" ,
     disabled: isMatriculaConfirmada || disciplinasMatriculadas.length == 0
    },
  ]

  /* TODO: fazer algum esquema para verificar se a API tá fora ou não, e se estiver, 
   ficar tentando de tempos em tempos chamar ela até voltar */

  useEffect(() => {
    // console.log(diasSemana)
    getLabelsDiasSemana().then((response) => {
      setDiasSemana(response)
    }).catch((error) => {
      console.log("Erro ao criar grid de aulas: " + error)
    })
  }, [])



  useEffect(() => {
    // console.log("periodo.value: " + periodo.value +  "; periodo.cod:" + periodo.cod)
    getLabelsHorarioAula(periodo.cod).then((response) => {
      setHorarioAula(response)
    }).catch((error) => {
      console.log("Erro ao receber horário de aula: " + error)
    })
  }, [periodo])

  useEffect(() => {
    listarDisciplinasPorCurso(false, curso.siglaCurso, codFaculdade).then((response) => {
      setDisciplinasCursos(response)

      var tempDisciplinasEspeciais = []
      response.forEach(disciplinaCurso => {
        if (disciplinaCurso.disciplina.isDisciplinaEspecial)
        tempDisciplinasEspeciais.push(disciplinaCurso.disciplina)
      });      
      
      setDisciplinasEspeciais(tempDisciplinasEspeciais)

    }).catch((error) => {
      console.error("Erro ao setar disciplinas Cursos: " + error)
    })
  }, [])
  
  // Estrutura da tela

  /*
  container
    OptionsMenu (Só se tiver vendo o horário de aula fixo por semestre/período)
    Cabeçalho (Horário - {periodo.getNomePeriodo}, Segunda, Terça, ...) -> OK
    LabelHorariosAula (7h40-8h30, ...) -> OK
    GridHorarioAula (Matemática Discreta, IA, ...) Vai retornar a matéria que o usuário tem cadastrado para aquele horário. -> Andando
  
    GridDisciplinas (Matricula) (Matemática Discreta, IA, ...) Vai ser clicável, permitindo ao usuário setar a matéria.
    Se setar uma matéria, deve setar automáticamente essa matéria para os outros dias também

    SelecaoMateriaField (Matricula) -> Vai conter as matérias do dia que o usuário selecionou, permitindo que
    ele se matricule nela para o dia.

    Também terá as matérias especiais, onde ao clicar, ele já registra na matrícula automático
  
  */


  return (

    <div className="container">

      <OptionsMenu
        funcionalidades={funcionalidades} />



      <CabecalhoAula horarioUsuario={periodo.value}
        diasSemana={diasSemana} />

      <div className="container_columns" style={{ display: "inline-flex" }}>
        <GridHorarioAulas labelsHorarioAula={horarioAula} />



        <GridDisciplinasMatricula
          diaDisciplina={diasSemana}
          qtdAulasDias={horarioAula.length}
          disciplinas={disciplinasCursos}
          semestre={semestre}
          disciplinasMatriculadas={disciplinasMatriculadas}
          setDisciplinasMatriculadas={setDisciplinasMatriculadas}
          setDisciplinasToSelect={setDisciplinasParaSelecionar}
          isMatriculaPorSemestre={isMatriculaPorSemestre} />
      </div>

      
 
      <SelecaoMateriaField disciplinasParaSelecionar={disciplinasParaSelecionar}/>
      <MateriasEspeciaisField
      disciplinasEspeciais={disciplinasEspeciais}/>

      

    </div>



  )

}