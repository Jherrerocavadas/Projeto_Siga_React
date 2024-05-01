// import './App.css';
import './styles/global.css';
import './styles/BurgerMenu.css';


// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes"
import { Sidebar } from './Components/Sidebar';
import  {AuthProvider, useAuth} from './contexts/auth';

// import { HorarioAula } from './Pages/HorarioAula';
// import { Matricula } from './Pages/Matricula';
// import { NotFound } from './Pages/NotFound';
// import { Home } from './Pages/Home';
// import { Login, LoginProfessor, LoginAluno } from './Pages/Login';

function App() {

  // return (
  //   <BrowserRouter>
  //     <div className="App" id="outer-container">
  //       <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"}
  //        isAuthenticated={isAuthenticated}
  //        loginType={loginType}/>
  //       <div id="page-wrap">
  //         <Routes>
  //           <Route path="*" element={<NotFound />} />
  //           <Route path="/" exact element={<Home />} /> {/*Por hora*/}
  //           <Route path="/matricula" exact element={<Matricula />} />
  //           <Route path={"/horario-cursos/:siglaCurso"} element={<HorarioAula />} />
  //           <Route path={"/horario-cursos"} element={<HorarioAula />} /> {/*Por hora*/}
  //           <Route path={"/login"} element={<Login/>} />
  //           <Route path={"/login/professor"} element={<LoginProfessor/>} />
  //           <Route path={"/login/aluno"} element={<LoginAluno/>} />
  //         </Routes>
  //       </div>
  //     </div>
  //   </BrowserRouter>
  // );
  return (
    <div className="App" id="outer-container">
      <AuthProvider>
        <BrowserRouter>
      
        <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
        <div id="page-wrap">
          <Routes />
        </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
