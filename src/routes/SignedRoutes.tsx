import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { HorarioAula } from '../pages/HorarioAula';
import { SeuHorario } from '../pages/SeuHorario';
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
      <Route path="/avisos" element={<NotFound />} />
      <Route path="/seu-horario" element={<SeuHorario />} />
      <Route path="/material-de-aula" element={<NotFound />} />
      <Route path="/suas-notas" element={<NotFound />} />
      <Route path="/suas-ausencias" element={<NotFound />} />
      <Route path="/seu-historico" element={<NotFound />} />
      <Route path="/calendario-academico" element={<NotFound />} />
      <Route path="/emissao-de-documentos" element={<NotFound />} />
    </Routes>
  );
};

export default SignedRoutes;