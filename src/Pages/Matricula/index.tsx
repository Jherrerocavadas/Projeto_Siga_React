import "../../styles/GradeHorarioStyle.css";
import React, { useEffect, useState } from "react";
import { diasSemanaPlaceholder, getLabelsDiasSemana } from "../../api/utils";
import {
  getLabelsHorarioAula,
  horarioAulaPlaceholder,
} from "../../api/HorarioAula/horarioAulaController";
import { listarDisciplinasPorCurso } from "../../api/DisciplinaCurso/disciplinaCursoController";
import { IHeaderItemList } from "../../components/Grid/GridHeader";
import { useMediaQuery } from "react-responsive";
import { IDropdownParametersList } from "../../components/Dropdown";
import { useAuth } from "../../contexts/auth";
import GridCommon from "../../components/Grid";
import { ModalAction } from "../../components/Modal";
import { useNavigate } from "react-router";

function realizarMatriculaAluno(
  numMatriculaAluno,
  disciplinas,
  setMatriculaConfirmada,
  setModalInfo
) {
  setMatriculaConfirmada(true);
  localStorage.setItem("@Matricula:indMatriculaConfirmada", "true");
  sessionStorage.removeItem("@Matricula:disciplinaMatriculadas")

  console.log(
    "MATRICULA DAS DISCIPLINAS: ",
    disciplinas,
    "REALIZADAS PARA O ALUNO ",
    numMatriculaAluno
  );

  setModalInfo(true);
}

