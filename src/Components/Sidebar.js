import React from 'react'
import { slide as Menu } from "react-burger-menu";
import { Link } from 'react-router-dom'

export function Sidebar({children}) {

  //Implementação da barra vertical comum para todas as páginas
  return (
    <Menu {...Sidebar}>
    
    <ul>
        
        <li><Link to={"/"}>Página inicial</Link></li>
        <li><Link to={"/login"}>Login</Link></li>
        <li><Link>Secretaria</Link></li>
        <li> <Link>SIGA Atual</Link></li>
        <li><Link>Email Institucional</Link></li>
        <li> <Link to={"/horario-cursos/DMD"}>Horarios cursos - DMD</Link></li>
      
        </ul>

    </Menu>
  )
}
