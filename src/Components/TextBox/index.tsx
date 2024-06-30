import "./TextBoxStyle.css"

export default function TextBox({textBoxKey, label, bgColor=undefined}) {
    let style;
    if(bgColor!==undefined){
       style = {backgroundColor: bgColor}
    }
    return (
        <p className="textbox" style={style} key={textBoxKey}>{label}</p>
    )
}
