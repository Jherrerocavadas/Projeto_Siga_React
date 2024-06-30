import { useEffect, useState } from "react";
import { diasSemanaPlaceholder, getLabelsDiasSemana } from "../../api/utils";
import {
  getLabelsHorarioAula,
  horarioAulaPlaceholder,
} from "../../api/HorarioAula/horarioAulaController";
import { listarDisciplinasPorCurso } from "../../api/DisciplinaCurso/disciplinaCursoController";
import { IHeaderItemList } from "../../components/Grid/GridHeader";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { IDropdownParametersList } from "../../components/Dropdown";
import GridCommon from "../../components/Grid";

export function HorarioAula() {
  //Vão vir do cadastro do usuário

  /* ---------------------------------------------<Dados Mockados>--------------------------------------------- */
  const [periodo, setPeriodo] = useState({ value: "Manhã", cod: "MANHA" }); //Enum Periodo
  // const siglaCurso = "DMD" //Puxar do cadastro do aluno ou da seleção
  const codFaculdade = "FAT128"; //puxar do cadastro do aluno ou da seleção
  const [semestre, setSemestre] = useState<Number>(1); //puxar do período selecionado
  const curso = { siglaCurso: useParams().siglaCurso, qtdSemestres: 6 }; // puxar do curso (pelo siglaCurso)

  /*------------------------------------------------------------------------------------------------------------*/

  const [diasSemana, setDiasSemana] = useState(diasSemanaPlaceholder);
  const [horarioAula, setHorarioAula] = useState(horarioAulaPlaceholder);
  const [disciplinasCursos, setDisciplinasCursos] = useState(null);

  const [disciplinas, setDisciplinas] = useState(null);

  const [disciplinasEspeciais, setDisciplinasEspeciais] = useState(null);

  /* --------------------------------------------< Ambiente Mobile >-------------------------------------------- */
  const isMobile = useMediaQuery({ query: "(max-width: 450px)" });
  /*------------------------------------------------------------------------------------------------------------*/

  const dropdownSemestre: IDropdownParametersList = [];

  for (let semestre = 1; semestre <= curso.qtdSemestres; semestre++) {
    dropdownSemestre.push({
      label: isMobile ? `${semestre}°` : `${semestre}° Semestre`,
      value: semestre,
      callbackText: `Semestre alterado para ${semestre}º Semestre! `,
    });
  }

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
  //TODO: VERIFICAR SEMESTRE COMO 0 QUANDO O PLACEHOLDER É SELECIONADO
  const headerItens: IHeaderItemList = [
    {
      type: "Dropbox",
      key: "dpb001",
      label: isMobile ? "Sem: " : "Selecione o Semestre:",
      value: dropdownSemestre,
      action: setSemestre,
      callbackText: "Alteração de Semestre concluída!",
    },
    {
      type: "Dropbox",
      key: "dpb002",
      label: isMobile ? "Per: " : "Selecione o Periodo:",
      value: dropdownPeriodo,
      action: setPeriodo,
      callbackText: "Alteração de Período concluída!",
    },
    { type: "Text", key: "txt001", label: "Curso: ", value: curso.siglaCurso },
    {
      type: "Text",
      key: "txt002",
      label: isMobile ? "Sem: " : "Semestre: ",
      value: semestre ? semestre + "°" : "",
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

  // Estrutura da tela

  /*
  container
    GridHeader (Só se tiver vendo o horário de aula fixo por semestre/período)
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
    // <div className="grid-container">
    //   <GridHeader funcionalidades={funcionalidades} />

    //   <GridTitle
    //     horarioUsuario={periodo.value}
    //     diasSemana={diasSemana}
    //     index={indexDiaSemana}
    //   />

    //   <div className="grid-content-container">
    //     <ArrowButton
    //       direction={"left"}
    //       display={isMobile}
    //       color={wg50}
    //       action={() => {
    //         setIndexDiaSemana(indexDiaSemana > 0 ? indexDiaSemana - 1 : 0);
    //       }}
    //     />
    //     <HoraAulaColumn labelsHorarioAula={horarioAula} />

    //     <GridDisciplinas
    //       diaDisciplina={diasSemana}
    //       qtdAulasDias={horarioAula.length}
    //       disciplinas={disciplinasCursos}
    //       semestre={semestre}
    //       index={indexDiaSemana}
    //     />
    //     <ArrowButton
    //       direction={"right"}
    //       display={isMobile}
    //       color={wg50}
    //       action={() => {
    //         setIndexDiaSemana(
    //           indexDiaSemana < diasSemanasSize
    //             ? indexDiaSemana + 1
    //             : diasSemanasSize
    //         );
    //       }}
    //     />
    //   </div>

    //   <MateriasEspeciaisField
    //     disciplinasEspeciais={disciplinasEspeciais}
    //     isClickable={false}
    //   />
    // </div>
  );
}
