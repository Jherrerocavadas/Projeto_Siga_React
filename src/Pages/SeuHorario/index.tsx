import "../../styles/GradeHorarioStyle.css";
import { GridTitle } from "../../components/Grid/GridTitle";
import { GridDisciplinas } from "../../components/Grid/GridAulas";
import { HoraAulaColumn } from "../../components/Grid/HoraAulaColumn";
import { MateriasEspeciaisField } from "../../components/SelecaoMateriaField";
import { useEffect, useState } from "react";
import { diasSemanaPlaceholder, getLabelsDiasSemana } from "../../api/utils";
import {
  getLabelsHorarioAula,
  horarioAulaPlaceholder,
} from "../../api/HorarioAula/horarioAulaController";
import { listarDisciplinasPorCurso } from "../../api/DisciplinaCurso/disciplinaCursoController";
import { useAuth } from "../../contexts/auth";
import TextBox from "../../components/TextBox";
import ArrowButton from "../../components/ArrowButton";
import { useMediaQuery } from "react-responsive";
import { wg50 } from "../../styles/variables";


export function SeuHorario() {
  //Vão vir do cadastro do usuário

  const { userDataResponse } = useAuth();

  const [periodo, setPeriodo] = useState({ value: "Manhã", cod: "MANHA" }); //Enum Periodo
  // const siglaCurso = "DMD" //Puxar do cadastro do aluno ou da seleção
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
  const [indexDiaSemana, setIndexDiaSemana] = useState(0)// Indicador do dia da semana que está sendo visualizado
  const isMobile = useMediaQuery({ query: "(max-width: 450px)" });
  const diasSemanasSize = diasSemana.length-1;

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

  // Estrutura da tela

  /*
  container
    Filter-field
    Cabeçalho (Horário - {periodo.getNomePeriodo}, Segunda, Terça, ...) -> OK
    LabelHorariosAula (7h40-8h30, ...) -> OK
    GridHorarioAula (Matemática Discreta, IA, ...) Vai retornar a matéria que o usuário tem cadastrado para aquele horário. -> Andando
  
    GridDisciplinas (Matricula) (Matemática Discreta, IA, ...) Vai ser clicável, permitindo ao usuário setar a matéria.
    Se setar uma matéria, deve setar automáticamente essa matéria para os outros dias também

    SelecaoMateriaField (Matricula) -> Vai conter as matérias so dia que o usuário selecionou, permitindo que
    ele se matricule nela para o dia.

    Também terá as matérias especiais, onde ao clicar, ele já registra na matrícula automático
  
  */

    //Componente de grid na visão mobile
  return (
    <div className="grid-container">
      <div className="grid-header">
        <TextBox textBoxKey={"ind_curso"} label={"Curso: " + curso.siglaCurso} />
        <TextBox textBoxKey={"ind_semestre"} label={"Semestre: " + (semestre ? semestre + "°" : "")}/>
      </div>

      <GridTitle horarioUsuario={periodo.value} diasSemana={diasSemana} index={indexDiaSemana}/>



      <div className="grid-content-container">
      <ArrowButton direction={"left"} display={isMobile} color={wg50}action={() =>{setIndexDiaSemana(indexDiaSemana > 0? indexDiaSemana-1 :0)}}/>
        <HoraAulaColumn labelsHorarioAula={horarioAula} />

        <GridDisciplinas
          diaDisciplina={diasSemana}
          qtdAulasDias={horarioAula.length}
          disciplinas={disciplinasCursos}
          semestre={semestre}
          index={indexDiaSemana}
          />
      <ArrowButton direction={"right"} display={isMobile} color={wg50} action={() =>{
        setIndexDiaSemana(indexDiaSemana < diasSemanasSize ? indexDiaSemana+1 : diasSemanasSize)
        }}/>
      </div>

      <MateriasEspeciaisField
        disciplinasEspeciais={disciplinasEspeciais}
        isClickable={false}
      />
    </div>
  );
}
