import React from 'react'

function complementTextColor(bgColor, lightColor, darkColor) {
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
      darkColor : lightColor;
  }

export function MateriaField ({key, label, bgColor="#0000ff", isClickable=false, action}) {
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
        <p class="hora_aula" style={{backgroundColor: bgColor, color: complementTextColor(bgColor, "#fff", "#000")}} key={key}>{label}</p>
    )
}
