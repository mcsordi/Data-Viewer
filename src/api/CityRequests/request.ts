import constants from '../../shared/facilities';
import { TCity } from '../../shared/types/Cities';
export type TCitiesRequest = {
  nome: string;
  totalCount: number;
  estado: string;
  id: number;
}[];

export type TNumOFCities = {
  totalCount: number;
};
export type TCityData = {
  data: TCitiesRequest;
  totalCount: number;
};

export const cityRequests = {
  async getAll(name = '', page = '1', userId: number) {
    try {
      const getAllCities = await fetch(
        `${constants.API_CITY_URL}/?nome_like=${name}&_page=${page}&_limit=${constants.MAX_LINHAS}&userId=${userId}`,
      );
      const citiesTotalCount =
        Number(getAllCities.headers.get('X-Total-Count')) || 0;

      const citiesJson: Promise<TCitiesRequest> = getAllCities.json();
      return { totalCount: citiesTotalCount || 0, cities: citiesJson };
    } catch (error) {
      if (error instanceof Error) return error.message;
    }
    return 'Erro desconhecido';
  },
  async getAllOfTheCities(userId: number): Promise<TCityData | Error> {
    try {
      const allCities = await fetch(
        `${constants.API_CITY_URL}?userId=${userId}`,
      );
      const citiesResponse: TCitiesRequest = await allCities.json();

      if (citiesResponse) {
        return {
          data: citiesResponse,
          totalCount: citiesResponse.length,
        };
      }
      return new Error('Erro ao buscar total de cidades');
    } catch (error) {
      console.error(error);
      return new Error(
        (error as { message: string }).message ||
          'Erro ao consultar numero de cidades',
      );
    }
  },

  async getCityByName(city: string) {
    try {
      const fetchNameCity = await fetch(
        `${constants.API_CITY_URL}?nome=${city}`,
      );
      const nameCityJson: TCity = await fetchNameCity.json();
      return nameCityJson;
    } catch (error) {
      if (error instanceof Error) return error.message;
    }
    return 'Erro desconhecido';
  },
  async deleteById(id: number) {
    try {
      const deleteMethod = await fetch(`${constants.API_CITY_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      return deleteMethod;
    } catch (error) {
      if (error instanceof Error) return error.message;
    }
    return 'Erro desconhecido';
  },
  async updateCity(id: number, name: string, state: string, userId = 2) {
    try {
      const methodUptade = await fetch(`${constants.API_CITY_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, estado: state, userId: userId }),
      });
      return methodUptade;
    } catch (error) {
      if (error instanceof Error) return error.message;
    }
    return 'Erro desconhecido';
  },
  async postNewCity(name: string, state: string, userId = 2) {
    try {
      const methodUptade = await fetch(constants.API_CITY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, estado: state, userId: userId }),
      });
      return methodUptade;
    } catch (error) {
      if (error instanceof Error) return error.message;
    }
    return 'Erro desconhecido';
  },
};
