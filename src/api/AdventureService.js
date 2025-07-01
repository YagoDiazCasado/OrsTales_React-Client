import Central from '../core/Central';

const API_BASE_URL = `${Central.API}/api/adventures`;

export const AdventureService = {
 
  async getAll() {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
    });

    const body = await response.text();
    console.log(body);

    if (response.ok) {
      return JSON.parse(body); 
    }

    throw new Error(`Error al obtener aventuras: ${body}`);
  },


  async getById(id) {
    const encodedId = encodeURIComponent(id);
    const response = await fetch(`${API_BASE_URL}/${encodedId}`, {
      method: 'GET',
    });

    const body = await response.text();

    if (response.status === 200 && body) {
      return JSON.parse(body);
    } else if (response.status === 404) {
      return null;
    }

    throw new Error(`Error al obtener aventura: ${body}`);
  },


  async create(adventure) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adventure),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al crear aventura: ${errorText}`);
    }
  },


  async update(adventure) {
    const response = await fetch(API_BASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adventure),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al actualizar aventura: ${errorText}`);
    }
  },


  async delete(adventure) {
    const response = await fetch(API_BASE_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adventure),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al eliminar aventura: ${errorText}`);
    }
  },
};
