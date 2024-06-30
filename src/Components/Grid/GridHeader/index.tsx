import ClickableField from "../../ClickableField";
import Dropdown from "../../Dropdown";
import TextBox from "../../TextBox";
import "./GridHeaderStyle.css";

export interface IHeaderItem {
  type: string;
  key: string;
  label: string;
  value: any;
  action?: any;
  callbackText?: string;
  placeholderValue?: any;
  normalizedValue?: string;
  disabled?: boolean;
}

export interface IHeaderItemList extends Array<IHeaderItem>{}

export default function GridHeader({ headerItens }) {
  var opcoes = [];
  headerItens.forEach((headerItem, index) => {
    if (headerItem.type === "Button") {
      opcoes.push(
        <ClickableField
          clickableFieldKey={headerItem.key}
          label={
            headerItem.label +
            (headerItem.normalizedValue
              ? headerItem.normalizedValue
              : headerItem.value)
          }
          action={(e) => {
            if (headerItem.action) {
              headerItem.action();
              alert(headerItem.callbackText);
            } else {
              alert("Sem função, parça");
            }
          }}
          disabled={headerItem.disabled ? headerItem.disabled : false}
        />
      );
    } else if (headerItem.type === "Dropbox") {
      // if(headerItem.isVisible){
      opcoes.push(
        <Dropdown
          dpbKey={headerItem.key}
          dropboxOptions={headerItem.value}
          placeholder={headerItem.label}
          placeholderValue={headerItem.placeholderValue}
          setter={headerItem.action}
          disabled={headerItem.disabled}
        />
      );
      // }
    } else if (headerItem.type === "Text") {
      opcoes.push(
        <TextBox
          textBoxKey={headerItem.key}
          label={headerItem.label + headerItem.value}
        />
      );
    }
  });

  return <div className="grid-header">{opcoes}</div>;
}
