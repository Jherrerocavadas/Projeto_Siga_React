import React from "react";
import "../styles/BurgerMenu.css";
import { AlunoResponse, ProfessorResponse } from "../interfaces/usuario";

function AccountPhoto({ userPhoto }) {
  return (
    <div>
      <img
        className="accountDetailsPhoto"
        src={userPhoto?'data:image/jpeg;base64,'+ userPhoto :"https://placehold.co/100x100"}
        alt="Foto do usuário"
      />
    </div>
  );
}

export function AccountDetailsAluno({user}) {
    console.log("USER:", user)
    return (
      <div>
        <div>
          <AccountPhoto userPhoto={user.usuario.fotoUsuario} />
          <div className="accountDetailsText">
            <span id="faculdade">{user.faculdade.nomeFaculdade} <br /></span>
            <span>Curso: {user.curso.nomeCurso} <br /></span>
            <span>RA: {user.numMatricula}  Semestre: {user.semestre}</span>
            
          </div>
        </div>
      </div>
    );
}

export function AccountDetailsProfessor(user: ProfessorResponse) {
  return (
    <div>
      <div>
        <AccountPhoto userPhoto="https://github.com/Jherrerocavadas.png" />
        <div className="accountDetailsText">
          {/* {user.faculdade}
        Curso:{user.curso}
        RA: {user.numMatricula}  Semestre: {user.semestre}
           */}
        </div>
      </div>
    </div>
  );
}
