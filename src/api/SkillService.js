import Central from '../core/Central';

const API_BASE_URL = `${Central.API}/api/skills`;

export const SkillService = {
  // 🧠 Obtener todas las skills
  async getAll() {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      return await response.json(); // Devuelve un array de skills
    }
    const errorText = await response.text();
    throw new Error(`Error al obtener skills: ${errorText}`);
  },

  // 🔍 Obtener una skill por ID
  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const body = await response.text();

    if (response.status === 200 && body) {
      return JSON.parse(body);
    } else if (response.status === 404) {
      return null;
    }

    throw new Error(`Error al obtener skill: ${response.status} - ${body}`);
  },

  // ➕ Insertar skill
  async create(skill) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skill),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al crear skill: ${errorText}`);
    }
  },

  // ✏️ Actualizar skill
  async update(skill) {
    const response = await fetch(API_BASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skill),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al actualizar skill: ${errorText}`);
    }
  },

  // 🗑️ Eliminar skill
  async delete(skill) {
    const response = await fetch(API_BASE_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skill),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al eliminar skill: ${errorText}`);
    }
  },
};
