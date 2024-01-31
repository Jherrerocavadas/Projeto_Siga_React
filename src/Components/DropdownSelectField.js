
import React from 'react'

export default function DropdownSelectField({key, dropboxOptions, placeholder="placeholder", placeholderValue, setter}) {
  
    var dropboxOptionElements = []
    dropboxOptions.forEach((dropboxOption, index) => {
        dropboxOptionElements.push(<option value={dropboxOption.value} key={key + index+1}>{dropboxOption.label}</option>)
    })
  
  
  
  
  
    return (
    <select class="dropbox" key={key} onChange={(e) => setter(e.target.value)}>
        <option value= {placeholderValue? placeholderValue: ""} key={key + 0}>{placeholder}</option>
        {dropboxOptionElements}
    </select>
  )
}
