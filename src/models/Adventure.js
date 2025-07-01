export class Adventure {
  constructor({ name = null, pasword = null } = {}) {
    this.adventureName = name;
    this.pasword = pasword;
  }

  static fromJson(json = {}) {
    return new Adventure({
      name: json.name,
      pasword: json.pasword
    });
  }

  toJson() {
    return {
      name: this.adventureName,
      pasword: this.pasword
    };
  }

  equals(other) {
    return (
      other instanceof Adventure &&
      this.adventureName === other.adventureName
    );
  }

  toString() {
    return this.adventureName ?? "Unnamed Adventure";
  }

  // Alternativa para compatibilidad con formularios:
  static fromValues(values = {}) {
    return new Adventure({
      name: values.adventureName ?? null,
      pasword: values.pasword ?? null
    });
  }
}
