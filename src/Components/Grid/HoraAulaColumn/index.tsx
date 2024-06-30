import { ElementGrid } from "../ElementGrid";
import {wg700} from "../../../styles/variables.js"
import "./HorarioAulaColumnStyle.css"


//Vai montar o texto do horário das aulas de acordo com o período que o aluno estuda

export function HoraAulaColumn({ labelsHorarioAula }) {
  
  if (labelsHorarioAula !== null ||
    labelsHorarioAula !== undefined //||
    // labelsHorarioAula != []
  ) {
    labelsHorarioAula.forEach((horarioAula) => {
      if (horarioAula.isIntervalo) {
        horarioAula.label = "Intervalo";
        // bgColor = "var(--waikawa-gray-700)";
      }
    });

    return (
      <div className="grid-key-column-container">
        {labelsHorarioAula.map((value, index) => (
          <ElementGrid
            key={index}
            bgColor={value.label === "Intervalo" ? null : wg700}
            label={value.label} />
        ))}
      </div>
    );
  }
}
