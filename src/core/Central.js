class Central {
  constructor() {
    //Si ya hay instancia, entonces devuielve la que hay.
    if (Central.instance) return Central.instance;
    this.adventureList = null;
    this.API = null;
    this.raceColor = null;
    this.baseColor = null;
    this.adventure = null;
    this.selected = null;
    this.dm = null;
    this.pjUtilities = null;
    this.t = 0.04;
    this.bright = 0.7;
  this.lastChatPort = null;
this.lastApiPort = null;
this.lastIp = null;
    this.lastPassword = null;
    this.lastAdventurePassword = null;
     this.view = "connection";

    //Sobreescribe los atributos en el caso de haber ya cargados
    this.loadFromStorage(); 
    //Setea Central.instance como esta, para que ocurra lo primero bien
    Central.instance = this;
  }

  subscribeViewChange(callback) {
  this._viewCallback = callback;
}

setView(newView) {
  this.view = newView;
  if (this._viewCallback) {
    this._viewCallback(newView); // Notifica a React
  }
}


  saveToStorage() { //Esto se llama cuando quiero que se guarden cambios.
    localStorage.setItem("centralConfig", JSON.stringify({
      API: this.API,
      raceColor: this.raceColor,
      baseColor: this.baseColor,
      adventure: this.adventure,
      selected: this.selected,
      dm: this.dm,
      pjUtilities: this.pjUtilities,
      t: this.t,
      bright: this.bright,
      lastPassword: this.lastPassword,
    lastChatPort :this.lastChatPort,
    lastApiPort: this.lastApiPort,
    lastIp: this.lastIp,
    lastAdventurePassword: this.lastAdventurePassword
    }));
  }

  loadFromStorage() {
    const data = localStorage.getItem("centralConfig");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        Object.assign(this, parsed);
      } catch (e) {
        console.warn("Error al cargar configuración:", e);
      }
    }
  }
}

//Esto se ejecuta cuando esta clase carga por primera vez
const instance = new Central();
//La hace default para que se pueda usar con import en toda la app
//Esto es asi porque queremos que sea singleton, asique entrega la misma sin instanciar nuevas
export default instance;
