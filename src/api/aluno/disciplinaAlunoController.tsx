import { api_usuarios } from "../utils";

export async function getDisciplinasDeHoje({ numeroMatricula }) {
  return api_usuarios
    .get(`/disciplinas-aluno/aluno/${numeroMatricula}/disciplinas-hoje`)
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("ListagemCurso:" + error);
    });
}
