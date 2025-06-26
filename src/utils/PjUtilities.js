import ItemService from './ItemService';
import SkillUtilities from './SkillUtilities';
import BasicHitter from '../core/Enums';
import Central from '../core/Central';
import PjService from './PjService';

let df = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 });
  

export const PjUtilities = {
  atacar,
  fistAttack,
  makeEffect,
  useActions,
  useHp,
  useKcal,
  sleep,
  diceLooby,
  useSkill,
  useGlimmers
};

    atacar(pj, diff, adventage) {
    let extra = '';
    let mods = 1.0;
    const arma = pj.weapon; 
    if (!arma) {
      return fistAttack(pj); // método aparte, también deberás traducirlo
    } else {
      if (arma.distance === 'MELEE') {
        await useActions(-1, pj);
        if (arma.weight > 8) {
          diff = Math.floor(diff * pj.modD);
          pj.xpS += 2;
        } else {
          diff = Math.floor(diff * pj.modS);
          pj.xpD += 1;
          pj.xpA += 1;
          mods = Math.min(pj.modD, pj.modA);
        }
      } else {
        if (pj.power === 'JANO') {
          diff -= Math.floor(diff / 2);
        }
        diff = Math.floor(diff * pj.modM);
      }

      // Llama al sistema de ataque con el arma
      const ataque = await ItemService.atacar(arma, diff, adventage, pj);
      pj = ataque.pj;
      const basicDamage = ataque.dano;

      if (basicDamage === 0) {
        return "Fallaste";
      } else if (basicDamage === -1) {
        return "No hay munición";
      } else {
        if (
          pj.power === 'LEIRZA' &&
          basicDamage >= 1 &&
          arma.distance === 'MELEE'
        ) {
          extra = '\n' + await SkillUtilities.getHabilidadMethod("drenarVida", pj, adventage, basicDamage);
        }

        return `Ejecuta ${this.df.format(basicDamage / mods)} con ${arma.name}${extra}`;
      }
    }
  }


	  fistAttack( pj)  {
		let entrega = 1;
		let mod = 0;
		switch (pj.getBasicHitter()) {
		case BasicHitter.FISTS:
			mod = (int) (pj.getStr() / pj.getModS());
			break;
		case BasicHitter.LEGS:
			mod = (int) (pj.getStr() / pj.getModA());
			break;
		case BasicHitter.ELBOWS:
			mod = (int) (pj.getStr() / pj.getModS());
			break;
		case BasicHitter.KNEES:
			mod = (int) (pj.getStr() / (pj.getModA() - pj.getModS()));
			break;
		case BasicHitter.FINGERS:
			mod = (int) (pj.getStr() / pj.getModM());
			break;
		case BasicHitter.BLADEHANDS:
			mod = (int) (pj.getStr() / pj.getModA());
			break;
		}
		if (mod <= 1)
			mod = 4;
		entrega = Central.dado.nextInt(1, mod);
		return "Ejecuta " + entrega + " con " + pj.getBasicHitter();

	}

	 checkDistance(pj, m) {
  if (pj.getSpeed() < m) {
    const gasto = (pj.getSpeed() - m) * pj.getModA();
    return `Gastarás ${gasto} acciones en correr ${m}`;
  } else {
    return "Puedes correr eso sin usar acciones";
  }
   }


	////////////////////////////////////////////////////////////
	///////////////////////////////////////// Metodos de Usables

	// kcal hp acc. Negativo resta positivo suma
	makeEffect(  amountCollection,  pj) {
		 amount = amountCollection.split(" ");
		 kcal = Integer.parseInt(amount[0]);
		 hp = Integer.parseInt(amount[1]);
		 acc = Integer.parseInt(amount[2]);

		if (acc != 0) {
			useActions(acc, pj);
		}
		if (hp != 0) {
			useHp(hp, pj);
		}
		if (kcal != 0) {
			useKcal(kcal, pj);
		}

	}

	 useActions( i,  pj){
		console.log((pj.getActions() + 1) + " acciones");
		if ((pj.getActions() + i) >= 0) {
			pj.setActions(Math.min(pj.getActions() + i, pj.getMaxActions()));
			if (i < 0) {
				if (i > 4) {
					pj.setXpS(pj.getXpS() + 1);
				} else {
					pj.setXpA(pj.getXpA() + 1);
				}
				console.log("Entro a useKcal");
				gasto = (i * pj.getModA() * (40 * pj.getWeight() / (80 * pj.getModS())));
				useKcal(gasto, pj);
			}
		} else {
			throw new Error("No tienes acciones suficientes");
		}
	}

	  useHp( i,  pj) {
		if (pj.getHp() + i > 0) {
			pj.setHp(Math.min(pj.getHp() + i, pj.getMaxHp()));
			if (i < 0) {
				pj.setXpE(pj.getXpE() + i);
				gasto = (i * (20 * pj.getWeight() / (100 / pj.getModE())));
				useKcal(gasto, pj);
			}
		} else {
			pj.setHp(0);
			throw new Error(pj.getName() + " ha muerto");
		}
	}

	  useKcal(  i,  pj){
		console.log("Antes: kcal=" + pj.getKcal() + " i=" + i);
		if (pj.getPower() == ("BUNRAKU")) {
			i -= i / 2;
		}
		if (pj.getPower() == ("LEIRZA")) {
			await SkillUtilities.regenerar(pj);
		}
		console.log(".....................................................");
        pj.setKcal(Math.floor(Math.max(0, Math.min(pj.getKcal() + i, pj.getMaxKcal()))));
		if (i < 0) {
			if (pj.getKcal() < pj.getMaxKcal() / 6) {
				pj.setXpM(pj.getXpM() + 1);
				pj.setXpE(pj.getXpE() + 1);
				pj.setHp(pj.getHp() - (pj.getHp() / 8));
			} else if (pj.getKcal() <= pj.getMaxKcal() / 2) {
				pj.setXpM(pj.getXpM() + 1);
			}
		}
		console.log("Después: kcal=" + pj.getKcal());

	}

	// 1 es descanso corto. DEbe de gastar menos de todo pero mejorar poc ola xp
	// 2 es descanso largo. Debe de gastar más de todo peromejorar mucho la xp
	sleep( pj,  condition)   {
		  modPeso = 0.0;
		  kcalActual = pj.getKcal(); // funcionara porque s  , sino se raya con el  del atrib
		  kcalMax = pj.getMaxKcal();

		if (kcalActual < kcalMax * 0.5) {
			modPeso = -((kcalMax - kcalActual) / 2500.0);
		} else if (kcalActual >= kcalMax * 0.66) {
			modPeso = kcalActual / 3000.0;
		}

		pj.setWeightLose(pj.getWeightLose() + modPeso);
		pj.setXpM((int) (pj.getXpM() + 1 * condition));
		pj.setXpE((int) (pj.getXpE() + 1 * condition));

		// REGEN
		 hpRecuperada = Math.min((int) (pj.getHp() * condition), pj.getMaxHp());
		 accionesRecuperadas = Math.min((int) ((Math.max(pj.getActions(), 2)) * (condition / 2.0)),
				pj.getMaxActions());
		 kcalGastadas = (int) (-pj.getKcal() * (condition / 4.0)); // esto negativo porque es lo unico que se resta

		  envio = kcalGastadas + " " + hpRecuperada + " " + accionesRecuperadas;
		System.err.println(envio);
		makeEffect(envio, pj);
	}

	////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////// Dados

	 diceLooby( pj, type) { // devuelve el max dado
		new PjService();
		statLv = PjService.getStat(type, pj);
		if (statLv <= 5) {
			return 2;
		} else if (statLv > 5 && statLv <= 15) {
			return 4;
		} else if (statLv > 15 && statLv <= 25) {
			return 6;
		} else if (statLv > 25 && statLv <= 30) {
			return 8;
		} else if (statLv > 30 && statLv <= 45) {
			return 10;
		} else if (statLv > 45 && statLv <= 55) {
			return 12;
		} else if (statLv > 55 && statLv <= 65) {
			return 16;
		} else if (statLv > 65 && statLv <= 75) {
			return 18;
		} else {
			return 20;
		}
	}

	useGlimmers( numero,  selected) {
		try {
			if (numero < 0 && selected.getGlimmers() < numero) {
				selected.setGlimmers(0);
			} else {
				selected.setGlimmers(selected.getGlimmers() + numero);
			}
		} catch (e) {
         console.error(e.stack);		}
	}

    useSkill(pj, skillName){

    }

