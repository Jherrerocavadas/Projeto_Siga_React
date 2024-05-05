import React from 'react'

export default function Button({type, label, disabled=false, action}) {

  function handleAction(e) {
    if(action){
      
      action(e)
    }
    else{
      console.log("Botão sem função executada!")
    }

  }

  if(type == "primary"){
    return (
        <button className='PrimaryButton' disabled={disabled} onClick={handleAction}>{label}</button>
      )
  }
  else if(type == "destructive"){
    return (
        <button  className='DestructiveButton' disabled={disabled} onClick={handleAction}>{label}</button>
      )
  }
  return (
    <button  className='SecondaryButton' disabled={disabled} onClick={handleAction}>{label}</button>
  )
   
   
}
