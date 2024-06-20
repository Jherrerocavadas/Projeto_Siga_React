import React, { createContext, useState, useEffect, useContext } from 'react';
import { LoginRequest, LoginResponse} from "../interfaces/usuario";
import { api_usuarios } from '../utils/utils';
import { realizarLogin } from '../utils/usuarioController';

interface AuthContextData {
  isAuthenticated: boolean;
  userDataResponse: LoginResponse;
  Login(userData: object, tipoUsuario: string): Promise<void>;
  Logout(): void;
  loginType: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export function AuthProvider({children}){
    const [userDataResponse, setUserDataResponse] = useState<LoginResponse | null>(null);
    const [loginType, setLoginType] = useState<string | null>(null);

    useEffect(() => {
        const storagedUser = sessionStorage.getItem('@App:user');
        const storagedToken = sessionStorage.getItem('@App:token');
    
        if (storagedToken && storagedUser) {
          setUserDataResponse(JSON.parse(storagedUser));
          api_usuarios.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        }
      }, []);

    async function Login(loginRequest: LoginRequest, tipoUsuario: string) {
        const headers = {'X-System-Cod' : 'WEB'}

        console.warn(process.env.REACT_APP_BASE_URL_AUTH)
        api_usuarios.post(`/usuarios/autenticar/${tipoUsuario}`,
          loginRequest,
          {headers}
        )
        .then((response) => {
            api_usuarios.defaults.headers.Authorization = `Bearer ${response.data.tokenJwt}`;
            console.warn("TESTE AQUI: ", response.data)
            setUserDataResponse(response.data);
            setLoginType(tipoUsuario)
            sessionStorage.setItem('@App:user', JSON.stringify(response.data));
            sessionStorage.setItem('@App:token', response.data.tokenJwt);
            return response.data;
        })
        .catch((error) => {
          console.warn("Erro ao realizar login!");
          console.error(error);
          return error
        });


        // const response = await realizarLogin(loginRequest);
    
        // console.warn("PASSOU LOGIN: ", response)
        // setUserDataResponse(response);
       
    

      }
    
    function Logout() {
      
        setUserDataResponse(null);
        api_usuarios.defaults.headers.Authorization = null
        sessionStorage.removeItem('@App:user');
        sessionStorage.removeItem('@App:token');

      }
    
      return (
        <AuthContext.Provider
          value={{ isAuthenticated: Boolean(userDataResponse), userDataResponse, Login, Logout, loginType }}
        >
          {children}
        </AuthContext.Provider>
      );
    };
    
    export function useAuth() {
      const context = useContext(AuthContext);
    
      return context;
    }