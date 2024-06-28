import React, { useState } from "react";
import "./LoginStyle.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ModalError } from "../../components/Modal";
import { useError } from "../../contexts/errors";
import TextInput from "../../components/TextInput/TextInput";
import { PiChalkboardTeacherThin, PiStudent } from "react-icons/pi";

export function LoginSelector() {
  const navigate = useNavigate();
  return (
<div className='page-wrapper'>

    <div className="login-selection-container">
      <h1>Realizar login como:</h1>
      <Button
        type="primary"
        label="Professor"
        action={() => navigate("/login/professor")}
      />

      <Button
        type="primary"
        label="Aluno"
        action={() => navigate("/login/aluno")}
        />
    </div>
        </div>
  );
}

export function LoginBase({ tipoUsuario }) {
  const navigate = useNavigate();
  const { Login } = useAuth();
  const { error, setError } = useError();
  async function handleLogin(user) {
    await Login(user, tipoUsuario.toLowerCase());
    navigate("/");
  }

  const [canSubmit, setCanSubmit] = useState(true);

  // validate={(value)=>{
  //   if(value === '' || value === null)
  //     {return "Esse campo é obrigatório"}
  //   }}
  return (
    <div className='page-wrapper'>
      <div className='wrapper-login'>
        <div className='login-picture'>
          {tipoUsuario.toUpperCase() === "PROFESSOR" ? <PiChalkboardTeacherThin size={192}/>: <PiStudent size={192}/>}
        </div>

        {error && (
          <ModalError
            title={error.title}
            description={error.description}
            closeLabel={error.closeLabel}
            error={error}
            setClose={setError}
          />
        )}

        <Formik
          initialValues={{ username: "", senha: "" }}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          <Form className="login-container-form">
            <h1>Login - {tipoUsuario}</h1>
            <h2>Usuário: </h2>
            <Field
              name="username"
              as={TextInput}
              type="text"
              className="form-field"
            />
            <h2>Senha: </h2>
            <Field
              name="senha"
              as={TextInput}
              type="password"
              className="form-field"
            />
            <Button
              type="primary"
              label="Confirmar"
              disabled={!canSubmit}
              isSubmit={true}
              // action={()=> navigate('/')} />
              action={() => {
                /*console.warn("action do botão")*/
              }}
            />
          </Form>
        </Formik>
      </div>
    </div>
  );
}

// export function LoginProfessor() {
//   return LoginBase("Professor");
// }

// export function LoginAluno() {
//   return LoginBase("Aluno");
// }
