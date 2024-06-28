// import { DadosComplementaresAluno } from "./aluno";
// import { DadosComplementaresProfessor } from "./professor";

export interface LoginRequest {
    username: string;
    senha: string;
  }

  export interface LoginResponse{
    tokenJwt: string;
    codigoUsuario: number;
    nome: string;
    email: string;
    tipoUsuario: string;
    fotoUsuario: string;
    dadosComplementares: any;//DadosComplementaresAluno | DadosComplementaresProfessor;
   }