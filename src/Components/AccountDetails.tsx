import React from "react";
import "../styles/BurgerMenu.css";
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
          <AccountPhoto userPhoto={user.fotoUsuario} />
          <div className="accountDetailsText">
            <span id="faculdade">{user.dadosComplementares.faculdade.nomeFaculdade} <br /></span>
            <span>Curso: {user.dadosComplementares.curso.nomeCurso} <br /></span>
            <span>RA: {user.dadosComplementares.numMatricula}  Semestre: {user.dadosComplementares.semestre}</span>
            
          </div>
        </div>
      </div>
    );
}

export function AccountDetailsProfessor({user}) {
  return (
    <div>
      <div>
        <AccountPhoto userPhoto={user.fotoUsuario} />
        <div className="accountDetailsText">
        <span id="faculdade">{user.dadosComplementares.faculdades[0].nomeFaculdade} <br /></span>
        <span>Matrícula: {user.dadosComplementares.numMatricula}</span>
          
        </div>
      </div>
    </div>
  );
}
