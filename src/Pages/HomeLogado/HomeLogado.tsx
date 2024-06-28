import React from 'react'
import './HomeLogadosStyle.css'
import { useAuth } from '../../contexts/auth'
import Avisos from '../../components/Avisos'
import AulasAlunoDetail from '../../components/AulasAlunoDetail'
import InfoEntregasDetail from '../../components/InfoEntregasDetail'

export default function HomeLogado() {
  const {userDataResponse} = useAuth()
  const dadosCurso = userDataResponse.dadosComplementares.curso
  const qtdSemestresCursados = userDataResponse.dadosComplementares.semestre-1

  //TODO: TOOLTIPS EXPLICANDO O QUE É PP E PR
  return (
   <div>
     <div className='info-gerais-container'>
      <div className='columns'>
      <span>RENDIMENTO NO CURSO:</span><br></br>
        PP: {userDataResponse.dadosComplementares.percentualProgressao}%<br></br>
        PR: {userDataResponse.dadosComplementares.percentualRendimento}%<br></br>
        Maior PR: XX%<br></br>
        PP(Intercâmbio): XX%<br></br>
        PR(Intercâmbio): XX%<br></br>
      </div>
      <div className='columns'>
      <span> PRAZO DE INTEGRALIZAÇÃO:</span><br></br>
        Cursado: {qtdSemestresCursados} semestres<br></br>
        Máximo: {dadosCurso.qtdSemestresIntegralizacao} semestres<br></br>
        Faltam: {dadosCurso.qtdSemestresIntegralizacao-qtdSemestresCursados} semestres<br></br>
        <br />
        Email institucional Fatec:<br></br>
        {userDataResponse.email}<br></br>
      </div>     
     </div>
     <div className='avisos-container'>
      <Avisos/>
     </div>
     <div className='entregas-wrapper'>
      <div className='aulas-container'>
      <AulasAlunoDetail/>
      </div>
      <div className='entregas-container'>
        <InfoEntregasDetail/>
      </div>
     </div>
   </div>


  )
}
