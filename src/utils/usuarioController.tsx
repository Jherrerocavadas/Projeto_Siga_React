import { api_usuarios } from "./utils";
import { UsuarioRequest } from "../interfaces/usuario";

export async function realizarLogin(usuario: UsuarioRequest){
    console.warn(process.env.REACT_APP_BASE_URL_AUTH)
    api_usuarios.post(`/usuarios/autenticar`, {
      nome: usuario.nome,
      login: usuario.login,
      senha: usuario.senha,
      email: usuario.email,
      tipoUsuario: usuario.tipoUsuario,
    })
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
