import React, { useState } from 'react'
import GridHeader from './GridHeader';
import { GridTitle } from './GridTitle';
import ArrowButton from '../ArrowButton';
import { HoraAulaColumn } from './HoraAulaColumn';
import { GridDisciplinas } from './GridAulas';
import { MateriasEspeciaisField } from '../SelecaoMateriaField';
import { wg50 } from '../../styles/variables';
import EmptyResultGrid from './EmptyResultGrid';

export default function GridCommon({
  headerItens,
    periodo,
    diasSemana,
    horarioAula,
    disciplinasCursos,
    semestre,
    disciplinasEspeciais,
    isMobile
}) {

/* --------------------------------------------< Ambiente Mobile >-------------------------------------------- */
  const [indexDiaSemana, setIndexDiaSemana] = useState(0); // Indicador do dia da semana que está sendo visualizado
  const diasSemanasSize = diasSemana.length - 1;

  /*------------------------------------------------------------------------------------------------------------*/
  if(horarioAula.length === 0){
    return (<div className="grid-container">
      <GridHeader headerItens={headerItens} />

      <EmptyResultGrid/>

      <MateriasEspeciaisField
        disciplinasEspeciais={disciplinasEspeciais}
        isClickable={false}
      />
    </div>
  );
  }

  return (
    <div className="grid-container">
      <GridHeader headerItens={headerItens} />

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

        <GridDisciplinas
          diaDisciplina={diasSemana}
          qtdAulasDias={horarioAula.length}
          disciplinas={disciplinasCursos}
          semestre={semestre}
          index={indexDiaSemana}
        />
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

      <MateriasEspeciaisField
        disciplinasEspeciais={disciplinasEspeciais}
        isClickable={false}
      />
    </div>
  )
}
