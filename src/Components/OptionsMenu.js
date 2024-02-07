import React from 'react'
import ClickableField from './ClickableField'
import DropdownSelectField from './DropdownSelectField';
import { TextBox } from './TextBox';

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

        else if(funcionalidade.type == "Text"){
            opcoes.push(
                <TextBox
                 key={funcionalidade.key}
                 label={funcionalidade.label + funcionalidade.value}
                />
            )
        }
    });



    return (
        <div class="Filters-field">
            {opcoes}
        </div>
    )
}
