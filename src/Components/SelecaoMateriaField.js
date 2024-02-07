import React from "react";
import { MateriaField } from "./MateriaField";

export const SelecaoMateriaField = ({ value, disciplinas, isClickable, action }) => {
  // const count = 2;
  // const [selectedMateria, SetSelectedMateria] = useState("ss");

  // TODO: inserir ações para registrar matéria
  function handleAction(e) {
    if(action){
      action(e)
      alert("Disciplina Registrada!");
    }
    else{
      alert("Sem ação para realizar!");
    }
    
  }


  if (disciplinas !== undefined || disciplinas !== null || disciplinas != []) {
    return (
      <div class="Selecao-materia-field">
        {disciplinas.map((value, index) => {
          if (value.isDisciplinaEspecial) {
            <MateriaField
              key={value.codDisciplina}
              label={
                value.nomeDisciplina.length > 12
                  ? value.siglaDisciplina
                  : value.nomeDisciplina
              }
              isClickable={isClickable}
              action={handleAction}
            />;
          }
        })}
      </div>
    );
  }
};

export function MateriasEspeciaisField({ disciplinasEspeciais, action, isClickable }) {

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
      <div class="Materias-especiais-field">
        {disciplinasEspeciais.map((value, index) => (
          <MateriaField
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
