import { userRequest } from '../UserRequests/request';

export type TAuth = {
  accessToken: string;
};
const jwtAuth = async (email: string, pass: string): Promise<TAuth | Error> => {
  try {
    const getUser = await userRequest.getUserByEmail(email, pass);
    const auth = await fetch('http://localhost:8000/auth');
    const authJson: TAuth = await auth.json();
    if (getUser.toString().length > 0) {
      return authJson;
    }
    return new Error('Erro ao validar token');
  } catch (error) {
    return new Error(
      (error as { message: string }).message || 'Erro ao validar token',
    );
  }
};
export const autentication = {
  jwtAuth,
};
