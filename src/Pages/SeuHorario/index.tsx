import "../../styles/GradeHorarioStyle.css";
import { useEffect, useState } from "react";
import { diasSemanaPlaceholder, getLabelsDiasSemana } from "../../api/utils";
import {
  getLabelsHorarioAula,
  horarioAulaPlaceholder,
} from "../../api/HorarioAula/horarioAulaController";
import { listarDisciplinasPorCurso } from "../../api/DisciplinaCurso/disciplinaCursoController";
import { useAuth } from "../../contexts/auth";
import { useMediaQuery } from "react-responsive";
import GridCommon from "../../components/Grid";
import { IHeaderItemList } from "../../components/Grid/GridHeader";
import { IDropdownParametersList } from "../../components/Dropdown";

export function SeuHorario() {
  //Vão vir do cadastro do usuário

  const { userDataResponse } = useAuth();

  const [periodo, setPeriodo] = useState({ value: "Manhã", cod: "MANHA" }); //Enum Periodo
  const { codFaculdade } = userDataResponse.dadosComplementares.faculdade; //puxar do cadastro do aluno ou da seleção
  const { curso } = userDataResponse.dadosComplementares;
  const semestre = userDataResponse.dadosComplementares.semestre;

  /*------------------------------------------------------------------------------------------------------------*/

  const [diasSemana, setDiasSemana] = useState(diasSemanaPlaceholder);
  const [horarioAula, setHorarioAula] = useState(horarioAulaPlaceholder);
  const [disciplinasCursos, setDisciplinasCursos] = useState(null);

  const [disciplinas, setDisciplinas] = useState(null);

  const [disciplinasEspeciais, setDisciplinasEspeciais] = useState(null);

  /* --------------------------------------------< Ambiente Mobile >-------------------------------------------- */
  const isMobile = useMediaQuery({ query: "(max-width: 450px)" });

  /*------------------------------------------------------------------------------------------------------------*/

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
    console.log(
      "periodo.value: " + periodo.value + "; periodo.cod:" + periodo.cod
    );
    getLabelsHorarioAula(periodo.cod)
      .then((response) => {
        setHorarioAula(response);
      })
      .catch((error) => {
        console.log("Erro ao receber horário de aula: " + error);
      });
  }, [periodo]);

  useEffect(() => {
    listarDisciplinasPorCurso(false, curso.siglaCurso, codFaculdade)
      .then((response) => {
        setDisciplinasCursos(response);

        var tempDisciplinas = [];
        response.forEach((disciplinaCurso) => {
          tempDisciplinas.push(disciplinaCurso.disciplina);
        });
        setDisciplinas(tempDisciplinas);

        var tempDisciplinasEspeciais = [];
        tempDisciplinas.forEach((disciplina) => {
          if (disciplina.isDisciplinaEspecial)
            tempDisciplinasEspeciais.push(disciplina);
        });

        setDisciplinasEspeciais(tempDisciplinasEspeciais);
      })
      .catch((error) => {
        console.error("Erro ao setar disciplinas Cursos: " + error);
      });
  }, []);


  const dropdownPeriodo: IDropdownParametersList = [
    {
      label: isMobile ? "Man " : "Manhã",
      value: 0,
      callbackText: "Período alterado para Manhã! ",
      object: { value: "Manhã", cod: "MANHA" },
    },
    {
      label: isMobile ? "Tar " : "Tarde",
      value: 1,
      callbackText: "Período alterado para Tarde! ",
      object: { value: "Tarde", cod: "TARDE" },
    },
    {
      label: isMobile ? "Noi " : "Noite",
      value: 2,
      callbackText: "Período alterado para Noite! ",
      object: { value: "Noite", cod: "NOITE" },
    },
  ];

  const headerItens: IHeaderItemList = [
    {
      type: "Dropbox",
      key: "dpb002",
      label: isMobile ? "Per: " : "Selecione o Periodo:",
      value: dropdownPeriodo,
      action: setPeriodo,
      callbackText: "Alteração de Período concluída!",
    },
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
      value: semestre + "°",
    },
  ];


  return (
    <GridCommon
      headerItens={headerItens}
      periodo={periodo}
      diasSemana={diasSemana}
      horarioAula={horarioAula}
      disciplinasCursos={disciplinasCursos}
      semestre={semestre}
      disciplinasEspeciais={disciplinasEspeciais}
      isMobile={isMobile}
    />
  );
}
