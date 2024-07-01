
import { ElementGrid } from "../Grid/ElementGrid";
import "./MateriasSelectionGridStyle.css"

export function MateriasSelectionGrid ({ value=null, disciplinasParaSelecionar, isClickable=true, action=undefined }){
  // const count = 2;
  // const [selectedMateria, SetSelectedMateria] = useState("ss");

  // TODO: inserir ações para registrar matéria
  function handleAction(e) {
    if(action){
      action(e.target.value)
      alert("Disciplina Registrada!");
    }
    else{
      alert("Sem ação para realizar!");
    }
    
  }


  // if (disciplinasParaSelecionar !== undefined && disciplinasParaSelecionar !== null && disciplinasParaSelecionar != []) {
    if (disciplinasParaSelecionar !== undefined && disciplinasParaSelecionar !== null && disciplinasParaSelecionar.length > 0) {
    console.log("CADE VOCÊ?", disciplinasParaSelecionar)
    return (
      <div className="materias-selection-grid-container">
        {disciplinasParaSelecionar}
           
          
        
      </div>
    );
  }
};

export function MateriasEspeciaisField({ disciplinasEspeciais, action=undefined, isClickable=true }) {

  function handleAction(e){
    if(action){
      action(e)
      alert("Disciplina Registrada!");
    }
    else{
      alert("Sem ação para realizar!");
    }
      
    
  }

  if(disciplinasEspeciais !== null && disciplinasEspeciais !== undefined)
   { return (
      <div className="materias-especiais-grid-container">
        {disciplinasEspeciais.map((value, index) => (
          <ElementGrid
          elementGridKey={value.codDisciplina}
            label={
              value.nomeDisciplina.length > 12
                ? value.siglaDisciplina
                : value.nomeDisciplina
            }
            isClickable={isClickable}
            action={handleAction}
          />
        ))}
      </div>
    );   }
}
