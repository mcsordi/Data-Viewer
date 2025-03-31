import { use } from 'react';
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
  async getAll(
    name = '',
    page = '1',
    userId: number,
  ): Promise<Error | TCityData> {
    try {
      const getAllCities = await fetch(
        `${constants.API_CITY_URL}/?nome_like=${name}&_page=${page}&_limit=${constants.MAX_LINHAS}&userId=${userId}`,
      );
      const citiesTotalCount =
        Number(getAllCities.headers.get('X-Total-Count')) || 0;

      const citiesJson: TCitiesRequest = await getAllCities.json();
      if (citiesJson) {
        return { totalCount: citiesTotalCount || 0, data: citiesJson };
      }
      return new Error('Erro ao consultar cidades');
    } catch (error) {
      return new Error(
        (error as { message: string }).message || 'Erro ao consultar cidades',
      );
    }
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

  async getCityByName(city: string, userId: number): Promise<TCity | Error> {
    try {
      const fetchNameCity = await fetch(
        `${constants.API_CITY_URL}?nome=${city}&&userId=${userId}`,
      );
      const nameCityJson: TCity = await fetchNameCity.json();
      if (nameCityJson) {
        return nameCityJson;
      }
      return new Error('Erro ao consultar cidade');
    } catch (error) {
      return new Error(
        (error as { message: string }).message || 'Erro ao consultar cidade',
      );
    }
  },
  async deleteById(id: number): Promise<Response | Error> {
    try {
      const deleteMethod = await fetch(`${constants.API_CITY_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (deleteMethod) {
        return deleteMethod;
      }
      return new Error('Erro ao deletar cidade');
    } catch (error) {
      return new Error(
        (error as { message: string }).message || 'Erro ao deletar cidade',
      );
    }
  },
  async updateCity(
    id: number,
    name: string,
    state: string,
    userId = 2,
  ): Promise<Response | Error> {
    try {
      const methodUptade = await fetch(`${constants.API_CITY_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, estado: state, userId: userId }),
      });
      if (methodUptade) {
        return methodUptade;
      }
      return new Error('Erro ao atualizar cidade');
    } catch (error) {
      return new Error(
        (error as { message: string }).message || 'Erro ao atualizar cidade',
      );
    }
  },
  async postNewCity(
    name: string,
    state: string,
    userId = 2,
  ): Promise<Response | Error> {
    try {
      const postMethod = await fetch(constants.API_CITY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, estado: state, userId: userId }),
      });
      if (postMethod) {
        return postMethod;
      }
      return new Error('Erro ao cadastrar nova cidade');
    } catch (error) {
      return new Error(
        (error as { message: string }).message ||
          'Erro ao cadastrar nova cidade',
      );
    }
  },
};
