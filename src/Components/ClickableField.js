
import React from 'react'

export default function ClickableField({key, label, bgColor="#0000ff", action}) {

        return (
                <button class="Clickable-field button" onClick={action} key={key}>
                {label}
                </button>
                
        ) 
    
}
