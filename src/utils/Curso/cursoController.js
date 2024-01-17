import { api } from "../utils";
import { Alert } from 'react-native';


export async function inserirEmprestimo(navigation, livroId, pessoaId, dataEmprestimo){
    console.log(livroId)
    console.log(pessoaId)
    
    // await api.get(`/emprestimos/search?nome=${nome}&telefone=${telefone}` )
    // .then((response)=>
            // {
                // if(response.data[0]){ // Array tem o objeto de usuário na primeira posição, logo ele já existe
                // Alert.alert(
                //     "Erro!",
                //     "Emprestimo já existente!"
                // );
                // }
                // else{ // Array vazio, indicando que o usuário não existe
                if(livroId != (null || undefined) && pessoaId != (null || undefined)){
                    api.post(`/emprestimos` , {
                        livroId: livroId,
                        pessoaId: pessoaId,
                        dataEmprestimo: dataEmprestimo,
                     
                    
                    }).then((response)=>{// Enviar dados do usuário
                        Alert.alert(
                        "Sucesso!",
                        "Cadastro de emprestimo concluído!"
                        )
                        navigation.navigate('Emprestimos'); // Depois abrir o detalhe do Emprestimo
                    }).catch((error) => 
                    {
                        console.warn("ERRO!")
                        console.error(error)
                    })  
                }
                else{
                    // console.log("caiu no null")
                    Alert.alert(
                        "Erro!",
                        "Nenhum livro ou pessoa foi atribuído!"
                    )
                }
                
                }     
            // })
            // .catch((error)=>{
            //     console.log(error)
            // })

// }

export async function alterarEmprestimo({id, livroId, pessoaId, dataEmprestimo}){
    console.log(livroId)
    
    // console.log(`id: ${id}`)
    // console.log(`nome: ${nome}`)
    // console.log(`telefone: ${telefone}`)
    if(livroId != (null || undefined) && pessoaId != (null || undefined)){
      
    return api.put(`/emprestimos/${parseInt(id)}`,{
        livroId: livroId,
        pessoaId: pessoaId,
        dataEmprestimo: dataEmprestimo
    
    }).then(async (response)=>{// Enviar dados do usuário
            // console.log(request.body)
            // console.log(response.data)
            return {title:"Sucesso!",
            text:"Cadastro de emprestimo atualizado!"}
            
            
        }).catch((error) => 
        {    
            console.warn("ERRO!")
            console.error(error)
            return {title: "Ops!",
                text:"Algo deu errado."}
        })
    } 
    else{
       
        return{
            title:"Erro!",
            text:"Nenhum livro ou pessoa foi atribuído!"}
        
    }
}

export async function buscarEmprestimo({id}) {
    return api.get(`/emprestimos/${id}` )
    .then(async (response)=>             
            { 
                //Converter String de data para objeto de data
                response.data.dataEmprestimo = new Date(response.data.dataEmprestimo)// +"T03:00:000Z")
                response.data.livro.dataCompra = new Date(response.data.livro.dataCompra)// +"T03:00:000Z")
                return response.data
                     
            })
            .catch(async (error)=>
            {   
                
                console.warn("Erro na busca do empréstimo!")
                console.warn(`error: ${error.code}`)
                
               
            })
}

export async function excluirEmprestimo({id}) {
    
        return api.delete(`/emprestimos/${parseInt(id)}`)
        .then(()=>{
            return {title:"Sucesso!",
            text:"Cadastro de emprestimo excluído!"}
            
            
        }).catch((error) => 
        {    
            console.warn("ERRO!")
            console.error(error)
            return {title: "Ops!",
                text:"Algo deu errado."}
        }) 
  
}


export async function listarEmprestimo() {
    return api.get('/emprestimos')
    .then(async (response)=>
            {
                
                //Converter data para o local
                response.data.forEach(responseData => {
                    responseData.dataEmprestimo = new Date(responseData.dataEmprestimo).toLocaleDateString()
                    // responseData.livroId = "chapeuzinho vermelho"
                    // responseData.pessoaId = "cleiton gonçalvez dos santos"
                    
               });
            //    console.log(response.data) 
               return response.data
               
            //    return listaEmprestimos
            })
            .catch((error)=>{
                console.log(error)
            })

    
}


export async function contagemEmprestimos() {
    return api.get('/emprestimos/contagem')
    .then(async (response)=>
            {   
                return response.data     
            })
            .catch((error)=>{
                
                console.error(error)
            })
}
