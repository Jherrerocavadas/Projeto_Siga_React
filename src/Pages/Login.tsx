import React, { useState } from 'react'
import Button from "../Components/Button"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ModalError } from '../Components/Modal';
import { useError } from '../contexts/errors';


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

export function LoginBase({tipoUsuario}){
  const navigate = useNavigate();
  const {Login} = useAuth();
  const {error, setError} = useError()
  async function handleLogin(user){
    await Login(user, tipoUsuario.toLowerCase());
    navigate('/')
  }

  const [canSubmit, setCanSubmit] = useState(true)

  // validate={(value)=>{
  //   if(value === '' || value === null)
  //     {return "Esse campo é obrigatório"}
  //   }}
  return (
    <div className='auth_css'>
      {error && <ModalError 
          title={error.title}
          description={error.description}
          closeLabel={error.closeLabel}
          error={error}
          setClose={setError}
        />}
      <h1>Login - {tipoUsuario}</h1>
      <Formik
      initialValues={{username: '', senha: ''}}
      onSubmit={(values)=> { handleLogin(values) }}>
        <Form>
          <h2>Usuário: </h2>
          <Field name="username" type="text"/>
          <h2>Senha: </h2>
          <Field name="senha" type="password"/>
          <Button
          type="primary"
          label="Confirmar"
          disabled={!canSubmit}
          isSubmit={true}
          // action={()=> navigate('/')} />
          action={()=> { /*console.warn("action do botão")*/}} />
        </Form>
      </Formik>
    </div>
  )
}

// export function LoginProfessor() {
//   return LoginBase("Professor");
// }

// export function LoginAluno() {
//   return LoginBase("Aluno");
// }