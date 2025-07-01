export class Skill {
  constructor({
    name = "",
    cost = 0,
    type = "",
    mainAction = 0,
    race = "",
    power = ""
  } = {}) {
    this.name = name;
    this.cost = cost;
    this.type = type;
    this.mainAction = mainAction;
    this.race = race;
    this.power = power;
  }

  toString() {
    return this.name;
  }

  equals(other) {
    if (!other || !(other instanceof Skill)) return false;
    return this.name === other.name;
  }

  toJson() {
    return {
      nombre: this.name,
      coste: this.cost,
      tipo: this.type,
      accion_principal: this.mainAction,
      raza: this.race,
      poder: this.power
    };
  }

  static fromJson(json) {
    return new Skill({
      name: json.nombre,
      cost: json.coste,
      type: json.tipo,
      mainAction: json.accion_principal,
      race: json.raza,
      power: json.poder
    });
  }

  static fromValues(values = {}) {
    return new Skill({
      name: values.name ?? "",
      cost: values.cost ?? 0,
      type: values.type ?? "",
      mainAction: values.mainAction ?? 0,
      race: values.race ?? "",
      power: values.power ?? ""
    });
  }
}
