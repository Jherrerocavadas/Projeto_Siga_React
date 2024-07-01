import { api } from "../utils";

export async function listarFaculdades() {
    return api.get('/faculdades')
    .then(async (response)=>
            {
                
               return response.data     
            })
            .catch((error)=>{
                console.log(error)
            })

    
}
