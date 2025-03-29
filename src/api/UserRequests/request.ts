import constants from '../../shared/facilities';
export type TUser = {
  nome: string;
  email: string;
  senha: string;
  id: '';
}[];

export const userRequest = {
  async getUserByEmail(
    email: string,
    pass: string,
  ): Promise<TUser | string | Response> {
    try {
      const fetchUser = await fetch(
        `${constants.API_USERS_URL}?email=${email}&&senha=${pass}`,
      );
      const userJson: TUser = await fetchUser.json();
      return userJson;
    } catch (error) {
      if (error instanceof Error) return error.message;
    }
    return 'Erro desconhecido';
  },
  async postUserData(name: string, email: string, pass: string) {
    try {
      const postData = await fetch(constants.API_USERS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, email: email, senha: pass }),
      });
      return postData;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'Erro desconhecido';
    }
  },
};
