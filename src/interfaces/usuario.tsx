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
    dadosComplementares: DadosComplementaresAluno | DadosComplementaresProfessor;
   }


 export interface DadosComplementaresAluno{
  numMatricula: number;
  percentualProgressao: number;
  percentualRendimento: number;
  semestre: number;
  usuario: LoginRequest;
  faculdade: Faculdade | null;
  curso: Curso | null;
 }

export interface DadosComplementaresProfessor{

}


 export interface Faculdade{
  id: number;
  codFaculdade: string;
  nomeFaculdade: string;
  siglaFaculdade: string;
  cidade: string;
  endereco: string;
 }

 export interface Curso{
  id: number;
  nomeCurso: string;
  siglaCurso: string;
  qtdSemestres: number;
 }