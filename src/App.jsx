// import './App.css';
import './styles/global.css';
import './styles/BurgerMenu.css';
import './styles/ButtonStyle.css'

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes"
import { Sidebar } from './Components/Sidebar';
import { AuthProvider } from './contexts/auth';
import { ErrorProvider } from './contexts/errors';

function App() {
  return (
    <ErrorProvider>
      <div className="App" id="outer-container">
        <AuthProvider>
          <BrowserRouter>

            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            <div id="page-wrap">
              <Routes />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </ErrorProvider>
  );
}

export default App;
