import constants from '../../shared/facilities';
import { TPeopleData } from '../../shared/types/PeopleData';

export const apiRequests = {
  async getAll(name?: string, page = 1) {
    try {
      const getPeopleData = await fetch(
        `${constants.API_URL}?nome_like=${name || ''}&_page=${page}&_limit=${constants.MAX_LINHAS}`,
      );
      const peopleDataJson: TPeopleData = await getPeopleData.json();
      const peopleLength = Number(
        getPeopleData.headers.get('X-total-count') || 0,
      );
      return {
        data: peopleDataJson,
        totalCount: peopleLength,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        throw Error(constants.ERRO_CARREGAMENTO);
      }
    }
  },
  async deleteById(id: number) {
    try {
      const deleteMethod = await fetch(`${constants.API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return deleteMethod;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw Error(constants.ERRO_DELETAR);
      }
    }
  },
};
