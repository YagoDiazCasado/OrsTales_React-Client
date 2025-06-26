// CredentialView.jsx
import React from 'react';

export default function CredentialView({ pj }) {
  return (
    <div>
      <h2>{pj.name}</h2>
      <p>HP: {pj.hp} / {pj.maxHp}</p>
    </div>
  );
}
