// PJ.js

export class PJ {
  constructor({
    name = "",
    race = null,
    power = "",
    characterType = "",
    adventureName = "",
    weapon = null,
    bodyTypes = [],
    skills = [],
    inventario = [],
    equipment = null,
    basicHitter = "FISTS",
    inspirationPoints = 0,
    able = true,
    profile = null,
    atl = 1,
    str = 1,
    end = 1,
    min = 1,
    dex = 1,
    modA = 0,
    modS = 0,
    modE = 0,
    modM = 0,
    modD = 0,
    xpA = 0,
    xpS = 0,
    xpE = 0,
    xpM = 0,
    xpD = 0,
    glimmers = 0,
    weight = 0,
    maxCarry = 100,
    currentCarry = 0,
    weightLose = 0,
    maxHp = 0,
    maxActions = 0,
    maxKcal = 0,
    hp = 1,
    actions = 1,
    kcal = 1,
    leftStrong = 0,
    speed = 0,
    preception = 0,
    charisma = 0,
    acrobatics = 0,
    balance_Lv = 0,
    vaste = 0,
    vaste_Distance = 0,
  } = {}) {
    this.name = name;
    this.race = race;
    this.power = power;
    this.characterType = characterType;
    this.adventureName = adventureName;
    this.weapon = weapon;
    this.bodyTypes = new Set(bodyTypes);
    this.skills = new Set(skills);
    this.inventario = inventario;
    this.equipment = equipment;
    this.basicHitter = basicHitter;
    this.inspirationPoints = inspirationPoints;
    this.able = able;
    this.profile = profile;
    this.atl = atl;
    this.str = str;
    this.end = end;
    this.min = min;
    this.dex = dex;
    this.modA = modA;
    this.modS = modS;
    this.modE = modE;
    this.modM = modM;
    this.modD = modD;
    this.xpA = xpA;
    this.xpS = xpS;
    this.xpE = xpE;
    this.xpM = xpM;
    this.xpD = xpD;
    this.glimmers = glimmers;
    this.weight = weight;
    this.maxCarry = maxCarry;
    this.currentCarry = currentCarry;
    this.weightLose = weightLose;
    this.maxHp = maxHp;
    this.maxActions = maxActions;
    this.maxKcal = maxKcal;
    this.hp = hp;
    this.actions = actions;
    this.kcal = kcal;
    this.leftStrong = leftStrong;
    this.dices = ["atl", "str", "end", "min", "dex", "acr", "vas", "per", "cha"];
    this.speed = speed;
    this.preception = preception;
    this.charisma = charisma;
    this.acrobatics = acrobatics;
    this.balance_Lv = balance_Lv;
    this.vaste = vaste;
    this.vaste_Distance = vaste_Distance;
  }

   static fromValues(
    name,
    race,
    characterType,
    adventureName,
    power,
    atl,
    str,
    end,
    min,
    dex,
    glimmers
  ) {
    return new PJ({
      name,
      race,
      characterType,
      adventureName,
      atl,
      str,
      power,
      end,
      min,
      dex,
      glimmers
    });
  }

  getAllMods() {
    return [this.modA, this.modS, this.modE, this.modM, this.modD];
  }

  showInfo() {
    return `
---- PJ: ${this.name} (${this.characterType}) ----
Poder: ${this.power}
Raza: ${this.race?.name || '???'}
Aventura: ${this.adventureName}
Weapon: ${this.weapon?.name || 'Ninguna'}
Stats: atl=${this.atl}, str=${this.str}, end=${this.end}, min=${this.min}, dex=${this.dex}
Mods: ${this.getAllMods().join(', ')}
XP: A=${this.xpA}, S=${this.xpS}, E=${this.xpE}, M=${this.xpM}, D=${this.xpD}
Inspiración: ${this.inspirationPoints} | Habilidad: ${this.able ? "Sí" : "No"}
-----------------------------------------
    `.trim();
  }

   toString() {
    return this.name;
  }

  equals(otherPJ) {
    return otherPJ && this.name === otherPJ.name;
  }

  //Esto es como el toString de json. 
  //Si le paso a la api mas variables de las que quiere, las ignora
  //asique no pasa nada por pasarle todas
  toJSON() {
    return {
      ...this, //esto copia todas las propiedades del objeto para pasarlas
      bodyTypes: Array.from(this.bodyTypes),
      skills: Array.from(this.skills),
    };
  }

  static fromJSON(data) {
    return new PJ(data);
  }
}
