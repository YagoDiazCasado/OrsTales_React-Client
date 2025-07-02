import React, { useState, useEffect } from 'react';
import Central from '../core/Central';
import { AdventureService } from '../api/AdventureService';
import './ConnectionView.css'; // 👈 Importa el archivo CSS

export default function ConnectionView() {
  const [ip, setIp] = useState('');
  const [apiPort, setApiPort] = useState('');
  const [chatPort, setChatPort] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
    const [hoveringTitle, setHoveringTitle] = useState(false); // Estado para hover



  useEffect(() => {
    setIp(Central.lastIp || '');
    setApiPort(Central.lastApiPort || '');
    setChatPort(Central.lastChatPort || '');
  }, []);

  const handleEntrar = async () => {
      setLoading(true); 
    Central.lastIp = ip;
    Central.lastApiPort = apiPort;
    Central.lastChatPort = chatPort;
    Central.API = "http://" + Central.lastIp + ":" + Central.lastApiPort;
    console.log(Central.API);
    Central.saveToStorage();
    try {
      const lista = await AdventureService.getAll();
      Central.adventureList = lista;
      console.log('Aventuras cargadas:', lista);
      setError(null);
      Central.setView("adventures"); 
    } catch (e) {
      console.error('Error al conectar:', e);
      setError(e.message);
    }finally {
    setLoading(false); 
  }
  };

  return (
    
<div className={`connection-container ${hoveringTitle ? 'no-blur' : ''}`}>
         <header
        className="title"
        onMouseEnter={() => setHoveringTitle(true)}
        onMouseLeave={() => setHoveringTitle(false)}
      >
        ORS V_1
      </header>
            
      <div className="form">
        <input
          className="input"
          placeholder="IP Servidor"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        <input
          className="input"
          placeholder="Puerto API"
          value={apiPort}
          onChange={(e) => setApiPort(e.target.value)}
        />
        <input
          className="input"
          placeholder="Puerto Chat"
          value={chatPort}
          onChange={(e) => setChatPort(e.target.value)}
        />
        <button className="button" onClick={handleEntrar}>Entrar</button>
        {error && <p className="error">{error}</p>}
          {loading && (
  <div className="spinner"></div>
)}
      </div>
    

    </div>
  );
}
