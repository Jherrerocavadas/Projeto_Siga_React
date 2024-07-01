import { complementTextColor } from '../../../utils'
import "./ElementGridStyle.css"

export function ElementGrid ({elementGridKey, label, bgColor=undefined, isClickable=false, action=null}) {

    //TODO: PENSAR EM COMO TRATAR ESSE BGCOLOR
    let style;
    if(bgColor !== undefined && bgColor !== null){

        style = {backgroundColor: bgColor, color: complementTextColor(bgColor, "#fff", "#000")}
    }
    else{
        style = {color: complementTextColor("#000", "#fff", "#000")}
    }

    if(isClickable){
        return (
                <button className="grid-element btn" style={style} onClick={action} key={elementGridKey}>
                {label}
                </button>
                
        ) 
    }
    

    // if(label.length > 13){
    //     //Exibir a sigla da matéria ao invés do nome completo
    //     return (
    //         <p className="hora_aula" key={key}>{label + 12}</p>
    //     )    
    // }
    return (
        <p className="grid-element" style={style} key={elementGridKey}>{label}</p>
    )
}
