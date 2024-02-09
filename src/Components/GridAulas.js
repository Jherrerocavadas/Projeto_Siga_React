import React, { useEffect, useState } from "react";

import "../styles/GradeHorarioStyle.css";

import { getLabelsHorarioAula } from "../utils/HorarioAula/horarioAulaController";
import { MateriaField } from "./MateriaField";
import { getLabelsDiasSemana } from "../utils/utils";

//Vai montar o texto do horário das aulas de acordo com o período que o aluno estuda
export function GridHorarioAulas({ labelsHorarioAula }) {
  // const [labelsHorarioAula, setLabelsHorarioAula] = useState([])

  // useEffect(() => {
  //   getLabelsHorarioAula(periodo).then((response) => {
  //     setLabelsHorarioAula(response)
  //   }).catch((error) => {
  //     console.log("ErroLabelsHorarioAula: " + error)
  //   })
  // }, {})

  // if (
  //   labelsHorarioAula == null ||
  //   labelsHorarioAula == undefined ||
  //   labelsHorarioAula == []
  // ) {
  //   return (
  //     <div>
  //       <p class="hora_aula"></p>
  //       <p class="hora_aula"></p>
  //       <p class="hora_aula"></p>
  //       <p class="hora_aula"></p>
  //       <p class="hora_aula"></p>
  //       <p class="hora_aula"></p>
  //       <p class="hora_aula"></p>
  //       <p class="hora_aula"></p>
  //     </div>
  //   );
  // }

  if (
    labelsHorarioAula != null ||
    labelsHorarioAula != undefined ||
    labelsHorarioAula != []
  ) {
    labelsHorarioAula.forEach((horarioAula) => {
      if (horarioAula.isIntervalo) {
        horarioAula.label = "Intervalo";
      }
    });

    return (
      <div>
        {labelsHorarioAula.map((value, index) => (
          <MateriaField key={index} label={value.label} />
        ))}
      </div>
    );
  }
};

// Vai criar o grid das disciplinas, puxando as disciplinas que o aluno tem cadastrada (visualização da grade do aluno)
export function GridDisciplinas({
  diaDisciplina,
  qtdAulasDias,
  disciplinas,
  semestre,
}) {
  //cria todo o mapeamento do dia (vertical), depois cria as linhas (horizontal)
  return (
    //ColunaDiaAula vai criar a div de colunas
    diaDisciplina.map((value, index) => (
      <ColunaDiaAula
        // idColuna={value.toUpperCase()}//Dia da semana
        idColuna={value.cod} //Dia da semana
        qtdAulasDias={qtdAulasDias}
        disciplinas={disciplinas}
        semestre={semestre}
      />
    ))
  );
}

//Verifica se um campo de um objeto dentro de um array é igual a algum valor
function verifyArrObj(arr, key, value) {
  if (arr.length > 0) {
    var comparations = [];
    arr.forEach((obj) => {
      // console.log("OBJ: "+ obj[key] + "; value: " + value + "; comp: " + (obj.numeroAula == value))

      comparations.push(obj[key] == value);
    });
    // console.log(comparations.includes(true))
    return comparations.includes(true);
  }
  return false;
}

// Cria a coluna de aulas de determinado dia (Aulas cadastradas).
// O identificador de cada campo da coluna é o dia da semana da coluna + a posição do identificador
export function ColunaDiaAula({
  idColuna,
  qtdAulasDias,
  disciplinas,
  semestre,
}) {
  if (disciplinas != [] && disciplinas !== null && disciplinas !== undefined) {

    var disciplinasComHoraAula = [];

    disciplinas.forEach((disciplinaCurso) => {
      if (!disciplinaCurso.disciplina.isDisciplinaEspecial) {
        disciplinasComHoraAula.push(disciplinaCurso);
      }
    });

    var materiasField = [];

    for (let linhasAula = 1; linhasAula <= qtdAulasDias; linhasAula++) {
      var label = "";
      var bgColor = "#0000ff";

      if (linhasAula == 3 || linhasAula == 6) {
        label = "Intervalo";
      } else {
        disciplinasComHoraAula.map((value, index) => {
          if (
            value.diasDeAula.includes(idColuna) &&
            verifyArrObj(value.horasAula, "numeroAula", linhasAula) &&
            value.semestre == semestre
          ) {
            label =
              value.disciplina.nomeDisciplina.length > 12
                ? value.disciplina.siglaDisciplina
                : value.disciplina.nomeDisciplina;
            bgColor =
              value.disciplina.corDisciplina != null &&
                value.disciplina.corDisciplina != undefined
                ? value.disciplina.corDisciplina
                : bgColor;
          }
        });
      }

      materiasField.push(
        <MateriaField
          key={idColuna + linhasAula}
          label={label}
          bgColor={bgColor}
        />
      );
    }
    return (
      <div>
        {materiasField}
        {/* <LinhasAulas
       idColuna={idColuna}></LinhasAulas> */}
      </div>
    );
  }
}

