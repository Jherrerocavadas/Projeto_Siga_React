import React, { useState } from 'react'
import { MateriaField } from './MateriaField'

export const SelecaoMateriaField = ({aulaSelecionada, disciplinas}) => {
 const count = 2
const [selectedMateria, SetSelectedMateria] = useState("ss")

if(disciplinas != undefined || disciplinas != null || disciplinas != []){
  var disciplinasEspeciais = []

disciplinas.forEach(disciplina => {
  if(!disciplina.isDisciplinaEspecial)
  disciplinasEspeciais.push(disciplina)
});

  return (
    <div>
      <div class="Selecao-materia-field">
        {disciplinas.map((value, index) => <MateriaField
          key={value.codDisciplina}
          label={value.nomeDisciplina.length > 12 ? value.siglaDisciplina : value.nomeDisciplina}
          isClickable={true}
          action={(e) => {
            SetSelectedMateria(value.codDisciplina)
          }} />)}
      </div>

      <div>
        <div class="Materias-especiais-field">
          <MateriasEspeciaisField disciplinasEspeciais={disciplinasEspeciais}/>
        </div>

      </div>
    </div>
  )
}
}




export function MateriasEspeciaisField({disciplinasEspeciais}) {
  return disciplinasEspeciais.map((value, index) => <MateriaField
  key={value.codDisciplina}
  label={value.nomeDisciplina.length > 12? value.siglaDisciplina: value.nomeDisciplina}
  isClickable={true}
  action={(e) =>{
    alert("Disciplina Registrada!")
  }}/>)
}
