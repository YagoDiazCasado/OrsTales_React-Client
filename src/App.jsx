import React, { useState, useEffect } from 'react';
import Central from './core/Central';
import LobbyView from './components/LobbyView';
import ConnectionView from './components/ConnectionView';
import AdventureChooserView from './components/AdventureChooserView';
// import ResumeView from './components/ResumeView';
// import InventoryView from './components/InventoryView';
// import WorkShopView from './components/WorkShopView';
// import SkillStoreView from './components/SkillStoreView';
import './App.css';
import video from './assets/fondo.mp4';

export default function App() {
  const [currentView, setCurrentView] = useState(Central.view);
const showHotBar = currentView !== 'connection' && currentView !== 'adventures';

  useEffect(() => {
    Central.subscribeViewChange(setCurrentView);
  }, []);

  const renderHotBar = () => {
    if (currentView === 'connection' || currentView === 'adventures') return null;

    const buttons = [];

    if (currentView === 'lobby') {
      buttons.push(
        <button key="connection" onClick={() => Central.setView('connection')}>
          🔌 Conexión
        </button>,
        <button key="adventures" onClick={() => Central.setView('adventures') }>
          🗺️ Aventuras
        </button>
      );
    }

    const secondaryViews = ['resume', 'inventory', 'workshop', 'store'];
    if (secondaryViews.includes(currentView)) {
      buttons.push(
        <button key="lobby" onClick={() => Central.setView('lobby')}>
          🏠 Lobby
        </button>
      );
      secondaryViews.forEach(view => {
        if (view !== currentView) {
          const labels = {
            resume: '📄 Resume',
            inventory: '🎒 Inventario',
            workshop: '⚒️ Taller',
            store: '📚 Tienda'
          };
          buttons.push(
            <button key={view} onClick={() => Central.setView(view)}>
              {labels[view]}
            </button>
          );
        }
      });
    }

    return <div className="hot-bar">{buttons}</div>;
  };

  return (
    <>
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src={video} type="video/mp4" />
          No se puede poner video una pena
        </video>
      </div>

      <div className="app-container">
        {renderHotBar()}
<main className={showHotBar ? 'with-hotbar' : ''}>
          {currentView === 'connection' && <ConnectionView />}
          {currentView === 'adventures' && <AdventureChooserView />} 
          {currentView === "lobby" && <LobbyView />}
              {/* 
            {currentView === "resume" && <ResumeView />}
            {currentView === "inventory" && <InventoryView />}
            {currentView === "workshop" && <WorkShopView />}
            {currentView === "store" && <SkillStoreView />}   
          */}
        </main>
      </div>
    </>
  );
}
