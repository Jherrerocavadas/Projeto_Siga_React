import React from 'react'
import { complementTextColor } from '../utils/utils'

export function MateriaField ({key, label, bgColor="#0000ff", isClickable=false, action, tamanho= "10.8vw"}) {
    if(isClickable){
        return (
                <button class="Materia-disponivel button" style={{backgroundColor: bgColor, color: complementTextColor(bgColor, "#fff", "#000")}} onClick={action} key={key}>
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
        <p class="hora_aula" style={{backgroundColor: bgColor, color: complementTextColor(bgColor, "#fff", "#000"),
        width: tamanho}} key={key}>{label}</p>
    )
}
