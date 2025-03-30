import constants from '../../shared/facilities';
export type TPeopleData = {
  nome: string;
  email: string;
  id: number;
  cidade: string;
  userId: number;
}[];

export type TResponseData = {
  data: TPeopleData;
};

export type TNumOfPeople = {
  totalCount: number;
};

export type TDataTotalCount = {
  data: TPeopleData[];
  totalCount: number;
};
export const peopleRequests = {
  async postNewUser(name: string, email: string, city: string, userId = 2) {
    try {
      const postMethod = await fetch(constants.API_PEOPLE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: name,
          email: email,
          cidade: city,
          userId: userId,
        }),
      });
      if (postMethod) {
        return postMethod;
      }
      return new Error('Erro ao cadastrar pessoa');
    } catch (error) {
      return (
        new Error((error as { message: string }).message) ||
        'Erro ao cadastrar pessoa'
      );
    }
  },
  async getAll(
    name?: string,
    page = 1,
    userId = 0,
  ): Promise<TPeopleData | Error> {
    try {
      const getPeopleData = await fetch(
        `${constants.API_PEOPLE_URL}?nome_like=${name || ''}&_page=${page}&_limit=${constants.MAX_LINHAS}&userId=${userId}`,
      );

      const fetchPeople: TPeopleData = await getPeopleData.json();

      if (fetchPeople) {
        return fetchPeople;
      }
      return new Error('Erro ao listar pessoas');
    } catch (error: unknown) {
      return new Error(
        (error as { message: string }).message || 'Erro ao listar pessoas',
      );
    }
  },
  async getAllOfThePeople(userId: number): Promise<TDataTotalCount | Error> {
    try {
      const fetchPeople = await fetch(
        `${constants.API_PEOPLE_URL}?userId=${userId}`,
      );
      const countPeople: TPeopleData[] = await fetchPeople.json();

      if (countPeople) {
        return {
          data: countPeople,
          totalCount: countPeople.length,
        };
      }
      return new Error('Erro ao buscar pessoas listadas');
    } catch (error) {
      console.error(error);
      return new Error(
        (error as { message: string }).message ||
          'Erro ao buscar pessoas listadas ',
      );
    }
  },

  async getByName(name: string): Promise<TResponseData | Error> {
    try {
      const fetchPerson = await fetch(
        `${constants.API_PEOPLE_URL}?nome=${name}`,
      );
      const dataJson: TPeopleData = await fetchPerson.json();
      if (dataJson) {
        return { data: dataJson };
      }
      return new Error('Erro ao buscar pelo nome');
    } catch (error) {
      return new Error(
        (error as { mesage: string }).mesage || 'Erro ao buscar pelo nome',
      );
    }
  },
  async updateByID(
    id: number,
    name: string,
    email: string,
    city?: string,
    userId?: number,
  ): Promise<Error | Response> {
    try {
      const updateMethod: Response = await fetch(
        `${constants.API_PEOPLE_URL}/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: name,
            email: email,
            cidade: city,
            userId: userId,
          }),
        },
      );
      if (updateMethod) {
        return updateMethod;
      }
      return new Error('Erro ao atualizar cadastro');
    } catch (error) {
      return new Error(
        (error as { message: string }).message || 'Erro ao atualizar cadastro',
      );
    }
  },
  async deleteById(id: number): Promise<Response | Error> {
    try {
      const deleteMethod = await fetch(`${constants.API_PEOPLE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (deleteMethod) {
        return deleteMethod;
      }
      return new Error('Erro ao deletar pessoa');
    } catch (error: unknown) {
      return new Error(
        (error as { message: string }).message || 'Erro ao deletar pessoa',
      );
    }
  },
};
