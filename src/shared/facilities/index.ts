const constants = {
  API_URL: 'http://localhost:8000/pessoas',
  MAX_LINHAS: 7,
  ERRO_CARREGAMENTO: 'Falha ao carregar listagem',
  ERRO_DELETAR: 'Falha ao deletar item',
  ERRO_CADASTRAR: 'Falha ao Cadastrar',
};

export const NENHUM_RESULTADO = (name: string) => {
  return `Sua busca '${name}' não teve nenhum resultado`;
};
export default constants;
