import Central from './utilities/Central';

const API_BASE_URL = `${Central.API}/api/bodytypes`;

export const BodyTypeService = {
  // Obtener todos los BodyTypes
  async getAll() {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      return await response.json(); // Lista de BodyType
    }

    const errorText = await response.text();
    throw new Error(`Error en getAll(): ${errorText}`);
  },

  // Obtener BodyType por ID
  async obtenerPorId(id) {
    const encodedId = encodeURIComponent(id);
    const response = await fetch(`${API_BASE_URL}/${encodedId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const body = await response.text();
    console.log("Respuesta cruda:", body);

    if (response.status === 200 && body) {
      console.log("Tengo ya el:", body);
      return JSON.parse(body); // Un solo BodyType
    } else if (response.status === 404) {
      return null;
    }

    throw new Error(`Error al acceder al BodyType: ${response.status} - ${body}`);
  },

  // Crear nuevo BodyType
  async create(bodyType) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyType),
    });

    if (![200, 201].includes(response.status)) {
      const errorText = await response.text();
      throw new Error(`Error en create(): ${errorText}`);
    }
  },

  // Actualizar BodyType
  async update(bodyType) {
    const response = await fetch(API_BASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyType),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error en update(): ${errorText}`);
    }
  },

  // Eliminar BodyType
  async delete(bodyType) {
    const response = await fetch(API_BASE_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyType),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error en delete(): ${errorText}`);
    }
  },
};
