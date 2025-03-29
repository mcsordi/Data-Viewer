const constants = {
  API_PEOPLE_URL: 'http://localhost:8000/pessoas',
  API_USERS_URL: 'http://localhost:8000/usuarios',
  API_CITY_URL: 'http://localhost:8000/cidades',
  MAX_LINHAS: 7,
  LISTA_VAZIA: 'Sua lista está vazia',
  ERRO_CARREGAMENTO: 'Falha ao carregar listagem',
  ERRO_EDITAR: 'Falha ao editar listagem',
  ERRO_DELETAR: 'Falha ao deletar item',
  ERRO_CADASTRAR: 'Falha ao Cadastrar',
  NOME_EXEMPLO: 'Leonardo da Vinci',
  EMAIL_EXEMPLO: 'leonardo@exemplo.com',
  CIDADE_EXEMPLO: 'Mamborê',
};

export const NENHUM_RESULTADO = (name: string) => {
  return `Sua busca '${name}' não teve nenhum resultado`;
};
export default constants;