//Verificar se uma matrícula já foi realizada e está tentando ser realizada novamente
function checarMatriculaRealizada() {
  const indMatriculaRealizada = localStorage.getItem(
    "@Matricula:indMatriculaConfirmada"
  );
  const indMatriculaRealizadaBanco = false;

  console.log("checagem de matricula realizada");

  //Checar se os dados da matrícula realizada estão salvos no localStorage
  //(Caso o usuário tente recarregar a página para fazer a matrícula novamente)
  if (indMatriculaRealizada && indMatriculaRealizada.toLowerCase() === "true") {
    console.log("checagem de matricula realizada: REALIZADA ");
    return true;
  }
  //Caso os dados não estejam no localStorage (Por exemplo, usuário acessando de outro dispositivo)
  //Verifica no banco se a matrícula foi efetivada.
  else if (indMatriculaRealizadaBanco) {
    console.log("checagem de matricula realizada: REALIZADA VIA BANCO ");
    return true;
  }
  //Se não tiver efetivada em nenhum dos locais, não permite realizar a matrícula
  console.log("checagem de matricula realizada: NÃO REALIZADA ");
  return false;
}
export function Matricula() {
  const { userDataResponse } = useAuth();
  const navigate = useNavigate();
  //Vão vir do cadastro do usuário

  /* ---------------------------------------------<Dados Mockados>--------------------------------------------- */
  const periodo = { value: "Manhã", cod: "MANHA" }; //Enum Periodo
  // const siglaCurso = "DMD" //Puxar do cadastro do aluno ou da seleção
  const { codFaculdade } = userDataResponse.dadosComplementares.faculdade; //puxar do cadastro do aluno ou da seleção
  const [semestre, setSemestre] = useState(1); //puxar do período selecionado
  const { curso } = userDataResponse.dadosComplementares;
  const numMatriculaAluno = userDataResponse.dadosComplementares.numMatricula;

  /*------------------------------------------------------------------------------------------------------------*/

  const [diasSemana, setDiasSemana] = useState(diasSemanaPlaceholder);
  const [horarioAula, setHorarioAula] = useState(horarioAulaPlaceholder);
  const [disciplinasCursos, setDisciplinasCursos] = useState(null);

  const [disciplinasMatriculadas, setDisciplinasMatriculadas] = useState([]);

  const [disciplinasEspeciais, setDisciplinasEspeciais] = useState(null);
  const [disciplinasParaSelecionar, setDisciplinasParaSelecionar] = useState(
    []
  );

  const [isMatriculaPorSemestre, setIsMatriculaPorSemestre] = useState(false);

  const [isMatriculaConfirmada, setMatriculaConfirmada] = useState(
    checarMatriculaRealizada()
  ); // Confirmação de matrícula

  const dropdownSemestre: IDropdownParametersList = [];

  /* --------------------------------------------< Ambiente Mobile >-------------------------------------------- */
  const isMobile = useMediaQuery({ query: "(max-width: 450px)" });

  /*------------------------------------------------------------------------------------------------------------*/

  const [modal, setModal] = useState<boolean>(null);
  const [modalInfo, setModalInfo] = useState<boolean>(checarMatriculaRealizada());

  for (let semestre = 1; semestre <= curso.qtdSemestres; semestre++) {
    dropdownSemestre.push({
      label: `${semestre}°Semestre`,
      value: semestre,
      callbackText: `Semestre alterado para ${semestre}º Semestre! `,
    });
  }

  const headerItens: IHeaderItemList = [
    {
      type: "Text",
      key: "ind_curso",
      label: "Curso: ",
      value: curso.siglaCurso,
    },
    {
      type: "Text",
      key: "ind_semestre",
      label: "Semestre: ",
      value: semestre ? semestre + "°" : "",
    },

    {
      type: "Button",
      key: "btn_matricular_semestre",
      label: "Por semestre? ",
      value: isMatriculaPorSemestre,
      btnItem: {
        type: "header-primary",
        isSubmit: true,
        action: () => {
          setIsMatriculaPorSemestre(!isMatriculaPorSemestre);
        },
      },

      callbackText: isMatriculaPorSemestre
        ? "Matricula por Semestre desativada!"
        : "Matricula por Semestre ativada",
      normalizedValue: isMatriculaPorSemestre ? "SIM" : "NÃO",
    },
    {
      type: "Dropbox",
      key: "dropbox_semestre",
      label: "Selecione o Semestre: ",
      value: dropdownSemestre,
      action: setSemestre,
      callbackText: "Alteração de Período concluída!",
      disabled: !isMatriculaPorSemestre,
    },

    {
      type: "Button",
      key: "btn002",
      label: isMatriculaConfirmada
        ? "Matricula Confirmada!"
        : "Confirmar Matricula",
      value: "",
      btnItem: {
        type: "header-primary",
        isSubmit: true,
        action: !isMatriculaConfirmada
          ? () => {
              setModal(true);
            }
          : null,
        disabled: isMatriculaConfirmada || disciplinasMatriculadas.length === 0,
      },

      callbackText: isMatriculaConfirmada
        ? "Matricula Confirmada!"
        : "Confirmar Matricula",
    },
  ];

  /* TODO: fazer algum esquema para verificar se a API tá fora ou não, e se estiver, 
   ficar tentando de tempos em tempos chamar ela até voltar */

  useEffect(() => {
    // console.log(diasSemana)
    getLabelsDiasSemana()
      .then((response) => {
        setDiasSemana(response);
      })
      .catch((error) => {
        console.log("Erro ao criar grid de aulas: " + error);
      });
  }, []);

  useEffect(() => {
    // console.log("periodo.value: " + periodo.value +  "; periodo.cod:" + periodo.cod)
    getLabelsHorarioAula(periodo.cod)
      .then((response) => {
        setHorarioAula(response);
      })
      .catch((error) => {
        console.log("Erro ao receber horário de aula: " + error);
      });
  }, []);

  useEffect(() => {
    listarDisciplinasPorCurso(false, curso.siglaCurso, codFaculdade)
      .then((response) => {
        setDisciplinasCursos(response);

        var tempDisciplinasEspeciais = [];
        response.forEach((disciplinaCurso) => {
          if (disciplinaCurso.disciplina.isDisciplinaEspecial)
            tempDisciplinasEspeciais.push(disciplinaCurso.disciplina);
        });

        setDisciplinasEspeciais(tempDisciplinasEspeciais);
      })
      .catch((error) => {
        console.error("Erro ao setar disciplinas Cursos: " + error);
      });
  }, []);

  // Estrutura da tela

  /*
  container
    GridHeader (Só se tiver vendo o horário de aula fixo por semestre/período)
    Cabeçalho (Horário - {periodo.getNomePeriodo}, Segunda, Terça, ...) -> OK
    LabelHorariosAula (7h40-8h30, ...) -> OK
    GridHorarioAula (Matemática Discreta, IA, ...) Vai retornar a matéria que o usuário tem cadastrado para aquele horário. -> Andando
  
    GridDisciplinas (Matricula) (Matemática Discreta, IA, ...) Vai ser clicável, permitindo ao usuário setar a matéria.
    Se setar uma matéria, deve setar automáticamente essa matéria para os outros dias também

    SelecaoMateriaField (Matricula) -> Vai conter as matérias do dia que o usuário selecionou, permitindo que
    ele se matricule nela para o dia.

    Também terá as matérias especiais, onde ao clicar, ele já registra na matrícula automático
  
  */
  const dadosMatricula = {
    disciplinasMatriculadas,
    setDisciplinasMatriculadas,
    setDisciplinasParaSelecionar,
    isMatriculaPorSemestre,
    disciplinasParaSelecionar,
  };

  return (
    <div>
      {modalInfo && (
        <ModalAction
          title={"Matrícula realizada"}
          description={"Sua matrícula foi efetivada!"}
          closeLabel={"Fechar"}
          action={()=>navigate("/")}
          setClose={setModalInfo}
        />
      )}
      {modal && (
        <ModalAction
          title={"Matricular disciplinas"}
          description={"Deseja confirmar a matrícula das disciplinas?"}
          okLabel={"Sim"}
          closeLabel={"Cancelar"}
          action={() =>
            realizarMatriculaAluno(
              numMatriculaAluno,
              disciplinasMatriculadas,
              setMatriculaConfirmada,
              setModalInfo
            )
          }
          setClose={setModal}
        />
      )}

      <GridCommon
        headerItens={headerItens}
        periodo={periodo}
        diasSemana={diasSemana}
        horarioAula={horarioAula}
        disciplinasCursos={disciplinasCursos}
        semestre={semestre}
        disciplinasEspeciais={disciplinasEspeciais}
        isMobile={isMobile}
        isMatricula={true}
        dadosMatricula={dadosMatricula}
      />
    </div>
  );
}
