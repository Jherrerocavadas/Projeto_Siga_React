
import React from 'react'

export default function ClickableField({key, label, bgColor="#0000ff", action, disabled=false}) {

        return (
                <button className="Clickable-field button" onClick={action} key={key} disabled={disabled}>
                {label}
                </button>
                
        ) 
    
}
