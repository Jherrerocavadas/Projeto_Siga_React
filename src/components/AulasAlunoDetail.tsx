import React from 'react'
import { getDisciplinasDeHoje } from '../api/aluno/disciplinaAlunoController';
import { useAuth } from '../contexts/auth';

export default function AulasAlunoDetail() {
    const {userDataResponse} = useAuth()

    getDisciplinasDeHoje(userDataResponse.dadosComplementares.numMatricula)
    
    const listaAulas = [
        {horario_inicio: "9h30", horario_final: "10h20", disciplina: "Matemática discreta"},
        {horario_inicio: "10h20", horario_final: "11h10", disciplina: "bdfdfd discreta"},
        {horario_inicio: "11h20", horario_final: "12h10", disciplina: "sfdfsd discreta"},
        {horario_inicio: "12h10", horario_final: "13h00", disciplina: "Matesdfsfdmática sdfsd"},
        {horario_inicio: "9h30", horario_final: "10h20", disciplina: "Matemdfsfdsática sfd"},
        {horario_inicio: "9h30", horario_final: "10h20", disciplina: "Matemática discreta"},
        {horario_inicio: "9h30", horario_final: "10h20", disciplina: "Matemática discreta"},
        {horario_inicio: "9h30", horario_final: "10h20", disciplina: "Matemática discreta"}
    ]

    listaAulas.map(aula => {
        return aula;
    });

    const aulasSize = listaAulas.length


    if(aulasSize === 0){
        return (
            <div>Você não possui aulas hoje.</div>
        )
    }
    return (
        <div>{listaAulas.map(aula => {
            
            return(<li>
                {aula.horario_inicio} - {aula.horario_final}: {aula.disciplina}
                
            </li>);
        })}</div>
    )
}
