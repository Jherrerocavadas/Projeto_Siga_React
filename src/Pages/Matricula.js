import "../styles/GradeHorarioStyle.css"
import { CabecalhoAula } from "../Components/CabecalhoAula"
import { GridHorarioAulas, GridDisciplinas } from "../Components/GridAulas"
import { SelecaoMateriaField } from "../Components/SelecaoMateriaField"
import { useEffect, useState } from "react";
import { getLabelsDiasSemana } from "../utils/utils";
import { getLabelsHorarioAula } from "../utils/HorarioAula/horarioAulaController";
import { listarDisciplinasPorCurso } from "../utils/DisciplinaCurso/disciplinaController";

export function Matricula({ }) {
//Vão vir do cadastro do usuário
  const periodo = "MANHA"; //Enum Periodo
  const horarioUsuario = "Manhã"; //Enum Periodo.getnomePeriodo Só pra ficar bonitinho a label
  const siglaCurso = "DMD"
  const codFaculdade = "FAT128"
  const semestre = 4
  
  const [diasSemana, setDiasSemana] = useState([])
  const [horarioAula, setHorarioAula] = useState([])
  const [disciplinasCursos, setDisciplinasCursos] = useState([])

  const [disciplinas, setDisciplinas] = useState([])

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
  }, {})

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