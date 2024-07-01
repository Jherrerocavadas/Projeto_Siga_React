import React, { useState } from "react";
import GridHeader from "./GridHeader";
import { GridTitle } from "./GridTitle";
import ArrowButton from "../ArrowButton";
import { HoraAulaColumn } from "./HoraAulaColumn";
import { GridDisciplinas, GridDisciplinasMatricula } from "./GridAulas";
import {
  MateriasEspeciaisField,
  MateriasSelectionGrid,
} from "../MateriasSelectionGrid";
import { wg50 } from "../../styles/variables";
import EmptyResultGrid from "./EmptyResultGrid";

export default function GridCommon({
  headerItens,
  periodo,
  diasSemana,
  horarioAula,
  disciplinasCursos,
  semestre,
  disciplinasEspeciais,
  isMobile,
  isMatricula = false,
  dadosMatricula = null
}) {
  /* --------------------------------------------< Ambiente Mobile >-------------------------------------------- */
  const [indexDiaSemana, setIndexDiaSemana] = useState(0); // Indicador do dia da semana que está sendo visualizado
  const diasSemanasSize = diasSemana.length - 1;

  /*------------------------------------------------------------------------------------------------------------*/

  //Converter valor do semestre para Int caso ele tenha vindo como String
  semestre = parseInt(semestre);
  if (horarioAula.length === 0) {
    return (
      <div className="grid-container">
        <GridHeader headerItens={headerItens} />

        <EmptyResultGrid />

        <MateriasEspeciaisField
          disciplinasEspeciais={disciplinasEspeciais}
          isClickable={isMatricula}
        />
      </div>
    );
  }


  return (
    <div className="grid-container" key={"grid_container"+ isMatricula? "_matricula": "_horario_aula"}>
      <GridHeader headerItens={headerItens}/>

      <GridTitle
        horarioUsuario={periodo.value}
        diasSemana={diasSemana}
        index={indexDiaSemana}
      />

      <div className="grid-content-container">
        <ArrowButton
          direction={"left"}
          display={isMobile && horarioAula.length > 0}
          color={wg50}
          action={() => {
            setIndexDiaSemana(indexDiaSemana > 0 ? indexDiaSemana - 1 : 0);
          }}
        />
        <HoraAulaColumn labelsHorarioAula={horarioAula} />

        {isMatricula ? (
          <GridDisciplinasMatricula
          diaDisciplina={diasSemana}
          qtdAulasDias={horarioAula.length}
          disciplinas={disciplinasCursos}
          semestre={semestre}
          disciplinasMatriculadas={dadosMatricula.disciplinasMatriculadas}
          setDisciplinasMatriculadas={dadosMatricula.setDisciplinasMatriculadas}
          setDisciplinasToSelect={dadosMatricula.setDisciplinasParaSelecionar}
          isMatriculaPorSemestre={dadosMatricula.isMatriculaPorSemestre}
          index={indexDiaSemana}
        />
        ) : (
          <GridDisciplinas
            diaDisciplina={diasSemana}
            qtdAulasDias={horarioAula.length}
            disciplinas={disciplinasCursos}
            semestre={semestre}
            index={indexDiaSemana}
          />
        )}
        <ArrowButton
          direction={"right"}
          display={isMobile && horarioAula.length > 0}
          color={wg50}
          action={() => {
            setIndexDiaSemana(
              indexDiaSemana < diasSemanasSize
                ? indexDiaSemana + 1
                : diasSemanasSize
            );
          }}
        />
      </div>

      {isMatricula? <MateriasSelectionGrid
        disciplinasParaSelecionar={dadosMatricula.disciplinasParaSelecionar}
      />: <></>}

      <MateriasEspeciaisField
        disciplinasEspeciais={disciplinasEspeciais}
        isClickable={isMatricula}
        action={isMatricula? ()=> {console.log("EPA")}: null}
      />
    </div>
  );
}