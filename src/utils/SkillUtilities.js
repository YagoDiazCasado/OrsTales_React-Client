// utils/ .js

import { PjUtilities } from './utilities/Central.js';
import { ItemShape } from '../core/Enums.js';

const usable = pU;
const dado = () => Math.floor(Math.random() * 20 + 1);

export const SkillUtilities {
  static aplicar(skillName, pj, adv = false, ataque = 0) {
    const  es = {
      // GENERALES
      combo: () => this.combo(pj),
      ojoCritico: () => this.ojoCritico(pj),
      ganarEspalda: () => this.ganarEspalda(pj),
      protegerEspalda: () => this.protegerEspalda(pj),
      reencoroso: () => this.reencoroso(pj),
      sigiloso: () => this.sigiloso(pj),
      guardiaLejana: () => this.guardiaLejana(pj),
      concentracion: () => this.concentracion(pj),
      placaje: () => this.placaje(pj),
      escabullirte: () => this.escabullirte(pj),
      primeraLente: () => this.primeraLente(pj),
      segundaLente: () => this.segundaLente(pj),
      bloqueo: () => this.bloqueo(pj),
      esquivar: () => this.esquivar(pj),
      parry: () => this.parry(pj),

      // VASTE
      emisionVaste: () => this.emisionVaste(pj),
      gritoDeVaste: () => this.gritoDeVaste(pj),
      imanVaste: () => this.imanVaste(pj),
      disparoVaste: () => this.disparoVaste(pj, adv),
      reconVaste: () => this.reconVaste(pj),
      corazaDeVaste: () => this.corazaDeVaste(pj),
      corazaTotalDeVaste: () => this.corazaTotalDeVaste(pj),
      golpeVaste: () => this.golpeVaste(pj, adv),

      // SOLEAS
      espirituGuerrero: () => this.espirituGuerrero(pj),
      espirituSuperior: () => this.espirituSuperior(pj),
      espirituGeneroso: () => this.espirituGeneroso(pj),
      gritosIgneos: () => this.gritosIgneos(pj),
      comandarHermanos: () => this.comandarHermanos(pj),
      arenaYCal: () => this.arenaYCal(pj),

      // JANO
      parieJoint: () => this.parieJoint(pj),
      polarisVex: () => this.polarisVex(pj),

      // BUNRAKU
      heigerInvert: () => this.heigerInvert(pj),
      hastroUpter: () => this.hastroUpter(pj),

      // LEIRZA
      drenarVida: () => this.drenarVida(pj, adv, ataque),
      regenerar: () => this.regenerar(pj),
    };

    if (! es[skillName]) {
      throw new Error(`  no encontrada: ${skillName}`);
    }

    return  es[skillName]();
  }



	static  bloqueo( pj) {
		if (pj.getActions() >= 2) {
			try {
				usable.useActions(-2, pj);
			} catch (e){
				console.error(e.stack);
			}
			if (dado.nextInt(1, pj.getPreception()) > 10) {
				return"Puede sbloquear el ataque si es inferior a " + (dado.nextInt(1, (int) (pj.getStr())));
			}
		}
		return null;
	}


  // Ejemplo de implementación simplificada
  static combo(pj) {
    if (pj.actions >= 2) {
      let total = 0;
      let log = 'Comienza el combo:\n';
      try {
        while (true) {
          const dificultad = Math.floor(Math.random() * 15 + 1);
          const resultado = usable.atacar(pj, dificultad, false);
          const dano = parseFloat(resultado.split(' ')[1]);
          total += dano;
          log += resultado + '\n';
        }
      } catch (e) {
        log += `-----------Termina el combo: ${total} de daño total-----------`;
        return log;
      }
    }
    return 'No hay acciones suficientes';
  }

  
	static  parry( pj) {
		if (pj.getActions() >= 3) {
			try {
				usable.useActions(-3, pj);
			} catch (e) {
				console.error(e.stack);
			}
			if (dado.nextInt(1, pj.getPreception()) > 15) {
				return "Puede ignorar el ataque si es inferior a " + (dado.nextInt(1, (int) (pj.getDex())))
						+ " Y actuar un turno extra ahora mismo";
			}
		}
		return null;
	}


	static  esquivar( pj) {
		if (pj.getActions() >= 1) {
			try {
				usable.useActions(-1, pj);
			} catch (e) {
				console.error(e.stack);
			}
			if (dado.nextInt(1, pj.getPreception()) > 12) {
				return "Puede esquivar el ataque si es inferior a "
						+ (dado.nextInt(1, (int) (pj.getAcrobatics())));
			}
		}
		return null;
	}


  static sigiloso(pj) {
    return 'PASIVA: En sigilo, puede pasar cerca de las personas sin necesidad de tirar dados.';
  }

  static reencoroso(pj) {
    return 'PASIVA: Después de recibir un ataque, ataca con ventaja si ataca a su anterior agresor';
  }

  static escabullirte(pj) {
    if (pj.actions >= 2) {
      usable.useActions(-2, pj);
      return 'Puedes moverte sin recibir ataques de oportunidad durante este turno.';
    }
    return 'Faltan acciones';
  }

  
	static   sigiloso( pj) {
		return "PASIVA: En sigilo, puede pasar cerca de las personas sin necesidad de tirar dados. Sólo terminará su sigilo si lo ven.";
	}

	static   reencoroso( pj) {
		return "PASIVA: Después de recibir un ataque, ataca con ventaja si ataca a su anterior agresor";
	}

	static   concentracion(pj) {
		if (pj.getActions() >= 2) {
			try {
				usable.useActions(-2, pj);
			} catch (e) {
				console.error(e.stack);
			}
			return "Puedes usar esta   sin consumir turno, poero dentro del tuyo. LA siguiente tirada que hagas tendrá ventaja";
		}
		return "Faltan acciones ";
	}

	static   guardiaLejana( pj) {
		if (pj.getActions() >= 3) {
			try {
				usable.useActions(-3, pj);
			} catch (e){
				console.error(e.stack);
			}
			return "Gastas El turno en proteger un área 3x3 seleccionada o una persona. Si se mueve, recibes un turno gratis para lo que te plazca, recibirás el tuyo con normalidad cuando llegue";
		}
		return "Faltan acciones ";
	}

	static   protegerEspalda(pj) {
		if (pj.getActions() >= 2) {
			try {
				usable.useActions(-2, pj);
			} catch (e) {
				console.error(e.stack);
			}
			return "Puedes usar esta   sin consumir turno, poero dentro del tuyo. Evita que puedan tomar tu espalda. Reaccionas como lo harías normalmente";
		}
		return "Faltan acciones ";
	}

	static   ganarEspalda( pj) {
		if (pj.getActions() >= 2) {
			try {
				usable.useActions(-2, pj);
			} catch (e) {
				console.error(e.stack);
			}
			return "Puedes usar esta   sin consumir turno, pero dentro del tuyo. Permite tomar la espalda de un Personaje seleccionado";
		}
		return  "Faltan acciones ";
	}

	static   placaje( pj) {
		if (pj.getActions() >= 2 * pj.getModS()) {
			   dano = 0.0;
			try {
				dano = (pj.getWeight() - pj.getSpeed()) / pj.getModS();
				usable.useActions((int) (-2 * pj.getModS()), pj);
				usable.useHp((int) -dano / 4, pj);
			} catch (e)    {
				console.error(e.stack);
			}
			     entrega = dano;
			return    "Placa con sus " + pj.getWeight() + " kilos y ejerce " + entrega
					+ "  puntos de daño al rival y " + (entrega / 4) + " a si mismo. Empuja " + dado.nextInt(1, 5)
					+ " m";
		}
		return    "Faltan acciones ";
	}

	static   ojoCritico( pj) {
		if (pj.getActions() >= 2) {
			try {
				usable.useActions(-2, pj);
			} catch (e)    {
				console.error(e.stack);
			}
			return    "Los próximos 3 turnos tienes ventaja (stackeable) en todas tus tiradas";
		}
		return    "Faltan acciones ";
	}

	static   primeraLente( b) {
		if (b.getWeapon().getItemShape().equals(ItemShape.TELESCOPE)) {
			   dano = "";
			try {
				dano = usable.atacar(b, 10, false); // Poner percepción en su lugar
			} catch (e)    {
				console.error(e.stack);
			}
			     entrega = dano;
			return    "Dispara con la lente lejana y ejerce " + entrega
					+ "  en línea fina. Quema al objetivo con -4 durante 3 turnos";
		} else {
			return    "Debes equipar un telescopio Astur primero";
		}
	}

	static   segundaLente( b) {
		if (b.getWeapon().getItemShape().equals(ItemShape.TELESCOPE)) {
			   dano = "";
			try {
				dano = "" + (usable.atacar(b, 3, true));
				usable.useHp(-4, b);
			} catch (e)    {
				console.error(e.stack);
			}
			     entrega = dano;
			return    "Dispara con la lente cercana y ejerce " + entrega
					+ "  en 6 casillas (2X3). Quema al objetivo con -4 durante 3 turnos";
		} else {
			return    "Debes equipar un telescopio Astur primero";
		}
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////// SOLEOS

	static   espirituGuerrero( b) {
		if (b.getActions() >= 3) {
			try {
				usable.useActions(3, b);
			} catch (e)    {
				console.error(e.stack);
			}
			return    ("Todos te atacarán a tí hasta que tu turno vuelva");
		} else {
			return    ("No hay acciones suficientes");
		}
	}

	static   espirituSuperior( b) {
		if (b.getActions() >= 4) {
			try {
				usable.useActions(4, b);
			} catch (e)    {
				console.error(e.stack);
			}
			return    ("Todos te atacarán a tí hasta que tu turno vuelva. El primero de los ataques no te afectará");
		} else {
			return    ("No hay acciones suficientes");
		}
	}

	static   espirituGeneroso(  b) {
		if (b.getActions() >= 3) {
			try {
				usable.useActions(3, b);
			} catch (e)    {
				console.error(e.stack);
			}
			return    ("Permites que otro soleo/techita de tu grupo use tus acciones durante el siguiente turno");
		} else {
			return    ("No hay acciones suficientes");
		}
	}

	static   gritosIgneos(  b) {
		if (b.getActions() >= 2) {
			try {
				usable.useActions(2, b);
			} catch (e)    {
				console.error(e.stack);
			}
			return    ("Los que lo escuchen atacarán en el siguiente turno al enemigo más cercano.");
		} else {
			return    ("No hay acciones suficientes");
		}
	}

	static   comandarHermanos(  b) {
		if (b.getActions() >= (b.getActions() / 5) + 3) {
			try {
				usable.useActions((b.getActions() / 5) + 3, b);
			} catch (e)    {
				console.error(e.stack);
			}
			return    ("Puedes dar ordenes a un cualquier Soleo \nQue tenga menos de la mitad de la vida que tú.");
		} else {
			return    ("No hay acciones suficientes");
		}
	}

	static   ojosHermanos(  b) {
		if (b.getActions() >= 4) {
			try {
				usable.useActions(4, b);
			} catch (e)    {
				console.error(e.stack);
			}
			return    ("Durante 3 turnos Puedes ver desde los ojos de cualquier compañero, incluso sentir lo que siente.");
		} else {
			return    ("No hay acciones suficientes");
		}
	}

	static   alientoFuego(  b) {
		if (b.getActions() >= (b.getActions() / 5) + 3) {
			try {
				usable.useActions((b.getActions() / 5) + 3, b);
			} catch (e)    {
				console.error(e.stack);
			}
			return    ("Debe de haber una fuente de fuego cercana. Tu aliento puede proyectar el fuego como un chorro a presión:  "
					+ ((b.getVaste() / 4) * 2)
					+ " de poder que se siente como un azote de calor. Puede tener varios efectos de propagación y alcanza "
					+ "30m en cono de incremento 1 cada 2");
		} else {
			return    ("No hay acciones suficientes");
		}
	}

	static   arenaYCal(  b) {
		try {
			usable.useActions(b.getMaxActions(), b); // regenera todo
			usable.useHp(-b.getHp() / 3, b);
		} catch (e)    {
			console.error(e.stack);
		}
		return    ("Tus Acciones vuelven a su máxima capacidad a cambio de tu sangre..."
				+ "-Un corazón en calor no puede morir-" + "-...Mucho menos rendirse...-"
				+ "Gastas 1 tercio de tu vida actual a cambio de acciones.");
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// VASTE

	static   emisionVaste(  b) {
		try {
			usable.useActions(-b.getActions() / 4, b);
		} catch (e)    {
			console.error(e.stack);
		}
		return    ("Azota " + b.getVaste_Distance() + "m con un poder de " + (b.getVaste()/2));
	}

	static   gritoDeVaste(  b) {
		if (b.getActions() >= 1) {
			try {
				usable.useActions(-1, b);
			} catch (e)    {
				console.error(e.stack);
			}
			return    ("Utilizas tu mente para atacar a distancia y hacer " + usable.diceLooby(b, "min") + " a "
					+ b.getVaste_Distance() + " m");
		} else {
			return    ("No hay acciones suficientes");
		}
	}

	static   imanVaste(  b) {
		try {
			usable.useActions(-b.getMaxActions() / 4, b);
		} catch (e)    {
			console.error(e.stack);
		}
		return    ("Permite imantar el nombre a cualquier cosa, es decir, tu ser al completo se pega a algo con una fuerza de "
				+ b.getVaste()
				+ "kg. La imantación puede arrastrar a la persona o en su defecto al más ligero de ambos elementos a "
				+ b.getVaste_Distance() + "m");
	}

	static   disparoVaste(  b,  adv) {
		try {
			usable.useActions(-b.getActions() / 2, b);
		} catch (e)    {
			console.error(e.stack);
		}
		 a = dado.nextInt(1, 21);
		 c = dado.nextInt(1, 21);
		if (adv && (a >= 10 * b.getModM() || c >= 10 * b.getModM())) {
			return    ("Disparas a " + b.getVaste_Distance() + "m en línea recta y Ejerces " + (b.getVaste() / 2)
					+ " puntos de daño");
		} else if (!adv && a >= 10 * b.getModM()) {
			return    ("Disparas a " + b.getVaste_Distance() + "m en línea recta Ejerces " + (b.getVaste() / 2)
					+ " puntos de daño");
		} else {
			return    ("Fallaste el disparo por sacar " + a + " en la dificultad");
		}
	}

	static   golpeVaste(  b,  adv) {
		try {
			 vaste = (b.getVaste());
			 ataque = Integer.parseInt(usable.atacar(b, 1, adv).split(" ")[1]);
			usable.useActions(-b.getActions() / 4, b);
			return    (" El ataque se imbuye de vaste y ejerce " + vaste + "(v) + " + ataque + "(a): "
					+ (vaste + ataque) + " puntos de daño.");
		} catch (e)    {
			console.error(e.stack);
		}
		return    "Algo falló";
	}

	static   reconVaste(  b) {
		try {
			usable.useActions(-b.getMaxActions() / 5, b);
		} catch (e)    {
			console.error(e.stack);
		}
		return    (b.getVaste_Distance() + "m de rango estudiados");

	}

	static   corazaDeVaste(  b) {
		try {
			usable.useActions(-b.getMaxActions() / 4, b);
		} catch (e)    {
			console.error(e.stack);
		}
		return    ("El siguiente ataque recibido quitará " + b.getVaste() / 2 + " puntos menos de daño");

	}

	static   corazaTotalDeVaste(  b) {
		if (b.getActions() >= 6) {
			try {
				usable.useActions(-b.getMaxActions() / 2, b);
			} catch (e)    {
				console.error(e.stack);
			}
			return    ("El siguiente ataque que recibas será anulado si se supera dificultad, de lo contrario, quitará sólo la mitad");
		} else {
			return    ("No hay acciones");
		}
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////// JANO

	static   parieJoint(  b) {
		try {
			usable.useActions(b.getActions() / 5, b);
		} catch (e)    {
			console.error(e.stack);
		}
		return    "Puedes llevar hasta " + b.getMin() / 8 + " persona/as a una distancia de " + b.getVaste_Distance()
				+ "m. No necesitas poder verlos, sólo que acepten mentalmente tu invitación.";

	}

	static   polarisVex(  b) {
		try {
			usable.useActions(b.getActions() / 5, b);
		} catch (e)    {
			console.error(e.stack);
		}

		return    "Puedes secuestrar una zona inhabitada de la realidad por un instante en la dimensión espejo. "
				+ "Al siguiente turno, esa celda recuperará su contenido y lo hará con una onda de choque a su alrededor de "
				+ b.getVaste_Distance() + "m de alcance y " + b.getVaste() / 10 + " de daño.";

	}

//////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////// BUNRAKU

	static   heigerInvert(  b) {
		try {
			usable.useActions(b.getActions() / 4, b);
		} catch (e)    {
			console.error(e.stack);
		}

		return    "Inviertes la temperatura de " + b.getVaste_Distance()
				+ "m a la redonda, pudiendo concentrarla en un punto u objeto. "
				+ "Todo se vuelve frío para congregar su energía anterior en un solo lugar, o viceversa.";
	}

	static   hastroUpter(  b) {
		try {
			usable.useActions(b.getActions() / 5, b);
		} catch (e)    {
			console.error(e.stack);
		}
		return    "Puedes levantar hasta " + b.getMin() / 8 + " estructuras de hasta " + b.getVaste() / 8
				+ "m cuadrados a una distancia de " + b.getVaste_Distance() + "m. Dureza depende del material.";
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////// LEIRZA

	static   regenerar(  b) {
		 necesario = b.getMaxHp() - b.getHp();
		 posible = b.getActions() * 2;
		if (posible >= necesario) {
			try {
				usable.useHp(necesario, b);
				usable.useActions(necesario / 2, b);
			} catch (e)    {
				console.error(e.stack);
			}
		} else {
			try {
				necesario -= b.getActions();
				usable.useHp(posible, b);
				usable.useActions(b.getActions(), b);
			} catch (e)    {
				console.error(e.stack);
			}
		}
		return    "Se ha regenerado";
	}

	static   drenarVida(  b,  avg,  ataque) {
		try {
			 regen = ataque / 3;
			usable.useActions(regen, b);
			usable.useHp(regen / 2, b);
			return    ataque + "\nRegeneras " + regen + " acciones  y" + regen / 2
					+ "  puntos de vida con este ataque.";
		} catch (e)    {
			console.error(e.stack);
		}
		return null;
	}

}

