import React, { useState, useEffect } from 'react';
import Central from '../core/Central';
import { AdventureService } from '../api/AdventureService';
import { PjService } from '../api/PjService';
import { RaceService } from '../api/RaceService';
import { BodyTypeService } from '../api/BodyTypeService';
import { ImagenesUtil } from '../utils/ImagenesUtil';
import './LobbyView.css';

export default function LobbyView() {
  const [selected, setSelected] = useState(Central.selected);
  const [pjs, setPjs] = useState([]);
  const [position, setPosicion] = useState(0);
  const [defaultImage, setDefaultImage] = useState(null);
  const [imagenDePerfilPosible, setImagenDePerfilPosible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [raceOptions, setRaceOptions] = useState([]);
  const [btOptions, setBtOptions] = useState([]);
  const [powerOptions, setPowerOptions] = useState([]);

  const currentAdventure = Central.adventure;
  const dm = Central.dm;

//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////// INICIO

  useEffect(() => {
    iniciar();
  }, []);

  async function iniciar() {
    try {
      const defaultImg = await ImagenesUtil.randomImagePick();
      setDefaultImage(defaultImg);
      setImagenDePerfilPosible(defaultImg);
      setPjs(await PjService.getCompletePJs(currentAdventure, dm));
      if (pjs.length > 0) {
        setSelected(pjs[position]);
        loadCharacterPage(pjs[position]);
      } else {
        createCharacter();
      }
    } catch (error) {
      console.error('Error al iniciar Lobby:', error);
    }
  }

//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////// REFRESCO

  async function loadCharacterPage(pj) {
    try {
      setSelected(pj);
    } catch (e) {
      console.error('Error en refrescoDeEstilo:', e);
    }
  }

  function handleSlide(direction) {
    const newPos = (position + direction + pjs.length) % pjs.length;
    setPosicion(newPos);
    const nuevoPJ = pjs[newPos];
    setSelected(nuevoPJ);
    loadCharacterPage(nuevoPJ);
  }

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////// FUNCIONES

  async function createCharacter() {
    try {
      const races = await RaceService.getAll();
      const bts = await BodyTypeService.getAll();
      bts.forEach(bt => bt.fillMods());
      setRaceOptions(races.map(r => r.name));
      setBtOptions(bts.map(bt => bt.name));
      setPowerOptions(['REGULAR', 'JANO', 'BUNRAKU', 'LEIRZA']);
      // puedes seguir implementando los sliders y demás inputs
    } catch (error) {
      console.error('Error al crear personaje inicial:', error);
    }
  }

//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////// HTML

  return (
    <div className="lobby-container">
      {loading && <div className="loading-overlay">Cargando...</div>}
      <div className="character-panel">
        {selected && (
          <>
            <img src={ImagenesUtil.byteArrayToUrl(selected.profile)} alt="pj" className="profile-image" />
            <h2>{selected.name}</h2>
            <div className="stats">
              <p>ATL: {selected.atl}</p>
              <p>STR: {selected.str}</p>
              <p>END: {selected.end}</p>
              <p>MIN: {selected.min}</p>
              <p>DEX: {selected.dex}</p>
            </div>
          </>
        )}
        <div className="carousel-buttons">
          <button onClick={() => handleSlide(-1)}>Anterior</button>
          <button onClick={() => handleSlide(1)}>Siguiente</button>
        </div>
      </div>
    </div>
  );
}
