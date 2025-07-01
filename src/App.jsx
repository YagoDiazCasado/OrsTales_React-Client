import React, { useState, useEffect } from 'react';
import Central from './core/Central';
import LobbyView from './components/LobbyView';
import ConnectionView from './components/ConnectionView';
//import AdventureChooserView from './components/AdventureChooserView';
//import DmChooserView from './components/DmChooserView';
//import ResumeView from './components/ResumeView';
//import InventoryView from './components/InventoryView';
//import WorkShopView from './components/WorkShopView';
//import SkillStoreView from './components/SkillStoreView';
import './App.css';
import video from './assets/fondo.mp4';

export default function App() {

 const [currentView, setCurrentView] = useState(Central.view);

  useEffect(() => {
    Central.subscribeViewChange(setCurrentView); // Se suscribe al cambio
  }, []);

  return (
     <>
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src={video} type="video/mp4" />
          No se puede poner video una pena
        </video>
      </div>
      
      <div className="app-container">
        {/* Meter aqui ajustes de cargas */}
      {currentView !== "connection" && (
        <div className="hot-bar">
          <button onClick={() => Central.setView("adventures")}>🗺️ Aventuras</button>
          <button onClick={() => Central.setView("choose")}>🧙 Elegir DM</button>
          <button onClick={() => Central.setView("lobby")}>🏠 Lobby</button>
          <button onClick={() => Central.setView("resume")}>📄 Resume</button>
          <button onClick={() => Central.setView("inventory")}>🎒 Inventario</button>
          <button onClick={() => Central.setView("workshop")}>⚒️ Taller</button>
          <button onClick={() => Central.setView("store")}>📚 Tienda</button>
        </div>
      )}
        <main>
          {currentView === "connection" && <ConnectionView />}   
          {currentView === "lobby" && <LobbyView />}
           {/* 
          {currentView === "adventures" && <AdventureChooserView />}
          {currentView === "resume" && <ResumeView />}
          {currentView === "choose" && <DmChooserView />}
          {currentView === "inventory" && <InventoryView />}
          {currentView === "workshop" && <WorkShopView />}
          {currentView === "store" && <SkillStoreView />}   
          */}               
        </main>
      </div>
    </>
  );
}
