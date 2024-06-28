import { Curso, Faculdade } from "./instituicao";

export interface DadosComplementaresAluno{
    numMatricula: number;
    percentualProgressao: number;
    percentualRendimento: number;
    semestre: number;
    faculdade: Faculdade | null;
    curso: Curso | null;
   }
  