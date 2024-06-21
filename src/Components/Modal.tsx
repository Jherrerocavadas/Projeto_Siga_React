import React from 'react'
import '../styles/Modal.css';

// export interface IModal{
//     title: string;
//     description: string;
//     closeLabel: string;
//     isOpen: boolean;
//     setOpen: (isOpen: boolean) => void;
//    }



export function ModalError({title, description, closeLabel = "Fechar", error, setClose}) {
    // if(isOpen){
        return (
            <div className="modal-backdrop">
                <section>
                <div className="modal-container">
                    <header>
                    <h2>{title}</h2>
                    </header>
                    <div className="error-msg">
                    <p>{description}</p>
                    </div>
                    <footer className="modal-close">
                    <button type="button" onClick={() =>
                    {    console.log(error);
                         setClose(null)}}>{closeLabel}</button>
                    </footer>
                </div>
                </section>
            </div>
          )
    // }
    // return <></>
    }
     

export function Modal({mensagem}) {
    return (
      <div>{mensagem}</div>
    )
  }
  
