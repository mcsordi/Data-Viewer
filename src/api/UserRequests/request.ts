import constants from '../../shared/facilities';
export type TUser = {
  nome: string;
  email: string;
  senha: string;
  id: '';
}[];

export const userRequest = {
  async getUserByEmail(email: string, pass: string): Promise<TUser | Error> {
    try {
      const fetchUser = await fetch(
        `${constants.API_USERS_URL}?email=${email}&&senha=${pass}`,
      );
      const userJson: TUser = await fetchUser.json();
      if (userJson) {
        return userJson;
      }
      return new Error('Erro ao consultar usuário');
    } catch (error) {
      return (
        new Error((error as { message: string }).message) ||
        'Erro ao consultar usuário'
      );
    }
  },
  async postUserData(
    name: string,
    email: string,
    pass: string,
  ): Promise<Response | Error> {
    try {
      const postData = await fetch(constants.API_USERS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, email: email, senha: pass }),
      });
      if (postData) {
        return postData;
      }
      return new Error('Erro ao cadastrar novo usuário');
    } catch (error) {
      return new Error(
        (error as { message: string }).message ||
          'Erro ao cadastrar novo usuário',
      );
    }
  },
};
