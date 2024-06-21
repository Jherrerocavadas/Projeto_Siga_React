import React from 'react'

export default function Button({type, label, disabled=false, action, isSubmit=false}) {

  function handleAction(e) {
    if(action){
      
      action(e)
    }
    else{
      console.log("Botão sem função executada!")
    }

  }
  if(isSubmit){
    if(type === "primary"){
      return (
          <button type='submit' className='PrimaryButton' disabled={disabled} onClick={handleAction}>{label}</button>
        )
    }
    else if(type === "destructive"){
      return (
          <button type='submit' className='DestructiveButton' disabled={disabled} onClick={handleAction}>{label}</button>
        )
    }
    return (
      <button type='submit' className='SecondaryButton' disabled={disabled} onClick={handleAction}>{label}</button>
    )
  }
  else{
    if(type === "primary"){
      return (
          <button className='PrimaryButton' disabled={disabled} onClick={handleAction}>{label}</button>
        )
    }
    else if(type === "destructive"){
      return (
          <button  className='DestructiveButton' disabled={disabled} onClick={handleAction}>{label}</button>
        )
    }
    return (
      <button  className='SecondaryButton' disabled={disabled} onClick={handleAction}>{label}</button>
    )
  }
  
  
   
   
}
