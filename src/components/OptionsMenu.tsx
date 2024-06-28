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
                    label={funcionalidade.label + (funcionalidade.normalizedValue? funcionalidade.normalizedValue: funcionalidade.value)}
                    action={(e) => {
                        if(funcionalidade.action){
                            funcionalidade.action()
                        alert(funcionalidade.callbackText)
                        }
                        else{
                            
                        alert("Sem função, parça")
                        }
                        
                    }}
                    disabled={funcionalidade.disabled? funcionalidade.disabled : false} />
            )
        }
        else if(funcionalidade.type == "Dropbox"){
            // if(funcionalidade.isVisible){
                opcoes.push(
                    <DropdownSelectField
                    key={funcionalidade.key}
                    dropboxOptions={funcionalidade.value}
                    placeholder={funcionalidade.label}
                    setter={funcionalidade.action}
                    disabled={funcionalidade.disabled}/>
            )
            // }
          
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
        <div className="Filters-field">
            {opcoes}
        </div>
    )
}
