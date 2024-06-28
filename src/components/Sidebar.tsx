import React from 'react'
import { slide as Menu } from "react-burger-menu";
import { Link } from 'react-router-dom'
import {AccountDetailsAluno, AccountDetailsProfessor} from './AccountDetails';
import { useAuth } from '../contexts/auth';
import ExternalLink from './ExternalLink';

export function Sidebar({children}) {
  const {isAuthenticated, userDataResponse, loginType, Logout} = useAuth();

  function handleLogout(){
    Logout()
  }


  //Implementação da barra vertical comum para todas as páginas
  if(isAuthenticated && (userDataResponse?.tipoUsuario == "ALUNO")){
    return (
      <Menu {...Sidebar}>

    <AccountDetailsAluno user={userDataResponse}></AccountDetailsAluno>
    <ul>
        <li> <Link to={"/"}>Página Inicial</Link></li>
        <li> <Link to={"/avisos"}>Avisos</Link></li>
        <li> <Link to={"/seu-horario"}>Seu Horário</Link></li>
        <li> <Link to={"/material-de-aula"}>Material de Aulas</Link></li>
        <li> <Link to={"/suas-notas"}>Suas Notas</Link></li>
        <li> <Link to={"/suas-ausencias"}>Suas Ausências</Link></li>
        <li> <Link to={"/seu-historico"}>Seu Histórico</Link></li>
        <li> <Link to={"/calendario-academico"}>Calendário Acadêmico</Link></li>
        <li> <ExternalLink to={"https://sites.google.com/view/secretariavirtualfatec/home"}>Secretaria</ExternalLink></li>
        <li> <Link to={"/emissao-de-documentos"}>Emissão de Documentos</Link></li>
        <li> <ExternalLink to={"/horario-cursos/DMD"}>Email Institucional</ExternalLink></li>
        <li> <Link to={"/"} onClick={handleLogout}>Sair</Link></li>
        </ul>

    </Menu>
    )
  }

  else if(isAuthenticated &&  (userDataResponse?.tipoUsuario == "PROFESSOR")){
    return (
      <Menu {...Sidebar}>

    <AccountDetailsProfessor user={userDataResponse}></AccountDetailsProfessor>
    <ul>
        <li> <Link to={"/"}>Página Inicial</Link></li>
        <li> <Link to={"/horario-cursos/DMD"}>Avisos</Link></li>
        <li> <Link to={"/horario-cursos/DMD"}>Seu Horário</Link></li>
        <li> <Link to={"/horario-cursos/DMD"}>Material de Aulas</Link></li>
        <li> <Link to={"/horario-cursos/DMD"}>Suas Aulas</Link></li>
        <li> <ExternalLink to={"https://sites.google.com/view/secretariavirtualfatec/home"}>Secretaria</ExternalLink></li>
        <li> <Link to={"/horario-cursos/DMD"}>Calendário Acadêmico</Link></li>
        <li> <Link to={"/horario-cursos/DMD"}>Emissão de Documentos</Link></li>
        <li> <Link to={"/horario-cursos/DMD"}>Email Institucional</Link></li>
        <li> <Link to={"/"} onClick={handleLogout}>Sair</Link></li>
        </ul>

    </Menu>
    )
  }
  return (
    <Menu {...Sidebar}>
    
    <ul>
        
        <li><Link to={"/"}>Página inicial</Link></li>
        <li><Link to={"/login"}>Área Restrita</Link></li>
        <li><Link to={"/instituicao"}>Instituição</Link></li>
        <li> <ExternalLink to={"https://sites.google.com/view/secretariavirtualfatec/home"}>Secretaria</ExternalLink></li>
        <li><ExternalLink to={"https://siga.cps.sp.gov.br/aluno/login.aspx"}>SIGA Atual</ExternalLink></li>
        <li><ExternalLink to={"http://www.fatec.sp.gov.br/view/Default.aspx"}>Email Institucional</ExternalLink></li>
        <li><Link to={"/horario-cursos"}>Grade Horário</Link></li>
        <li><Link to={"/calendario-academico"}>Calendário Acadêmico</Link></li>
        <li><Link to={"/fale-conosco"}>Fale Conosco</Link></li>
        <li><Link to={"/estude-conosco"}>Estude Conosco</Link></li>
        <li><Link to={"/faq"}>FAQ</Link></li>
      
        </ul>

    </Menu>
  )
}
