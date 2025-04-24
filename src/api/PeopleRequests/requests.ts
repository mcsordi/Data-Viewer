import constants from '../../shared/facilities';
export type TPeopleData = {
  nome: string;
  email: string;
  cidade: string;
  id: number;
}[];

export type TResponseData = {
  data: TPeopleData;
};
export type TPersonID = {
  id: number;
};
export type TNumOfPeople = {
  totalCount: number;
};

export type TDataTotalCount = {
  data: TPeopleData;
  totalCount: number;
};
export const peopleRequests = {
  async postNewUser(name: string, email: string, city: string) {
    try {
      const postMethod = await fetch(constants.API_PEOPLE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: name,
          email: email,
          cidade: city,
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
  async getAll(name?: string, page = 1): Promise<TDataTotalCount | Error> {
    try {
      const getPeopleData = await fetch(
        `${constants.API_PEOPLE_URL}?nome_like=${name || ''}&_page=${page}&_limit=${constants.MAX_LINHAS}`,
      );

      const fetchPeople: TPeopleData = await getPeopleData.json();

      if (fetchPeople) {
        return {
          data: fetchPeople,
          totalCount: Number(getPeopleData.headers.get('x-total-count')),
        };
      }
      return new Error('Erro ao listar pessoas');
    } catch (error: unknown) {
      return new Error(
        (error as { message: string }).message || 'Erro ao listar pessoas',
      );
    }
  },

  async getByName(name: string): Promise<TPersonID | Error> {
    try {
      const fetchPerson = await fetch(
        `${constants.API_PEOPLE_URL}?nome=${name}`,
      );
      const [{ id }]: TPeopleData = await fetchPerson.json();
      if (id) {
        return { id: id };
      }
      return new Error('Erro ao buscar pelo nome');
    } catch (error) {
      return new Error(
        (error as { message: string }).message ||
          'Erro ao buscar pessoa pelo nome',
      );
    }
  },

  async getPersonById(id: number): Promise<TPeopleData | Error> {
    try {
      const fetchById = await fetch(`${constants.API_PEOPLE_URL}?id=${id}`);
      const data: TPeopleData = await fetchById.json();
      if (data) return data;
      return new Error('Não foi possivel consultar pessoa por id');
    } catch (error) {
      return new Error(
        (error as { message: string }).message ||
          'Não foi possivel consultar pessoa por id',
      );
    }
  },

  async updateByID(
    id: number,
    name: string,
    email: string,
    city?: string,
    userId?: number,
  ): Promise<Error | TPeopleData> {
    try {
      const updateMethod = await fetch(`${constants.API_PEOPLE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: name,
          email: email,
          cidade: city,
          userId: userId,
        }),
      });
      const data: TPeopleData = await updateMethod.json();
      if (data) {
        return data;
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
