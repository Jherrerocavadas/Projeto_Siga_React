import './App.css';
import { HorarioAula } from './Pages/HorarioAula';
import { Matricula } from './Pages/Matricula';

import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {


  return (
    <BrowserRouter>


    <Routes>
    <Route path="/" exact element={<Matricula/>} /> {/*Por hora*/}
      <Route path="/matricula" exact element={<Matricula/>} />
      <Route path={"/horario-cursos/:siglaCurso"} element={<HorarioAula/>} />

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
