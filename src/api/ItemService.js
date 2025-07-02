
import  {Central} from '../core/Central';
const API_BASE_URL = Central.API + "/api/pj";

export const ItemService = {
  async atacar(actual, difficulty, adventage, pj) {
    const url = `${API_BASE_URL}/combat/atacar?dificultad=${difficulty}&ventaja=${adventage}&item=${encodeURIComponent(actual.name)}`;

    const combo = {
      pj,
      dano: 0,
      dificultad: difficulty,
      ventaja: adventage,
      item: actual
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(combo)
    });

    if (!res.ok) {
      throw new Error(`Error en ataque: ${await res.text()}`);
    }

    return await res.json(); // Se espera que devuelva un objeto tipo Combo
  },

  async getAll() {
    const res = await fetch(API_BASE_URL);
    if (!res.ok) throw new Error(`Error al obtener ítems: ${await res.text()}`);
    return await res.json();
  },

  async getById(id) {
    const res = await fetch(`${API_BASE_URL}/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Error al obtener ítem por ID: ${await res.text()}`);
    return await res.json();
  },

  async getByName(name) {
    const url = `${API_BASE_URL}/nombre/${encodeURIComponent(name)}`;
    const res = await fetch(url);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Error al obtener ítem por nombre: ${await res.text()}`);
    return await res.json();
  },

  async create(item) {
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });

    if (!res.ok) throw new Error(`Error al crear ítem: ${await res.text()}`);
    return await res.json();
  },

  async update(item) {
    const res = await fetch(API_BASE_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });

    if (!res.ok) throw new Error(`Error al actualizar ítem: ${await res.text()}`);
    return await res.json();
  },

  async delete(item) {
    const res = await fetch(API_BASE_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });

    if (!res.ok) throw new Error(`Error al eliminar ítem: ${await res.text()}`);
    return await res.json();
  },

  async buscarItemsQueEmpiecenPor(input) {
    const url = `${API_BASE_URL}/filtrados/${encodeURIComponent(input)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error al obtener ítems: ${await res.text()}`);
    return await res.json();
  }
};
