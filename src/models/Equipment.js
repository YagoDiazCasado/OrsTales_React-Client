import { Rarity, ItemFamily, ItemShape, DamageType, Distance } from './enums.js';
export class Equipment {
  constructor({
    ownerId = null,
    owner = null,
    casco = null,
    pecho = null,
    piernas = null,
    pies = null,
    extra_1 = null,
    extra_2 = null,
    extra_3 = null
  } = {}) {
    this.ownerId = ownerId;
    this.owner = owner;
    this.head = casco;
    this.chest = pecho;
    this.legs = piernas;
    this.feet = pies;
    this.extra1 = extra_1;
    this.extra2 = extra_2;
    this.extra3 = extra_3;
    this.equip = []; // Se recalcula con getEquip()
  }


  getEquip() {
    this.equip = [];
    if (this.chest) this.equip.push(this.chest);
    if (this.head) this.equip.push(this.head);
    if (this.legs) this.equip.push(this.legs);
    if (this.feet) this.equip.push(this.feet);
    if (this.extra1) this.equip.push(this.extra1);
    if (this.extra2) this.equip.push(this.extra2);
    if (this.extra3) this.equip.push(this.extra3);
    return this.equip;
  }

  toJson() {
    return {
      ownerId: this.ownerId,
      owner: this.owner?.toJson ? this.owner.toJson() : this.owner,
      casco: this.head,
      pecho: this.chest,
      piernas: this.legs,
      pies: this.feet,
      extra_1: this.extra1,
      extra_2: this.extra2,
      extra_3: this.extra3
    };
  }

  static fromJson(json) {
    return new Equipment({
      ownerId: json.ownerId,
      owner: json.owner, // Puedes usar PJ.fromJson si es necesario
      casco: json.casco,
      pecho: json.pecho,
      piernas: json.piernas,
      pies: json.pies,
      extra_1: json.extra_1,
      extra_2: json.extra_2,
      extra_3: json.extra_3
    });
  }

  static fromValues(values = {}) {
    return new Equipment({
      ownerId: values.ownerId ?? null,
      owner: values.owner ?? null,
      casco: values.head ?? null,
      pecho: values.chest ?? null,
      piernas: values.legs ?? null,
      pies: values.feet ?? null,
      extra_1: values.extra1 ?? null,
      extra_2: values.extra2 ?? null,
      extra_3: values.extra3 ?? null
    });
  }

  equals(other) {
    if (!other || !(other instanceof Equipment)) return false;
    return (
      this.owner?.pj_name === other.owner?.pj_name &&
      this.owner?.adventure_Name === other.owner?.adventure_Name
    );
  }

  toString() {
    return `Equipment of ${this.owner?.pj_name ?? "?"}`;
  }
}
