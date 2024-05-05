import React from 'react'
import Button from "../Components/Button"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';


export function Login() {
  const navigate = useNavigate();
  
  return (
    <div className='auth_css'>
      <h1>Login</h1>
      <h2>Realizar login como: </h2>
      <Button
        type="primary"
        label="Professor"
        action={()=> 
          navigate('/login/professor')
        } />

      <Button
        type="primary"
        label="Aluno"
        action={()=> navigate('/login/aluno')} />


    </div>
  )
}

export function LoginProfessor() {
  const navigate = useNavigate();
  const user = {
    "numUsuario": 4,
    "nome": "Johann",
    "login": "johann@dev",
    "senha": "123",
    "email": "string",
    "tipoUsuario": "ALUNO"
  }
  const {isAuthenticated, Login} = useAuth();

  console.log(isAuthenticated);
  async function handleLogin(){
    
    await Login(user);
    console.log("LOGIN REALIZADO")
    navigate('/')
  }

  return (
    <div className='auth_css'>
      <h1>Login - Professor</h1>
      <h2>Usuário: </h2>
      <input placeholder='USUARIO' style={{color:'black'}}/>
      <h2>Senha: </h2>
      <input style={{color:'black'}} security='s'/>

      
      <Button
        type="primary"
        label="Confirmar"
        // action={()=> navigate('/')} />
        action={()=> { handleLogin() }} />


    </div>
  )
}

export function LoginAluno() {
  const navigate = useNavigate();

  const user = {
    "numUsuario": 4,
    "nome": "Johann",
    "login": "johann@dev",
    "senha": "123",
    "email": "string",
    "tipoUsuario": "ALUNO"
  }
  const {isAuthenticated, Login} = useAuth();

  console.log(isAuthenticated);
  async function handleLogin(){
    
    await Login(user);
    console.log("LOGIN REALIZADO")
    navigate('/')
  }
  
  return (
    <div className='auth_css'>
      <h1>Login - Aluno</h1>
      <h2>Usuário: </h2>
     
      <h2>Senha: </h2>
      
      <Button
        type="primary"
        label="Aluno"
        action={()=> handleLogin()} />


    </div>
  )
}