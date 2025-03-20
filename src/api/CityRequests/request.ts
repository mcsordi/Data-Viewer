import constants from '../../shared/facilities';
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
      throw Error(constants.ERRO_CARREGAMENTO);
    }
  },
  async deleteById(id: number) {
    try {
      const deleteMethod = await fetch(`${constants.API_CITY_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      return deleteMethod;
    } catch (error) {
      throw Error(constants.ERRO_DELETAR);
    }
  },
};
