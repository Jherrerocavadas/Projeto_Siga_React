import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { HorarioAula } from '../pages/HorarioAula';
import { Matricula } from '../pages/Matricula';
import { NotFound } from '../pages/NotFound';
import { Home } from '../pages/Home';
import HomeLogado from '../pages/HomeLogado/HomeLogado';

function SignedRoutes(){
  return (
    <Routes>
       <Route path="*" element={<NotFound />} />
      <Route path="/" element={<HomeLogado />} />
      <Route path="/matricula" element={<Matricula />} />
      <Route path={"/horario-cursos/:siglaCurso"} element={<HorarioAula />} />
      <Route path="/avisos" element={<Matricula />} />
      <Route path="/seu-horario" element={<HorarioAula />} />
      <Route path="/material-de-aula" element={<Matricula />} />
      <Route path="/suas-notas" element={<Matricula />} />
      <Route path="/suas-ausencias" element={<Matricula />} />
      <Route path="/seu-historico" element={<Matricula />} />
      <Route path="/calendario-academico" element={<Matricula />} />
      <Route path="/emissao-de-documentos" element={<Matricula />} />
    </Routes>
  );
};

export default SignedRoutes;