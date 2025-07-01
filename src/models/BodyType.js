export class BodyType {
  constructor({ nombre, mod_atlético, mod_fuerza, mod_resistencia, mod_mente, mod_destreza } = {}) {
    this.name = nombre ?? null;
    this.modA = mod_atlético ?? 0;
    this.modS = mod_fuerza ?? 0;
    this.modE = mod_resistencia ?? 0;
    this.modM = mod_mente ?? 0;
    this.modD = mod_destreza ?? 0;
    this._mods = []; // se recalcula en getMods()
  }

  static fromValues(name, modA, modS, modE, modM, modD) {
    return new BodyType({
      nombre: name,
      mod_atlético: modA,
      mod_fuerza: modS,
      mod_resistencia: modE,
      mod_mente: modM,
      mod_destreza: modD
    });
  }

  equals(other) {
    return other instanceof BodyType && this.name === other.name;
  }

  toString() {
    return `BodyType { name: ${this.name}, modA: ${this.modA}, modS: ${this.modS}, modE: ${this.modE}, modM: ${this.modM}, modD: ${this.modD}, mods: ${this.getMods()} }`;
  }

  toJson() {
    return {
      nombre: this.name,
      mod_atlético: this.modA,
      mod_fuerza: this.modS,
      mod_resistencia: this.modE,
      mod_mente: this.modM,
      mod_destreza: this.modD
    };
  }

  static fromJson(json) {
    return new BodyType(json);
  }

  getMods() {
    this._mods = [this.modA, this.modS, this.modE, this.modM, this.modD];
    return this._mods;
  }

  setMods(mods) {
    if (Array.isArray(mods) && mods.length === 5) {
      [this.modA, this.modS, this.modE, this.modM, this.modD] = mods;
    }
  }
}
