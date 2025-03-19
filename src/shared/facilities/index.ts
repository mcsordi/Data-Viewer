const constants = {
  API_URL: 'http://localhost:8000/pessoas',
  MAX_LINHAS: 7,
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
