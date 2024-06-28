import { Curso, Faculdade } from "./instituicao";

export interface HorasAula{
    id: number;
    numeroAula: number;
    inicioAula: string;
    fimAula: string;
    isIntervalo: boolean;
    fotoUsuario: string;
   }

   export interface DiasAula{
    cod: string;
    valor: string;
   }

export interface Disciplina{
    codDisciplina: string;
    nomeDisciplina: string;
    siglaDisciplina: string;
    quantidadeAulas: number;
    isDisciplinaEspecial: string;
    corDisciplina: string;
   }

   export interface DisciplinaCurso{
    id: number;
    faculdade: Faculdade;
    curso: Curso;
    disciplina: Disciplina;
    horariosAula: HorasAula[];
    semestre: number;
    diasAula: DiasAula[];
   }
