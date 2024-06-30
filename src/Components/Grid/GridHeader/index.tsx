import ClickableField from "../../ClickableField";
import Dropdown from "../../Dropdown";
import TextBox from "../../TextBox";
import "./GridHeaderStyle.css";

export interface Funcionalidade {
  type: string;
  key: string;
  label: string;
  value: any;
  action?: any;
  callbackText?: string;
  placeholderValue?: any;
}

export interface FuncionalidadeList extends Array<Funcionalidade>{}

export default function GridHeader({ funcionalidades }) {
  var opcoes = [];
  funcionalidades.forEach((funcionalidade, index) => {
    if (funcionalidade.type === "Button") {
      opcoes.push(
        <ClickableField
          clickableFieldKey={funcionalidade.key}
          label={
            funcionalidade.label +
            (funcionalidade.normalizedValue
              ? funcionalidade.normalizedValue
              : funcionalidade.value)
          }
          action={(e) => {
            if (funcionalidade.action) {
              funcionalidade.action();
              alert(funcionalidade.callbackText);
            } else {
              alert("Sem função, parça");
            }
          }}
          disabled={funcionalidade.disabled ? funcionalidade.disabled : false}
        />
      );
    } else if (funcionalidade.type === "Dropbox") {
      // if(funcionalidade.isVisible){
      console.log("placeholder: ", funcionalidade.placeholderValue, "FUN:", funcionalidade)
      opcoes.push(
        <Dropdown
          dpbKey={funcionalidade.key}
          dropboxOptions={funcionalidade.value}
          placeholder={funcionalidade.label}
          placeholderValue={funcionalidade.placeholderValue}
          setter={funcionalidade.action}
          disabled={funcionalidade.disabled}
        />
      );
      // }
    } else if (funcionalidade.type === "Text") {
      opcoes.push(
        <TextBox
          textBoxKey={funcionalidade.key}
          label={funcionalidade.label + funcionalidade.value}
        />
      );
    }
  });

  return <div className="grid-header">{opcoes}</div>;
}
