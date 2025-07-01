export class Inventory {
  constructor({
    id = null,
    pj = null,
    item = null,
    quantity = 0,
    singleWeight = 0,
    objectName = ""
  } = {}) {
    this.id = id;
    this.pj = pj;               
    this.item = item;           
    this.quantity = quantity;
    this.singleWeight = singleWeight;
    this.objectName = objectName;
  }

  toString() {
    return this.item?.name ?? "???";
  }

  equals(other) {
    if (!other || !(other instanceof Inventory)) return false;
    return (
      this.item?.id_O === other.item?.id_O &&
      this.pj?.pj_name === other.pj?.pj_name &&
      this.pj?.adventure_Name === other.pj?.adventure_Name
    );
  }

  toJson() {
    return {
      id: this.id,
      pj: this.pj?.toJson ? this.pj.toJson() : this.pj,
      item: this.item?.toJson ? this.item.toJson() : this.item,
      cantidad: this.quantity,
      peso_unitario: this.singleWeight,
      nombre_objeto: this.objectName
    };
  }

  static fromJson(json) {
    return new Inventory({
      id: json.id,
      pj: json.pj,     // Si necesitas convertirlo: PJ.fromJson(json.pj)
      item: json.item, // Si necesitas convertirlo: Item.fromJson(json.item)
      quantity: json.cantidad,
      singleWeight: json.peso_unitario,
      objectName: json.nombre_objeto
    });
  }

  static fromValues(values = {}) {
    return new Inventory({
      id: values.id ?? null,
      pj: values.pj ?? null,
      item: values.item ?? null,
      quantity: values.quantity ?? 0,
      singleWeight: values.singleWeight ?? 0,
      objectName: values.objectName ?? ""
    });
  }
}
