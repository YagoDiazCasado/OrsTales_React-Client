import Central from '../core/Central';

const API_BASE_URL = `${Central.API}/api/races`;

export const RaceService = {
  async getAll() {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      return await response.json(); // Devuelve un array de objetos Race
    }
    const errorText = await response.text();
    throw new Error(`Error al obtener razas: ${errorText}`);
  },

  async getById(id) {
    const encodedId = encodeURIComponent(id);
    const response = await fetch(`${API_BASE_URL}/${encodedId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.status === 200) {
      const body = await response.text();
      return body ? JSON.parse(body) : null;
    } else if (response.status === 404) {
      return null;
    }

    const errorText = await response.text();
    throw new Error(`Error al obtener raza: ${response.status} - ${errorText}`);
  },

  async create(race) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(race),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al crear raza: ${errorText}`);
    }
  },

  async update(race) {
    const response = await fetch(API_BASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(race),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al actualizar raza: ${errorText}`);
    }
  },

  async delete(race) {
    const response = await fetch(API_BASE_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(race),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al eliminar raza: ${errorText}`);
    }
  },
};
