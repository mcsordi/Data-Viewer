import { TPeopleData } from '../../layout/pages/HomePage/HomePage';
import constants from '../../shared/facilities';

export const apiRequests = {
  async getAll(name?: string, page = 1) {
    try {
      const getPeopleData = await fetch(
        `${constants.API_URL}?nome_like=${name || ''}&_page=${page}&_limit=${constants.MAX_LINHAS}`,
      );
      const peopleDataJson: TPeopleData = await getPeopleData.json();
      return peopleDataJson;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        throw Error(constants.ERRO_CARREGAMENTO);
      }
    }
  },
};
