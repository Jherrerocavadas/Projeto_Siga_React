import React from "react";
import { Routes, Route } from "react-router-dom";

import { HorarioAula } from '../Pages/HorarioAula';
import { Matricula } from '../Pages/Matricula';
import { NotFound } from '../Pages/NotFound';
import { Home } from '../Pages/Home';
import {Login, LoginProfessor, LoginAluno} from '../Pages/Login';

function PublicRoutes(){
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} /> {/*Por hora*/}
      {/* <Route path="/matricula" element={<Matricula />} /> */}
      <Route path={"/horario-cursos/:siglaCurso"} element={<HorarioAula />} />
      <Route path={"/horario-cursos"} element={<HorarioAula />} />{/*Por hora*/}
      <Route path={"/login"} element={<Login />} />
      <Route path={"/login/professor"} element={<LoginProfessor/>} />
      <Route path={"/login/aluno"} element={<LoginAluno />} />
    </Routes>
  );
};

export default PublicRoutes;
