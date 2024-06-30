import { ElementGrid } from "../ElementGrid";
import { useMediaQuery } from "react-responsive";
import { verifyArrObj, getPositionOfMateriaConflitante } from "../../../utils";
import "./GridAulasStyle.css"

// Vai criar o grid das disciplinas, puxando as disciplinas que o aluno tem cadastrada (visualização da grade do aluno)
export function GridDisciplinas({
  diaDisciplina,
  qtdAulasDias,
  disciplinas,
  semestre,
  index = 0,
}) {
  const isSmartPhone = useMediaQuery({ query: "(max-width: 450px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  
  //Converter valor do semestre para Int caso ele tenha vindo como String
  semestre = parseInt(semestre);

  if (isSmartPhone) {
    //cria todo o mapeamento do dia (vertical), depois cria as linhas (horizontal)
    return (
      <ColunaDiaAula
        idColuna={diaDisciplina[index].cod} //Dia da semana
        qtdAulasDias={qtdAulasDias}
        disciplinas={disciplinas}
        semestre={semestre}
      />
    );
  } else if (isTablet) {
    //cria todo o mapeamento do dia (vertical), depois cria as linhas (horizontal)
    return (
        <ColunaDiaAula
          idColuna={diaDisciplina[index].cod} //Dia da semana
          qtdAulasDias={qtdAulasDias}
          disciplinas={disciplinas}
          semestre={semestre}
        />
    );
  }
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

// Cria a coluna de aulas de determinado dia (Aulas cadastradas).
// O identificador de cada campo da coluna é o dia da semana da coluna + a posição do identificador
export function ColunaDiaAula({
  idColuna,
  qtdAulasDias,
  disciplinas,
  semestre,
}) {
  if (
    /*disciplinas != [] &&*/ disciplinas !== null &&
    disciplinas !== undefined
  ) {
    var disciplinasComHoraAula = [];

    disciplinas.forEach((disciplinaCurso) => {
      if (!disciplinaCurso.disciplina.isDisciplinaEspecial) {
        disciplinasComHoraAula.push(disciplinaCurso);
      }
    });

    var materiasField = [];

    for (let linhasAula = 1; linhasAula <= qtdAulasDias; linhasAula++) {
      let label = "";
      let bgColor = null;

      if (linhasAula === 3 || linhasAula === 6) {
        label = "Intervalo";
        bgColor = "var(--waikawa-gray-700)";
      } else {
        disciplinasComHoraAula.map((value, index) => {
          if (
            value.diasDeAula.includes(idColuna) &&
            verifyArrObj(value.horasAula, "numeroAula", linhasAula) &&
            value.semestre === semestre
          ) {
            label =
              value.disciplina.nomeDisciplina.length > 12
                ? value.disciplina.siglaDisciplina
                : value.disciplina.nomeDisciplina;
            bgColor =
              value.disciplina.corDisciplina != null &&
              value.disciplina.corDisciplina !== undefined
                ? value.disciplina.corDisciplina
                : null;
          }
          return value;
        });
      }

      materiasField.push(
        <ElementGrid
          key={idColuna + linhasAula}
          label={label}
          bgColor={bgColor}
        />
      );
    }
    return (
      <div className="grid-value-column-container">
        {materiasField}
        {/* <LinhasAulas
       idColuna={idColuna}></LinhasAulas> */}
      </div>
    );
  }
}

// Vai criar o grid das disciplinas, puxando as disciplinas que o aluno tem disponível para matricular
// No caso da visualização da Hora_Aula do aluno, vai puxar as disciplinas que o aluno já tem cadastrado
export function GridDisciplinasMatricula({
  diaDisciplina,
  qtdAulasDias,
  disciplinas,
  semestre,
  disciplinasMatriculadas,
  setDisciplinasMatriculadas,
  setDisciplinasToSelect,
  isMatriculaPorSemestre,
  index = 0,
}) {
  const isSmartPhone = useMediaQuery({ query: "(max-width: 450px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  if (isSmartPhone) {
    //cria todo o mapeamento do dia (vertical), depois cria as linhas (horizontal)
    return (
      <ColunaDiaAulaMatricula
        idColuna={diaDisciplina[index].cod} //Dia da semana
        qtdAulasDias={qtdAulasDias}
        disciplinas={disciplinas}
        semestre={semestre}
        disciplinasMatriculadas={disciplinasMatriculadas}
        setDisciplinasMatriculadas={setDisciplinasMatriculadas}
        setDisciplinasToSelect={setDisciplinasToSelect}
        isMatriculaPorSemestre={isMatriculaPorSemestre}
      />
    );
  } else if (isTablet) {
    //cria todo o mapeamento do dia (vertical), depois cria as linhas (horizontal)
    return (
      <ColunaDiaAulaMatricula
        // idColuna={value.toUpperCase()}//Dia da semana
        idColuna={diaDisciplina[index].cod} //Dia da semana
        qtdAulasDias={qtdAulasDias}
        disciplinas={disciplinas}
        semestre={semestre}
        disciplinasMatriculadas={disciplinasMatriculadas}
        setDisciplinasMatriculadas={setDisciplinasMatriculadas}
        setDisciplinasToSelect={setDisciplinasToSelect}
        isMatriculaPorSemestre={isMatriculaPorSemestre}
      />
    );
  }

  //cria todo o mapeamento do dia (vertical), depois cria as linhas (horizontal)
  return (
    //ColunaDiaAula vai criar a div de colunas
    diaDisciplina.map((value, index) => {
      return (
        <ColunaDiaAulaMatricula
          // idColuna={value.toUpperCase()}//Dia da semana
          idColuna={value.cod} //Dia da semana
          qtdAulasDias={qtdAulasDias}
          disciplinas={disciplinas}
          semestre={semestre}
          disciplinasMatriculadas={disciplinasMatriculadas}
          setDisciplinasMatriculadas={setDisciplinasMatriculadas}
          setDisciplinasToSelect={setDisciplinasToSelect}
          isMatriculaPorSemestre={isMatriculaPorSemestre}
        />
      );
    })
  );
}

// Cria a coluna de aulas de determinado dia.
// O identificador de cada campo da coluna é o dia da semana da coluna + a posição do identificador
export function ColunaDiaAulaMatricula({
  idColuna,
  qtdAulasDias,
  disciplinas,
  semestre,
  disciplinasMatriculadas,
  setDisciplinasMatriculadas,
  setDisciplinasToSelect,
  isMatriculaPorSemestre,
}) {
  function handleDisciplinasToSelect(value) {
    if (setDisciplinasToSelect) {
      setDisciplinasToSelect(null); //zerar o array
      // console.log("Value: ", value)
      setDisciplinasToSelect(value);
      // alert("disciplinas Selecionadas!");
    } else {
      alert("Sem ação para realizar!");
    }
  }

  function handleDisciplinasMatriculadas(value) {
    if (setDisciplinasMatriculadas) {
      setDisciplinasMatriculadas(value);
    } else {
      alert("Sem ação para realizar!");
    }
  }

  function mapDisciplinasPorCampo(
    disciplinas,
    linhasAula,
    isMatriculaPorSemestre = false
  ) {
    let disciplinasToSelect = [];
    disciplinas.map((value, index) => {
      let matriculaPorSemestreExpression =
        isMatriculaPorSemestre === true
          ? value.semestre === semestre
          : value.semestre;
      if (
        value.diasDeAula.includes(idColuna) &&
        verifyArrObj(value.horasAula, "numeroAula", linhasAula) &&
        matriculaPorSemestreExpression
      ) {
        label =
          value.disciplina.nomeDisciplina.length > 12
            ? value.disciplina.siglaDisciplina
            : value.disciplina.nomeDisciplina;
        bgColor =
          value.disciplina.corDisciplina != null &&
          value.disciplina.corDisciplina !== undefined
            ? value.disciplina.corDisciplina
            : bgColor;

        disciplinasToSelect.push(
          <ElementGrid
            key={value.disciplina.codDisciplina}
            label={label}
            bgColor={bgColor}
            isClickable={true}
            // colocar os dados da disciplina no lugar
            action={(e) => {
              if (disciplinasMatriculadas.includes(value))
                alert("Essa disciplina já está na lista de matrícula!");
              else if (
                //Essa verificacao Tem que ser das mesmas disciplinas
                //Objeto das disciplinas Matriculadas
                // Comparar: diasDeAula e horasAula
                // Verificar Objeto value (matéria a ser matriculada)
                verifyArrObj(
                  disciplinasMatriculadas,
                  "diasDeAula",
                  value.diasDeAula,
                  "eachValue"
                ) &&
                verifyArrObj(
                  disciplinasMatriculadas,
                  "horasAula",
                  value.horasAula,
                  "eachValue"
                )

                // verifyArrMultipleKeys(disciplinasMatriculadas, value, [{chave: "horasAula", valor: "numeroAula"},
                // {chave: "diasDeAula", valor: ""}])
              ) {
                alert("Disciplinas com horários conflitantes");

                console.log(
                  "DiasAula: ",
                  verifyArrObj(
                    disciplinasMatriculadas,
                    "diasDeAula",
                    value.diasDeAula,
                    "eachValue"
                  )
                );
                console.log(
                  "HorasAula: ",
                  verifyArrObj(
                    disciplinasMatriculadas,
                    "horasAula",
                    value.horasAula,
                    "eachValue"
                  )
                );
                let posMatricula = getPositionOfMateriaConflitante(
                  disciplinasMatriculadas,
                  value
                );

                //Remove disciplina conflitante e coloca a outra (replace)
                let tempDisciplinasMatriculadas = disciplinasMatriculadas;
                if (posMatricula != null && posMatricula !== undefined) {
                  tempDisciplinasMatriculadas.splice(posMatricula, 1, value);
                  handleDisciplinasMatriculadas(tempDisciplinasMatriculadas);
                }

                // console.log("newDisciplinaMatriculada", disciplinasMatriculadas)
              } else {
                let tempDisciplinasMatriculadas = disciplinasMatriculadas;

                tempDisciplinasMatriculadas.push(value);
                handleDisciplinasMatriculadas(tempDisciplinasMatriculadas);

                console.log(
                  "disciplinasMatriculadas: ",
                  tempDisciplinasMatriculadas
                );
              }
            }}
          />
        );
      }
      return value;
    });

    // TODO: Inserir uma caixa de disciplina que "zera" o estado da disciplina na matriz
    if (disciplinasToSelect?.length === 0) {
      disciplinasToSelect.push(
        <ElementGrid
          key={"SemDiscIndicator"}
          label={"Sem disciplinas disponíveis"}
          bgColor={"#545454"}
          tamanho={"18vw"}
        />
      );
    }
    return disciplinasToSelect;
  }

  if (
    /*disciplinas != [] && */ disciplinas !== null &&
    disciplinas !== undefined
  ) {
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
      if (linhasAula === 3 || linhasAula === 6) {
        label = "Intervalo";
        materiasField.push(
          <ElementGrid
            key={idColuna + linhasAula}
            label={label}
            bgColor={bgColor}
          />
        );
      } else {
        //Se tiver disciplinas
        if (disciplinasMatriculadas?.length !== 0) {
          disciplinasMatriculadas.map((value, index) => {
            if (
              value.diasDeAula.includes(idColuna) &&
              verifyArrObj(value.horasAula, "numeroAula", linhasAula)
            ) {
              label =
                value.disciplina.nomeDisciplina.length > 12
                  ? value.disciplina.siglaDisciplina
                  : value.disciplina.nomeDisciplina;
              bgColor =
                value.disciplina.corDisciplina != null &&
                value.disciplina.corDisciplina !== undefined
                  ? value.disciplina.corDisciplina
                  : bgColor;
            }
            return value;
          });
        }

        //Se não tiver, vai pular o if e inserir caixa vazia
        materiasField.push(
          <ElementGrid
            key={idColuna + linhasAula}
            label={label}
            bgColor={bgColor}
            isClickable={true}
            action={(e) => {
              console.log(e.target.value);
              handleDisciplinasToSelect(
                mapDisciplinasPorCampo(
                  disciplinasComHoraAula,
                  linhasAula,
                  isMatriculaPorSemestre
                )
              );
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
