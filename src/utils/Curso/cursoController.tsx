import { api } from "../utils";

export async function listarCursos() {
    return api.get('/cursos')
    .then(async (response)=>
            {   
                return response.data     
            })
            .catch((error)=>{
                
                console.error("ListagemCurso:" + error)

            })
}
