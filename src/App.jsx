// App.jsx
import React, { useState } from 'react';
import { PJ } from './entities/Pj';
import CredentialView from './components/CredentialView';

export default function App() {
    //Esto basicamente le dice a react que cada vez que este pj tenga cambios
    // se refresque en la pantalla
  const [pj, setPJ] = useState(new PJ()); 

  const recibirDanio = (cantidad) => {
    pj.recibirDanio(cantidad);
    //Esto es lo que avisa a lo de antes para refrescar:
    setPJ({ ...pj }); 
    //los puntos suspensivos es copiar todas las variables
  };
  return (
    <div>
      <h1>Mi App RPG</h1>
      Esto es como meter un jPanel dentro del Frame, que seria App.jsx:
      <CredentialView pj={pj}/>
    </div>
  );
}
