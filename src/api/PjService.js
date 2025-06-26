// services/pjService.js
import Central from './utilities/Central';
const API_BASE_URL = Central.API + "/api/pj";

export const pjService = {
  async postJson(url, body) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    return await res.json();
  },

  async putJson(url, body) {
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    return await res.json();
  },

  async getCompletePJs(adventure, dm) {
    const url = `${API_BASE_URL}/completos?dm=${dm}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adventure)
    });

    if (!res.ok) throw new Error("Error al obtener personajes");
    return await res.json();
  },

  async enviarPeticionMultipart(pj, endpoint) {
    const formData = new FormData();
    formData.append("pj", new Blob([JSON.stringify(pj)], { type: "application/json" }));

    if (pj.profile) {
      formData.append("profile", pj.profile, "portrait.png");
    }

    const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error(`Error ${res.status}`);
    return await res.json();
  },

  create(pj) {
    return this.enviarPeticionMultipart(pj, "create");
  },

  update(pj) {
    return this.enviarPeticionMultipart(pj, "update");
  },

  async setBasicHitter(pj) {
    const res = await fetch(`${API_BASE_URL}/calcular/basic-hitter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pj)
    });
    if (!res.ok) throw new Error("Error al calcular golpe básico");
  },

  async setSecondaryStats(pj) {
    const res = await fetch(`${API_BASE_URL}/calcular/secondary-stats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pj)
    });
    if (!res.ok) throw new Error("Error al calcular estadísticas secundarias");
  },

  async setMods(pj) {
    const res = await fetch(`${API_BASE_URL}/calcular/mods`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pj)
    });
    if (!res.ok) throw new Error("Error al calcular modificadores");
  },

  async setLevelCheck(pj) {
    const res = await fetch(`${API_BASE_URL}/calcular/level-check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pj)
    });
    if (!res.ok) throw new Error("Error al comprobar nivel");
  },

  getStat(type, pj) {
    const stats = {
      alt: pj.atl,
      str: pj.str,
      end: pj.end,
      min: pj.min,
      dex: pj.dex,
      acr: pj.acrobatics,
      vas: pj.vaste,
      per: pj.preception,
      cha: pj.charisma
    };
    return stats[type] || 0;
  },

  async getAll() {
    const res = await fetch(API_BASE_URL, {
      method: "GET",
      headers: { "Accept": "application/json" }
    });
    if (!res.ok) throw new Error("Error al obtener todos los PJ");
    return await res.json();
  },

  async getById(id) {
    const res = await fetch(`${API_BASE_URL}/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Error al obtener PJ");
    return await res.json();
  },

  async deletePJ(pj) {
    const res = await fetch(API_BASE_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pj)
    });
    if (!res.ok) throw new Error("Error al eliminar PJ");
  }
};
