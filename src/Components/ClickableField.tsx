
import React from 'react'

export default function ClickableField({clickableFieldKey, label, bgColor="#0000ff", action, disabled=false}) {

        return (
                <button className="Clickable-field button" onClick={action} key={clickableFieldKey} disabled={disabled}>
                {label}
                </button>
                
        ) 
    
}
