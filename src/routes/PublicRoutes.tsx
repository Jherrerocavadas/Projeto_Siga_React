import React from "react";
import { Routes, Route } from "react-router-dom";

import { HorarioAula } from '../pages/HorarioAula';
import { Matricula } from '../pages/Matricula';
import { NotFound } from '../pages/NotFound';
import { Home } from '../pages/Home';
import {LoginSelector, LoginBase} from '../pages/Login/Login';

function PublicRoutes(){
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} /> {/*Por hora*/}
      {/* <Route path="/matricula" element={<Matricula />} /> */}
      <Route path={"/horario-cursos/:siglaCurso"} element={<HorarioAula />} />
      <Route path={"/horario-cursos"} element={<HorarioAula />} />{/*Por hora*/}
      <Route path={"/login"} element={<LoginSelector />} />
      <Route path={"/login/professor"} element={<LoginBase tipoUsuario="Professor"/>} />
      <Route path={"/login/aluno"} element={<LoginBase tipoUsuario="Aluno"/>} />
    </Routes>
  );
};

export default PublicRoutes;
