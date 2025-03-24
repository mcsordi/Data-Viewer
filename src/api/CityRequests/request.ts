import constants from '../../shared/facilities';
import { TCity } from '../../shared/types/Cities';
export type TCitiesReques = {
  nome: string;
  totalCount: number;
  estado: string;
  id: number;
}[];

export const cityRequests = {
  async getAll(name = '', page = '1') {
    try {
      const getAllCities = await fetch(
        `${constants.API_CITY_URL}/?nome_like=${name}&_page=${page}&_limit=${constants.MAX_LINHAS}`,
      );
      const citiesTotalCount =
        Number(getAllCities.headers.get('x-total-count')) || 0;

      const citiesJson: Promise<TCitiesReques> = getAllCities.json();
      return { totalCount: citiesTotalCount || 0, cities: citiesJson };
    } catch (error) {
      if (error instanceof Error) return error.message;
    }
    return 'Erro desconhecido';
  },
  async getAllOfTheCities(): Promise<TCity | string> {
    try {
      const allCities = await fetch(constants.API_CITY_URL);
      const allCitiesJson = await allCities.json();
      return allCitiesJson;
    } catch (error) {
      if (error instanceof Error) return error.message;
    }
    return 'Erro desconhecido';
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
  async updateCity(id: number, name: string, state: string) {
    try {
      const methodUptade = await fetch(`${constants.API_CITY_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, estado: state }),
      });
      return methodUptade;
    } catch (error) {
      if (error instanceof Error) return error.message;
    }
    return 'Erro desconhecido';
  },
  async postNewCity(name: string, state: string) {
    try {
      const methodUptade = await fetch(constants.API_CITY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, estado: state }),
      });
      return methodUptade;
    } catch (error) {
      if (error instanceof Error) return error.message;
    }
    return 'Erro desconhecido';
  },
};
