export interface UsuarioRequest {
    nome: string;
    login: string;
    senha: string;
    email: string;
    tipoUsuario: string;
  }

 export interface AlunoResponse{
  numMatricula: number;
  percentualProgressao: number;
  percentualRendimento: number;
  semestre: number;
  usuario: UsuarioRequest;
  faculdade: Faculdade | null;
  curso: Curso | null;
 }

export interface ProfessorResponse{

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