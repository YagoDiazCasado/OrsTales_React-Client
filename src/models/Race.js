export class Race {
  constructor({
    nombre = null,
    mod_atlético = 0,
    mod_fuerza = 0,
    mod_resistencia = 0,
    mod_mente = 0,
    mod_destreza = 0,
    baseWeight = 0
  } = {}) {
    this.name = nombre;
    this.modA = mod_atlético;
    this.modS = mod_fuerza;
    this.modE = mod_resistencia;
    this.modM = mod_mente;
    this.modD = mod_destreza;
    this.baseWeight = baseWeight;
  }

  static fromJson(json = {}) {
    return new Race({
      nombre: json.nombre,
      mod_atlético: json.mod_atlético,
      mod_fuerza: json.mod_fuerza,
      mod_resistencia: json.mod_resistencia,
      mod_mente: json.mod_mente,
      mod_destreza: json.mod_destreza,
      baseWeight: json.baseWeight
    });
  }

  toJson() {
    return {
      nombre: this.name,
      mod_atlético: this.modA,
      mod_fuerza: this.modS,
      mod_resistencia: this.modE,
      mod_mente: this.modM,
      mod_destreza: this.modD,
      baseWeight: this.baseWeight
    };
  }

  equals(other) {
    return other instanceof Race && this.name === other.name;
  }

  toString() {
    return `Race: ${this.name}`;
  }
}
