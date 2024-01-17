import { api } from "../utils";
import { Alert } from 'react-native';


export async function inserirLivro(navigation, titulo, autor, dataCompra){
    
    // await api.get(`/livros/search?nome=${nome}&telefone=${telefone}` )
    // .then((response)=>
            // {
                // if(response.data[0]){ // Array tem o objeto de usuário na primeira posição, logo ele já existe
                // Alert.alert(
                //     "Erro!",
                //     "Livro já existente!"
                // );
                // }
                // else{ // Array vazio, indicando que o usuário não existe
                api.post(`/livros` , {
                    titulo: titulo,
                    autor: autor,
                    dataCompra: dataCompra
                      
                }).then((response)=>{// Enviar dados do usuário
                    Alert.alert(
                    "Sucesso!",
                    "Cadastro de livro concluído!"
                    )
                    navigation.navigate('Livros'); // Depois abrir o detalhe do livro
                }).catch((error) => 
                {
                    console.warn("ERRO!")
                    console.error(error)
                })  
                // }     
            // })
            // .catch((error)=>{
                // console.log(error)
            // })

}

export async function alterarLivro({id, titulo, autor, dataCompra}){
    
    // console.log(`id: ${id}`)
    // console.log(`nome: ${nome}`)
    // console.log(`telefone: ${telefone}`)
    return api.put(`/livros/${parseInt(id)}`,{
        titulo: titulo,
        autor: autor,
        dataCompra: dataCompra
    
    }).then(async (response)=>{// Enviar dados do usuário
            // console.log(request.body)
            // console.log(response.data)
            return {title:"Sucesso!",
            text:"Cadastro de livro atualizado!"}
            
            
        }).catch((error) => 
        {    
            console.warn("ERRO!")
            console.error(error)
            return {title: "Ops!",
                text:"Algo deu errado."}
        }) 
}

export async function buscarLivro({id}) {
    return api.get(`/livros/${id}` )
    .then(async (response)=>
    
            { 
        
                if(response.data.erro){
                    //Retornar o código de erro
                    return response.data.erro.errno
                }
                //console.log(response.data)
                //Retornar os dados de busca
             
                //Converter String de data para objeto de data
                
                response.data .dataCompra = new Date(response.data .dataCompra)// +"T03:00:000Z")
   
                
                return response.data
                     
            })
            .catch(async (error)=>
            {   
                
                console.warn("Erro na busca do Livro!")
                console.warn(`error: ${error.code}`)
                
               
            })
}

export async function excluirLivro({id}) {
        return api.delete(`/livros/${parseInt(id)}`)
        .then(async (response)=>{// Enviar dados do usuário
            return {title:"Sucesso!",
            text:"Cadastro de livro excluído!"}
            
            
        }).catch((error) => 
        {    
            console.warn("ERRO!")
            console.error(error)
            return {title: "Ops!",
                text:"Algo deu errado."}
        }) 
  
}


export async function listarLivro() {
    return api.get('/livros')
    .then(async (response)=>
            {
                
                //Converter data para o local
                response.data.forEach(responseData => {
                    responseData.dataCompra = new Date(responseData.dataCompra +"T03:00:000Z").toLocaleDateString()
               }); 
   
               return response.data     
            })
            .catch((error)=>{
                console.log(error)
            })
    
}


export async function contagemLivros() {
    return api.get('/livros/contagem')
    .then(async (response)=>
            {   
               return response.data     
            })
            .catch((error)=>{
                console.log(error)
            })
}