import { useMediaQuery } from "react-responsive";
import "./GridTitleStyle.css";

//Vai montar o Cabeçalho do grid.
// A ideia é verificar o período do aluno e inserir ou não a aula de Sábado (talvez não dê pra implementar)
export const GridTitle = ({ horarioUsuario, diasSemana, index = 0 }) => {
  const isSmartPhone = useMediaQuery({ query: "(max-width: 450px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });

  if (
    /* diasSemana != [] &&*/ diasSemana !== null &&
    diasSemana !== undefined
  ) {
    if (isSmartPhone) {
      return (
        <div className="titles">
          <TituloColuna id="cabecalhoHorarios" label={horarioUsuario} />
          <TituloColuna id={index} label={diasSemana[index].valor} />
        </div>
      );
    } else if (isTablet) {
      return (
        <div className="titles">
          <TituloColuna id="cabecalhoHorarios" label={horarioUsuario} />

          {diasSemana.map((value, index) => (
            <TituloColuna id={index} label={value.valor.substring(0, 3)} />
          ))}
          {/* <TituloColuna id={index} label={diasSemana[index].valor.substring(0,3)} /> */}
        </div>
      );
    }
    return (
      <div className="titles">
        <TituloColuna
          id="cabecalhoHorarios"
          label={"Horario - " + horarioUsuario}
        />

        {diasSemana.map((value, index) => (
          <TituloColuna id={index} label={value.valor} />
        ))}
      </div>
    );
  }
};

// Vai montar cada caixa individual do cabeçalho. Uma dessas caixas informará o período do aluno.
export const TituloColuna = ({ id, label }) => {
  return (
    <div key={id} className="grid-columns-header">
      <p>{label}</p>
    </div>
  );
};
