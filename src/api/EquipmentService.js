import Central from '../core/Central';

const API_BASE_URL = `${Central.API}/api/equipments`;

export const EquipmentService = {

  async getAll() {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
    });

    if (response.ok) {
      return await response.json(); 
    }

    const errorText = await response.text();
    throw new Error(`Error al obtener todos los Equipment: ${errorText}`);
  },

  async getById(pj) {
    const pjId = encodeURIComponent(pj.name);
    const url = `${API_BASE_URL}/${pjId}`;

    const response = await fetch(url, {
      method: 'GET',
    });

    const body = await response.text();

    if (response.status === 200 && body) {
      return JSON.parse(body); 
    } else if (response.status === 404) {
      return null;
    }

    throw new Error(`Error al obtener Equipment: ${body}`);
  },

  async create(equipment) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipment),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al crear Equipment: ${errorText}`);
    }
  },

  async update(equipment) {
    const response = await fetch(API_BASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipment),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al actualizar Equipment: ${errorText}`);
    }
  },

  async delete(equipment) {
    const response = await fetch(API_BASE_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipment),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al eliminar Equipment: ${errorText}`);
    }
  },
};
