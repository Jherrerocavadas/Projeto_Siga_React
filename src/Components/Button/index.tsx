import React from "react";
import "./ButtonStyle.css";

export default function Button({
  btnKey,
  type,
  label,
  disabled = false,
  action,
  isSubmit = false,
}) {
  function handleAction(e) {
    if (action) {
      action(e);
    } else {
      console.log("Botão sem função executada!");
    }
  }
  const isHeaderBtn = type.match("header");
  const style = type.replace("header-", "");
  const btnClass = "btn" + (isHeaderBtn ? "-header " : " ") + style;
  // console.log("btnClass é: ", btnClass);

  return (
    <button
    key={btnKey}
      type={isSubmit ? "submit" : null}
      className={btnClass}
      disabled={disabled}
      onClick={handleAction}
    >
      {label}
    </button>
  );

  // if(isSubmit){
  // if(type === "secondary"){
  //   return (
  //       <button type={isSubmit? 'submit' : null} className='SecondaryButton' disabled={disabled} onClick={handleAction}>{label}</button>
  //     )
  // }

  // else if(type === "header-primary"){
  //   return (
  //       <button type={isSubmit? 'submit' : null} className='btn-header primary' disabled={disabled} onClick={handleAction}>{label}</button>
  //     )
  // }

  // else if(type === "destructive"){
  //   return (
  //       <button type={isSubmit? 'submit' : null} className='DestructiveButton' disabled={disabled} onClick={handleAction}>{label}</button>
  //     )
  // }
  // return (
  //   <button type={isSubmit? 'submit' : null} className='btn primary' disabled={disabled} onClick={handleAction}>{label}</button>
  // )
  // }
  // else{
  //   if(type === "secondary"){
  //     return (
  //         <button className='SecondaryButton' disabled={disabled} onClick={handleAction}>{label}</button>
  //       )
  //   }
  //   else if(type === "header-primary"){
  //     return (
  //         <button type='submit' className='btn-header primary' disabled={disabled} onClick={handleAction}>{label}</button>
  //       )
  //   }
  //   else if(type === "destructive"){
  //     return (
  //         <button  className='DestructiveButton' disabled={disabled} onClick={handleAction}>{label}</button>
  //       )
  //   }
  //   return (
  //     <button  className='btn primary' disabled={disabled} onClick={handleAction}>{label}</button>
  //   )
  // }
}
