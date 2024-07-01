import React from 'react'
import "../styles/ErroStyle.css"
import "../styles/auth_window.css"
import { Link } from 'react-router-dom'

export function NotFound({}) {
  return (
    <div className="error">
        <h1>Ops, erro 404: essa página não existe :(</h1>
        <h2>Não se preocupe! talvez algum dos passos abaixo possa te ajudar:</h2>
        <ul>
        <li> Verifique se você digitou o endereço da página corretamente</li>
        <li> Tente limpar o cache da página</li>
        </ul>
            <span>Na dúvida? Vá para a <Link className="redirect" to={"/"}> Página inicial</Link></span>
       
        
    </div>
  )
}
