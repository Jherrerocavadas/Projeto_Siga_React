import React from 'react'

export const MateriaField = ({key, label, isClickable=false, action}) => {
    
    if(isClickable){
        return (
                <button class="Materia-disponivel button" onClick={action} key={key}>
                {label}
                </button>
                
        ) 
    }
    

    // if(label.length > 13){
    //     //Exibir a sigla da matéria ao invés do nome completo
    //     return (
    //         <p class="hora_aula" key={key}>{label + 12}</p>
    //     )    
    // }
    return (
        <p class="hora_aula" key={key}>{label}</p>
    )
}
