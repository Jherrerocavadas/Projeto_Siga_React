import React from 'react'
import Button from "../Components/Button"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import { Field, Form, Formik } from 'formik';


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
  const {Login} = useAuth();
  async function handleLogin(user){
    console.warn(user)
    const response = await Login(user, "professor");
    console.log("LOGIN REALIZADO: ", response)
    navigate('/')
  }

  return (
    <div className='auth_css'>
      <h1>Login - Professor</h1>
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
          isSubmit={true}
          // action={()=> navigate('/')} />
          action={()=> { console.warn("action do botão")}} />
        </Form>
      </Formik>
    </div>
  )
}

export function LoginAluno() {
  const navigate = useNavigate();
  const {Login} = useAuth();

  async function handleLogin(user){
    console.warn(user)
    const response = await Login(user, "aluno");
    console.log("LOGIN REALIZADO: ", response)
    navigate('/')
  }
  
  return (
    <div className='auth_css'>
      <h1>Login - Aluno</h1>
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
          isSubmit={true}
          // action={()=> navigate('/')} />
          action={()=> { console.warn("action do botão")}} />
        </Form>
      </Formik>
    </div>
  )
}