import React, { useEffect, useState } from 'react'
import "../styles/GradeHorarioStyle.css"
import { getLabelsDiasSemana } from '../utils/utils'


//Vai montar o Cabeçalho do grid.
// A ideia é verificar o período do aluno e inserir ou não a aula de Sábado (talvez não dê pra implementar)
export const CabecalhoAula = ({horarioUsuario, diasSemana}) => {

// const [diasSemana, setDiasSemana] = useState([])

//   useEffect(()=>{
//     getLabelsDiasSemana().then((response)=>
//         {
//           setDiasSemana(response)
//         }).catch((error)=>{
//           console.log("ErroLabelsDiasSemana: " + error)
//         })
//   }, {}) 

  return (
    <div class="titles">
    <TituloColuna label= {"Horario - " + horarioUsuario} />

    {diasSemana.map((value, index) => <TituloColuna id={index} label={value} />)}

  </div>  
  )
}


// Vai montar cada caixa individual do cabeçalho. Uma dessas caixas informará o período do aluno.
export const TituloColuna = ({id, label}) => {
  return (
    <div class="hora_aula days">
    <p>{label}</p>
    </div>
  )
}

