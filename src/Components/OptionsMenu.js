import React from 'react'
import ClickableField from './ClickableField'
import DropdownSelectField from './DropdownSelectField';

export default function OptionsMenu({ funcionalidades }) {
    var opcoes = []
    funcionalidades.forEach((funcionalidade, index) => {
        
        
        if(funcionalidade.type == "Button"){
            opcoes.push(
                <ClickableField
                    key={funcionalidade.key}
                    label={funcionalidade.label + funcionalidade.value}
                    action={(e) => {
                        funcionalidade.action(0)
                        alert(funcionalidade.callbackText)
                    }} />
            )
        }
        else if(funcionalidade.type == "Dropbox"){
            opcoes.push(
                    <DropdownSelectField
                    key={funcionalidade.key}
                    dropboxOptions={funcionalidade.value}
                    placeholder={funcionalidade.label}
                    setter={funcionalidade.action}/>
            )
        }
    });





    //   <DropdownSelectField
    //   masterKey={"dpd002"}
    //   dropboxOptions={dropdownPeriodo}
    //   placeholder={"Selecione um período: "}
    //   placeholderValue={"MANHA"}
    //   setter={setPeriodo}/>

    return (
        <div class="Filters-field">
            {opcoes}
        </div>
    )
}
