import React, { createContext, useState, useEffect, useContext } from 'react';
import {realizarLogin} from "../utils/usuarioController"
import { UsuarioRequest, AlunoResponse, ProfessorResponse} from "../interfaces/usuario";
import { api_usuarios } from '../utils/utils';
import { useNavigate } from 'react-router';

interface AuthContextData {
  isAuthenticated: boolean;
  user: AlunoResponse | ProfessorResponse | null;
  Login(user: object): Promise<void>;
  Logout(): void;
  loginType: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export function AuthProvider({children}){
    const [user, setUser] = useState<object | null>(null);
    const [loginType, setLoginType] = useState<string | null>(null);

    // useEffect(() => {
    //     const storagedUser = sessionStorage.getItem('@App:user');
    //     const storagedToken = sessionStorage.getItem('@App:token');
    
    //     if (storagedToken && storagedUser) {
    //       setUser(JSON.parse(storagedUser));
    //       api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    //     }
    //   }, []);

    async function Login(userData: UsuarioRequest) {


        console.warn(process.env.REACT_APP_BASE_URL_AUTH)
        api_usuarios.post(`/usuarios/autenticar`, {
          nome: userData.nome,
          login: userData.login,
          senha: userData.senha,
          email: userData.email,
          tipoUsuario: userData.tipoUsuario,
        })
        .then((response) => {
            // api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
            console.warn("TESTE AQUI: ", response.data)
            setUser(response.data);
            setLoginType(userData.tipoUsuario)
            return response.data;
        })
        .catch((error) => {
          console.warn("Erro ao realizar login!");
          console.error(error);
          return error
        });


        // const response = await realizarLogin(userData);
    
        // console.warn("PASSOU LOGIN: ", response)
        // setUser(response);
       
    
        // sessionStorage.setItem('@App:user', JSON.stringify(response.user));
        // sessionStorage.setItem('@App:token', response.token);
      }
    
    function Logout() {
      
        setUser(null);

      }
    
      return (
        <AuthContext.Provider
          value={{ isAuthenticated: Boolean(user), user, Login, Logout, loginType }}
        >
          {children}
        </AuthContext.Provider>
      );
    };
    
    export function useAuth() {
      const context = useContext(AuthContext);
    
      return context;
    }