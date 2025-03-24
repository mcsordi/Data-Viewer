import constants from '../../shared/facilities';
import { TPeopleData } from '../../shared/types/PeopleData';

export const peopleRequests = {
  async postNewUser(name: string, email: string, city: string) {
    try {
      const postMethod = await fetch(constants.API_PEOPLE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, email: email, cidade: city }),
      });
      return postMethod;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'Erro desconhecido';
    }
  },
  async getAll(name?: string, page = 1) {
    try {
      const getPeopleData = await fetch(
        `${constants.API_PEOPLE_URL}?nome_like=${name || ''}&_page=${page}&_limit=${constants.MAX_LINHAS}`,
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
        return error.message;
      }
      return 'Erro desconhecido';
    }
  },
  async getAllOfThePeople(): Promise<TPeopleData | string> {
    try {
      const fetchPeople = await fetch(`${constants.API_PEOPLE_URL}`);
      const peoplesonJson: Promise<TPeopleData> = fetchPeople.json();
      return peoplesonJson;
    } catch (error) {
      if (error instanceof Error) return error.message;
    }
    return 'Erro desconhecido';
  },

  async getByName(name: string): Promise<TPeopleData | string> {
    try {
      const fetchPerson = await fetch(
        `${constants.API_PEOPLE_URL}?nome=${name}`,
      );
      const fetchPersonJson = fetchPerson.json();
      return fetchPersonJson;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'Erro desconhecido';
    }
  },
  async updateByID(id: number, name: string, email: string, city?: string) {
    try {
      const updateMethod = await fetch(`${constants.API_PEOPLE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, email: email, cidade: city }),
      });
      return updateMethod;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'Erro desconhecido';
    }
  },
  async deleteById(id: number) {
    try {
      const deleteMethod = await fetch(`${constants.API_PEOPLE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return deleteMethod;
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error instanceof Error) {
          return error.message;
        }
        return 'Erro desconhecido';
      }
    }
  },
};