// Vai criar o grid das disciplinas, puxando as disciplinas que o aluno tem disponível para matricular
// No caso da visualização da Hora_Aula do aluno, vai puxar as disciplinas que o aluno já tem cadastrado
export function GridDisciplinasMatricula({ diaDisciplina, qtdAulasDias, disciplinas, semestre,
  disciplinasSelected, setDisciplinasToSelect }) {
  //cria todo o mapeamento do dia (vertical), depois cria as linhas (horizontal)

  //cria todo o mapeamento do dia (vertical), depois cria as linhas (horizontal)
  return (
    //ColunaDiaAula vai criar a div de colunas
    diaDisciplina.map((value, index) => (
      <ColunaDiaAulaMatricula
        // idColuna={value.toUpperCase()}//Dia da semana
        idColuna={value.cod} //Dia da semana
        qtdAulasDias={qtdAulasDias}
        disciplinas={disciplinas}
        semestre={semestre}
        disciplinasSelected={disciplinasSelected}
        setDisciplinasToSelect={setDisciplinasToSelect}
      />
    ))
  );
}



// Cria a coluna de aulas de determinado dia.
// O identificador de cada campo da coluna é o dia da semana da coluna + a posição do identificador
export function ColunaDiaAulaMatricula({ idColuna,
  qtdAulasDias,
  disciplinas,
  semestre,
  disciplinasSelected,
  setDisciplinasToSelect
}) {

  function handleDisciplinasToSelect(value) {
    if (setDisciplinasToSelect) {
      setDisciplinasToSelect(null)//zerar o array
      console.log("Value: "+ value)
      setDisciplinasToSelect(value)
      // alert("disciplinas Selecionadas!");
    }
    else {
      alert("Sem ação para realizar!");
    }
  }




  function mapDisciplinasPorCampo(disciplinas, linhasAula, isMatriculaPorSemestre = false) {

    let disciplinasToSelect = []
    disciplinas.map((value, index) => {

      let matriculaPorSemestreExpression = isMatriculaPorSemestre == true ? value.semestre == semestre : value.semestre
      if (
        value.diasDeAula.includes(idColuna) &&
        verifyArrObj(value.horasAula, "numeroAula", linhasAula) &&
        matriculaPorSemestreExpression
      ) {
        label = value.disciplina.nomeDisciplina.length > 12
            ? value.disciplina.siglaDisciplina
            : value.disciplina.nomeDisciplina;
        bgColor = value.disciplina.corDisciplina != null &&
            value.disciplina.corDisciplina != undefined
            ? value.disciplina.corDisciplina
            : bgColor;

        disciplinasToSelect.push(
          <MateriaField
            key={value.disciplina.codDisciplina}
            label={label}
            bgColor={bgColor}
            isClickable={true}
            // colocar os dados da disciplina no lugar
            action={(e) => console.log(disciplinasToSelect[disciplinasToSelect.length-1])}
          />)
      }
    });
    console.log(disciplinasToSelect?.length == 0)
    if (disciplinasToSelect?.length == 0) {
      console.log("UEPAA")
      disciplinasToSelect.push(
        <MateriaField
          key={"SemDiscIndicator"}
          label={"Sem disciplinas disponíveis"}
          bgColor={"#545454"}
          tamanho={"18vw"}
        />)
    }
    return disciplinasToSelect

  }








  if (disciplinas != [] && disciplinas !== null && disciplinas !== undefined) {

    var disciplinasComHoraAula = [];

    disciplinas.forEach((disciplinaCurso) => {
      if (!disciplinaCurso.disciplina.isDisciplinaEspecial) {
        disciplinasComHoraAula.push(disciplinaCurso);
      }
    });

    var materiasField = [];

    for (let linhasAula = 1; linhasAula <= qtdAulasDias; linhasAula++) {
      var label = "";
      var bgColor = "#0000ff";

      if (linhasAula == 3 || linhasAula == 6) {

        label = "Intervalo";
        materiasField.push(
          <MateriaField
            key={idColuna + linhasAula}
            label={label}
            bgColor={bgColor}
          />
        );
      }
      else {
        materiasField.push(
          <MateriaField
            key={idColuna + linhasAula}
            label={label}
            bgColor={bgColor}
            isClickable={true}
            action={(e) => {
              console.log(e.target.value)
              handleDisciplinasToSelect(mapDisciplinasPorCampo(disciplinasComHoraAula, linhasAula))
            }}
          />
        );
      }
    }
    return (
      <div>
        {materiasField}
        {/* <LinhasAulas
       idColuna={idColuna}></LinhasAulas> */}
      </div>
    );
  }
}
