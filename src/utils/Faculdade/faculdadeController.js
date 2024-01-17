import { api } from "../utils";
import { Alert } from 'react-native';


export async function inserirPessoa(navigation, nome, telefone){
    await api.get(`/pessoas/search?nome=${nome}&telefone=${telefone}` )
    .then((response)=>
            {
                if(response.data[0]){ // Array tem o objeto de usuário na primeira posição, logo ele já existe
                Alert.alert(
                    "Erro!",
                    "Pessoa já existente!"
                );
                }
                else{ // Array vazio, indicando que o usuário não existe
                api.post(`/pessoas` , {
                    nome: nome,
                    telefone: telefone,
                 
                
                }).then((response)=>{// Enviar dados do usuário
                    Alert.alert(
                    "Sucesso!",
                    "Cadastro de pessoa concluído!"
                    )
                    navigation.navigate('Pessoa'); // Depois abrir o detalhe da Pessoa
                }).catch((error) => 
                {
                    console.warn("ERRO!")
                    console.error(error)
                })  
                }     
            })
            .catch((error)=>{
                console.log(error)
            })

}

export async function alterarPessoa({id, nome, telefone}){
    
    // console.log(`id: ${id}`)
    // console.log(`nome: ${nome}`)
    // console.log(`telefone: ${telefone}`)
    return api.put(`/pessoas/${parseInt(id)}`,{
        nome: nome,
        telefone: telefone
    
    }).then(async (response)=>{// Enviar dados do usuário
            // console.log(request.body)
            // console.log(response.data)
            return {title:"Sucesso!",
            text:"Cadastro de pessoa atualizado!"}
            
            
        }).catch((error) => 
        {    
            console.warn("ERRO!")
            console.error(error)
            return {title: "Ops!",
                text:"Algo deu errado."}
        }) 
}

export async function buscarPessoa({id}) {
    console.log(`id: ${id}`)
    return api.get(`/pessoas/${id}` )
    .then(async (response)=>
    
            {
                //Retornar os dados de busca
                return response.data        
            })
            .catch(async (error)=>
            {   
                
                console.warn("Erro ao buscar pessoa!")
                console.warn(`error: ${error.code}`)
                
               
            })
}

export async function excluirPessoa({id}) {
        return api.delete(`/pessoas/${parseInt(id)}`)
        .then(async (response)=>{// Enviar dados do usuário
            return {title:"Sucesso!",
            text:"Cadastro de pessoa excluído!"}
            
            
        }).catch((error) => 
        {    
            console.warn("ERRO!")
            console.error(error)
            return {title: "Ops!",
                text:"Algo deu errado."}
        }) 
  
}


export async function listarPessoa() {
    return api.get('/pessoas')
    .then(async (response)=>
            {
                
               return response.data     
            })
            .catch((error)=>{
                console.log(error)
            })

    
}
