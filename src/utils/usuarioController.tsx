import { api_usuarios } from "./utils";
import { LoginRequest } from "../interfaces/usuario";

export async function realizarLogin(loginRequest: LoginRequest){
    const headers = {'X-System-Cod' : 'WEB'}
    console.warn(process.env.REACT_APP_BASE_URL_AUTH)
    api_usuarios.post(`/usuarios/autenticar`, 
      loginRequest,
      {headers}
    )
    .then((response) => {
        // api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        console.warn("CAIU AQUI: ", response.data)
        return response.data;
    })
    .catch((error) => {
      console.warn("Erro ao realizar login!");
      console.error(error);
      return error
    });
}
