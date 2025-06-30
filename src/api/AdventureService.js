import Central from './utilities/Central';

const API_BASE_URL = `${Central.API}/api/adventures`;

export const AdventureService = {
  // Obtener todas las aventuras
  async getAll() {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
    });

    const body = await response.text();
    console.log(body);

    if (response.ok) {
      return JSON.parse(body); // Devuelve lista de aventuras
    }

    throw new Error(`Error al obtener aventuras: ${body}`);
  },

  // Obtener aventura por ID
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

  // Crear nueva aventura
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

  // Actualizar aventura existente
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

  // Eliminar aventura
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
