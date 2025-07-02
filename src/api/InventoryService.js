import Central from '../core/Central';
const API_BASE_URL = `${Central.API}/api/inventory`;

export const InventoryService = {
  async insertar(inv) {
    console.log("Valor de id_pj ahora: " + inv.pj.name);
    const response = await fetch(`${API_BASE_URL}/insert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inv),
    });
    if (!response.ok) throw new Error('Error al insertar inventario');
  },

  async getPeso(pj) {
    const response = await fetch(`${API_BASE_URL}/peso`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pj),
    });
    const text = await response.text();
    return parseFloat(text);
  },

  async getInventarioDePJ(pj) {
    const response = await fetch(`${API_BASE_URL}/porPJ`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pj),
    });
    return await response.json(); // Devuelve un objeto { itemId: cantidad }
  },

  async existeObjeto(nombre, pj) {
    const response = await fetch(`${API_BASE_URL}/existe?nombre=${encodeURIComponent(nombre)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pj),
    });
    const text = await response.text();
    return text === 'true';
  },

  async usarMunicion(tipo, pj, cantidad) {
    const response = await fetch(`${API_BASE_URL}/usar-municion?tipo=${encodeURIComponent(tipo)}&cantidad=${cantidad}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pj),
    });
    if (!response.ok) throw new Error('Error al usar munición');
  },

  async tirar(item, pj, cantidad) {
    const data = { item, pj, cantidad };
    const response = await fetch(`${API_BASE_URL}/tirar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al tirar item');
  },

  async cantidadAmmo(pj, tipo) {
    const response = await fetch(`${API_BASE_URL}/cantidad-ammo?tipo=${encodeURIComponent(tipo)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pj),
    });
    return await response.text();
  },

  async getCantidad(pj, itemId) {
    const response = await fetch(`${API_BASE_URL}/cantidad?itemId=${itemId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pj),
    });
    const text = await response.text();
    return parseInt(text, 10);
  },

  async sumar(pj, item, cantidad) {
    const data = { pj, item, cantidad };
    const response = await fetch(`${API_BASE_URL}/sumar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al sumar item');
  }
};
