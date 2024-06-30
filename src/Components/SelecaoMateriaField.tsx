import React from "react";
import { ElementGrid } from "./Grid/ElementGrid";

export function SelecaoMateriaField ({ value=null, disciplinasParaSelecionar, isClickable=true, action=undefined }){
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
  if (disciplinasParaSelecionar !== undefined && disciplinasParaSelecionar !== null && disciplinasParaSelecionar.length < 1) {
    return (
      <div className="Selecao-materia-field">
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
      <div className="Materias-especiais-field">
        {disciplinasEspeciais.map((value, index) => (
          <ElementGrid
            key={value.codDisciplina}
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
