import React from 'react'


export function TextBox({key, label, bgColor="#225522"}) {
    return (
        <p className="Text-Box" style={{backgroundColor: bgColor}} key={key}>{label}</p>
    )
}
