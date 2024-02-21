// import './App.css';
import './styles/global.css';
import { HorarioAula } from './Pages/HorarioAula';
import { Matricula } from './Pages/Matricula';
import { NotFound } from './Pages/NotFound';

import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {


  return (
    <BrowserRouter>


    <Routes>
      <Route path= "*" element={<NotFound/>} />
      <Route path="/" exact element={<Matricula/>} /> {/*Por hora*/}
      <Route path="/matricula" exact element={<Matricula/>} />
      <Route path={"/horario-cursos/:siglaCurso"} element={<HorarioAula/>} />
      <Route path={"/horario-cursos"} element={<HorarioAula/>} /> {/*Por hora*/}     

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
