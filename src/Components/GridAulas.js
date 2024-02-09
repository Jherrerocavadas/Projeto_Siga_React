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
function verifyArrObj(arr, key, value, mode = "normal") {
  // verifyArrObj(disciplinasMatriculadas, "horasAula", value.horasAula, "eachValue")
  // console.log("arr: ", arr)
  // console.log("key: ", key)
  // console.log("value: ",value)

  if (arr.length > 0) {
    var comparations = [];
    arr.forEach((obj, index) => {
      // console.log("OBJ: "+ obj[key] + "; value: " + value + "; comp: " + (obj.numeroAula == value))
      // console.log("index:", index)
      if (mode == "eachValue") {
        obj[key].forEach((objValue) => {

          value.forEach((objValue2) => {
            comparations.push(JSON.stringify(objValue) == JSON.stringify(objValue2));
          })
        })
      }

      else {
        // console.log("obj[key]: ",obj[key])
        comparations.push(obj[key] == value);
      }
    });
    // console.log("comparations: ", comparations)
    // console.log(comparations.includes(true))
    return comparations.includes(true);
  }
  return false;
}












//Verifica um objeto dentro de um array é igual a outro objeto


// [{4},{3},{2},{1}] == // [{4},{0},{0},{0}] -> arr1 tem um item no arr2, então tem que dar true
function verifyobjects(objList1, objList2, key) {

  // console.log("objList1: ", objList1)
  // console.log("key: ", key)

  if (objList1?.length > 0 && objList2?.length > 0) {
    var comparations = [];
    objList1.forEach((obj) => {

      // console.log("OBJ: "+ obj[key] + "; value: " + value + "; comp: " + (obj.numeroAula == value))
      // console.log("obj[key]: ", obj[key])
      objList2.forEach((object) => {
        comparations.push(JSON.stringify(obj) == JSON.stringify(object));
      })
    });
    // console.log("comparations: ", comparations)
    // console.log(comparations.includes(true))
    return comparations.includes(true);
  }
  return false;
}

function getPositionOfMateriaConflitante(listaMateriasMatriculadas, novaMateria){

  var posMatric
  //para cada disciplinaCurso na matricula
  listaMateriasMatriculadas.forEach((materiaMatriculada, posMatricula) => {
    console.log(materiaMatriculada.disciplina.codDisciplina)
    var horasAulaComparation = []
    var diasAulaComparation = []
    //para cada horasAula em cada disciplinaCurso
    materiaMatriculada.horasAula.forEach((horaAula) => {
      

      //para cada horaAula em cada disciplinaCurso
      novaMateria.horasAula.forEach((horaAulaMateriaNova)=>{
        if(horaAula.numeroAula == horaAulaMateriaNova.numeroAula){
          horasAulaComparation.push({"posMatricula": posMatricula, "resultadoComparacao": true})
        }
        else{
          horasAulaComparation.push({"posMatricula": posMatricula, "resultadoComparacao": false})
        }
      })
    })

    materiaMatriculada.diasDeAula.forEach((diaAula) => {

      //para cada horaAula em cada disciplinaCurso
      novaMateria.diasDeAula.forEach((diaAulaMateriaNova)=>{
        if(diaAula == diaAulaMateriaNova){
          diasAulaComparation.push({"posMatricula": posMatricula, "resultadoComparacao": true})
        }
      })
    })
  
  
  console.log("horasCompara", horasAulaComparation)
  console.log("diasCompara", diasAulaComparation)
  //capturar a posição da matéria que deu os checks
  
  if(verifyArrObj(horasAulaComparation, "resultadoComparacao", true) &&
   verifyArrObj(diasAulaComparation, "resultadoComparacao", true)){
    console.log("posicaoMatricula", horasAulaComparation[0].posMatricula)
    posMatric = horasAulaComparation[0].posMatricula
    return posMatric
  }
  else{
    console.log("Não TEM POS MATROC")
  }
  })

  return posMatric
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
  disciplinasMatriculadas, setDisciplinasMatriculadas, setDisciplinasToSelect }) {
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
        disciplinasMatriculadas={disciplinasMatriculadas}
        setDisciplinasMatriculadas={setDisciplinasMatriculadas}
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
  disciplinasMatriculadas,
  setDisciplinasMatriculadas,
  setDisciplinasToSelect
}) {

  function handleDisciplinasToSelect(value) {
    if (setDisciplinasToSelect) {
      setDisciplinasToSelect(null)//zerar o array
      // console.log("Value: ", value)
      setDisciplinasToSelect(value)
      // alert("disciplinas Selecionadas!");
    }
    else {
      alert("Sem ação para realizar!");
    }
  }

  function handleDisciplinasMatriculadas(value) {
    if (setDisciplinasMatriculadas) {
      setDisciplinasMatriculadas(value)
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
            action={(e) => {
              if (disciplinasMatriculadas.includes(value)) (
                alert("Essa disciplina já está na lista de matrícula!")
              )
              else if (verifyArrObj(disciplinasMatriculadas, "diasDeAula", value.diasDeAula, "eachValue") &&
              verifyArrObj(disciplinasMatriculadas, "horasAula", value.horasAula, "eachValue")){
                alert("Disciplinas com horários conflitantes")

                console.log("DiasAula: ",verifyArrObj(disciplinasMatriculadas, "diasDeAula", value.diasDeAula, "eachValue"))
                console.log("HorasAula: ",verifyArrObj(disciplinasMatriculadas, "horasAula", value.horasAula, "eachValue"))
                let posMatricula = getPositionOfMateriaConflitante(disciplinasMatriculadas, value)

                
                //Remove disciplina conflitante e coloca a outra (replace)
                let tempDisciplinasMatriculadas = disciplinasMatriculadas
                if(posMatricula != null && posMatricula != undefined){
                  tempDisciplinasMatriculadas.splice(posMatricula, 1, value)
                  handleDisciplinasMatriculadas(tempDisciplinasMatriculadas)
                }
               

                // console.log("newDisciplinaMatriculada", disciplinasMatriculadas)
              
              }  
              else {
                
                
                let tempDisciplinasMatriculadas = disciplinasMatriculadas
                             
                tempDisciplinasMatriculadas.push(value)
                handleDisciplinasMatriculadas(tempDisciplinasMatriculadas)
                
                // console.log("disciplinasMatriculadas: ", disciplinasMatriculadas)
              }




            }}
          />)
      }
    });


 // TODO: Inserir uma caixa de disciplina que "zera" o estado da disciplina na matriz
    if (disciplinasToSelect?.length == 0) {
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

// TODO: Corrigir o esquema de renderização, que só atualiza o status após clicar em alguma caixa de horário de novo

      //Caixas de intervalo
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


        //Se tiver disciplinas
        if (disciplinasMatriculadas?.length != 0) {
          disciplinasMatriculadas.map((value, index) => {
              if (value.diasDeAula.includes(idColuna) &&
                verifyArrObj(value.horasAula, "numeroAula", linhasAula)
                ) {
                    label = value.disciplina.nomeDisciplina.length > 12
                      ? value.disciplina.siglaDisciplina
                      : value.disciplina.nomeDisciplina;
                    bgColor = value.disciplina.corDisciplina != null &&
                      value.disciplina.corDisciplina != undefined
                      ? value.disciplina.corDisciplina
                      : bgColor;
                  }
                
          })
        }

        //Se não tiver, vai pular o if e inserir caixa vazia
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
