import { Rarity, ItemFamily, ItemShape, DamageType, Distance } from './enums.js';

export class Item {
  constructor({
    id = null,
    nombre = '',
    rarity = null,
    modEquipo = null,
    itemFamily = null,
    itemShape = null,
    value = 0,
    weight = 0,
    basicDamage = 0,
    damageType = null,
    distance = null,
    consumEffect = null,
    descripcion = null,
    imagenUrl = null
  } = {}) {
    this.id_O = id;
    this.name = nombre;
    this.rarity = rarity;
    this.modEquipo = modEquipo;
    this.itemFamily = itemFamily;
    this.itemShape = itemShape;
    this.value = value;
    this.weight = weight;
    this.basicDamage = basicDamage;
    this.damageType = damageType;
    this.distance = distance;
    this.consumEffect = consumEffect;
    this.descripcion = descripcion;
    this.imagenUrl = imagenUrl;
  }

  toJson() {
    return {
      id: this.id_O,
      nombre: this.name,
      rarity: this.rarity,
      modEquipo: this.modEquipo,
      itemFamily: this.itemFamily,
      itemShape: this.itemShape,
      value: this.value,
      weight: this.weight,
      basicDamage: this.basicDamage,
      damageType: this.damageType,
      distance: this.distance,
      consumEffect: this.consumEffect,
      descripcion: this.descripcion,
      imagenUrl: this.imagenUrl
    };
  }

  static fromJson(json) {
    return new Item(json);
  }

  equals(other) {
    return other instanceof Item && this.id_O === other.id_O;
  }

  toString() {
    return `Item [name=${this.name}]`;
  }

  showInfo() {
    let sb = '';
    sb += `\n========== ITEM INFO ==========\n`;
    sb += `🔹 Nombre         : ${this.name}\n`;
    sb += `🔹 Rareza         : ${this.rarity}\n`;
    sb += `🔹 Familia        : ${this.itemFamily}\n`;
    sb += `🔹 Forma          : ${this.itemShape ?? 'N/A'}\n`;
    sb += `🔹 Valor          : ${this.value}\n`;
    sb += `🔹 Peso           : ${this.weight}\n`;

    if (this.itemFamily === ItemFamily.ITEM) {
      // sin secciones extra
    } else if (this.itemFamily === ItemFamily.EDIBLE) {
      sb += `\n------ USO ------\n`;
      sb += `🔸 Efecto Consum  : ${this.consumEffect ?? 'Ninguno'}\n`;
    } else {
      if (this.itemFamily !== ItemFamily.EQUIPMENT) {
        sb += `\n------ COMBATE ------\n`;
        sb += `🔸 Daño Base      : ${this.basicDamage}\n`;
        sb += `🔸 Tipo de Daño   : ${this.damageType ?? 'N/A'}\n`;
        sb += `🔸 Distancia      : ${this.distance ?? 'N/A'}\n`;
      }
      sb += `\n------ MODIFICADOR ------\n`;
      sb += `🔸 Mod     : ${this.modEquipo}\n`;
    }

    sb += `\n------ DESCRIPCIÓN ------\n`;
    sb += this.descripcion ?? 'Sin descripción';
    sb += `\n================================\n`;
    return sb;
  }
}
