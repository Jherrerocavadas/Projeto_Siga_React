import React, { useEffect, useState } from 'react'

import "../styles/GradeHorarioStyle.css"

import { getLabelsHorarioAula } from '../utils/HorarioAula/horarioAulaController';
import { MateriaField } from './MateriaField';
import { getLabelsDiasSemana } from '../utils/utils';




//Vai montar o texto do horário das aulas de acordo com o período que o aluno estuda
export const GridHorarioAulas = ({ labelsHorarioAula }) => {

  // const [labelsHorarioAula, setLabelsHorarioAula] = useState([])

  // useEffect(() => {
  //   getLabelsHorarioAula(periodo).then((response) => {
  //     setLabelsHorarioAula(response)
  //   }).catch((error) => {
  //     console.log("ErroLabelsHorarioAula: " + error)
  //   })
  // }, {})


  if (labelsHorarioAula == null || labelsHorarioAula == undefined || labelsHorarioAula.length == 0) {
    return (
      <div>
        <p class="hora_aula"></p>
        <p class="hora_aula"></p>
        <p class="hora_aula"></p>
        <p class="hora_aula"></p>
        <p class="hora_aula"></p>
        <p class="hora_aula"></p>
        <p class="hora_aula"></p>
        <p class="hora_aula"></p>
      </div>
    )
  }

  if (labelsHorarioAula != null || labelsHorarioAula != undefined || labelsHorarioAula?.length > 0) {

    labelsHorarioAula.forEach(horarioAula => {
      if (horarioAula.isIntervalo) {
        horarioAula.label = "Intervalo"
      }
    });

    return (
      <div>
        {labelsHorarioAula.map((value, index) =>
          <MateriaField
            key={index}
            label={value.label}
          />)}
      </div>
    )
  }

}


// Vai criar o grid das disciplinas, puxando as disciplinas que o aluno tem cadastrada (visualização da grade do aluno)
export function GridDisciplinas({ diaDisciplina, disciplinas }) { 
  //cria todo o mapeamento do dia (vertical), depois cria as linhas (horizontal)
  return (
    diaDisciplina.map((value, index) =>
      <ColunaDiaAula 
      idColuna={value}//Dia da semana
      disciplinas={disciplinas}/>
    )

  )
}


// Cria a coluna de aulas de determinado dia (Aulas cadastradas).
// O identificador de cada campo da coluna é o dia da semana da coluna + a posição do identificador
export const ColunaDiaAula = ({idColuna, disciplinas}) => {

  //[
    //   {
    //     id: 1,
    //     faculdade: {
    //       id: 1,
    //       codFaculdade: "FAT128",
    //       nomeFaculdade: "Fatec Carapicuíba",
    //       siglaFaculdade: "FAT128",
    //       cidade: "Carapicuíba",
    //       endereco: "Rua Francisco Pignatari",
    //     },
    //     curso: {
    //       id: 1,
    //       nomeCurso: "Design de Mídias Digitais",
    //       siglaCurso: "DMD",
    //       qtdSemestres: 6,
    //     },
    //     disciplina: {
    //       id: 1,
    //       codDisciplina: "MAT001",
    //       nomeDisciplina: "Matemática Discreta",
    //       siglaDisciplina: "MD",
    //       quantidadeAulas: 4,
    //       isDisciplinaEspecial: false,
    //     },
    //     horaAula1: {
    //       id: 1,
    //       periodo: "MANHA",
    //       numeroAula: 1,
    //       inicioAula: "7h40",
    //       fimAula: "8h30",
    //       isIntervalo: false,
    //     },
    //     horaAula2: {
    //       id: 2,
    //       periodo: "MANHA",
    //       numeroAula: 2,
    //       inicioAula: "8h30",
    //       fimAula: "9h20",
    //       isIntervalo: false,
    //     },
    //     horaAula3: {
    //       id: 4,
    //       periodo: "MANHA",
    //       numeroAula: 4,
    //       inicioAula: "9h30",
    //       fimAula: "10h20",
    //       isIntervalo: false,
    //     },
    //     horaAula4: {
    //       id: 5,
    //       periodo: "MANHA",
    //       numeroAula: 5,
    //       inicioAula: "10h20",
    //       fimAula: "11h10",
    //       isIntervalo: false,
    //     },
    //     semestre: 1,
    //     diaDaSemana: "SEGUNDA",
    //   },
    // ];
  

  
  return (
   <div>
     {disciplinas.map((value, index) =>
        <MateriaField
          key={idColuna + index}
          label={value.disciplina.nomeDisciplina.length > 12? value.disciplina.siglaDisciplina: value.disciplina.nomeDisciplina} />
      )}
   </div>
  )
}





// Vai criar o grid das disciplinas, puxando as disciplinas que o aluno tem disponível para matricular
// No caso da visualização da Hora_Aula do aluno, vai puxar as disciplinas que o aluno já tem cadastrado
export function GridDisciplinasMatricula({ diaDisciplina, periodos }) { 
  //cria todo o mapeamento do dia (vertical), depois cria as linhas (horizontal)
  return (
    diaDisciplina.map((value, index) =>
      <ColunaDiaAula 
      idColuna={value}//Dia da semana
      periodos={periodos}/>
    )

  )
}


// Cria a coluna de aulas de determinado dia.
// O identificador de cada campo da coluna é o dia da semana da coluna + a posição do identificador
export const ColunaDiaAulaMatricula = ({idColuna, periodos}) => {
  return (
   <div>
     {periodos.map((value, index) =>
        <MateriaField
          key={idColuna + index}
          label={value.label} />
      )}
   </div>
  )
}

