// import './App.css';
import './styles/global.css';
import './styles/BurgerMenu.css';


import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Sidebar } from './Components/Sidebar';

import { HorarioAula } from './Pages/HorarioAula';
import { Matricula } from './Pages/Matricula';
import { NotFound } from './Pages/NotFound';
import { Home } from './Pages/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App" id="outer-container">
        <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        <div id="page-wrap">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" exact element={<Home />} /> {/*Por hora*/}
            <Route path="/matricula" exact element={<Matricula />} />
            <Route path={"/horario-cursos/:siglaCurso"} element={<HorarioAula />} />
            <Route path={"/horario-cursos"} element={<HorarioAula />} /> {/*Por hora*/}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
