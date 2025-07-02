import React, { useState, useEffect } from 'react';
import Central from '../core/Central';
import { AdventureService } from '../api/AdventureService';
import './AdventureChooserView.css';

export default function AdventureChooserView() {
    const initialAdventures = Central.adventureList || [];
    const [adventures, setAdventures] = useState(initialAdventures);
    const [selectedAdventure, setSelectedAdventure] = useState(initialAdventures[0] || null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [createAdventure, setCreate] = useState(false);
    const [newName, setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // Función para recargar las aventuras desde la API
    const loadAdventures = async () => {
        try {
            const all = await AdventureService.getAll();
            const filtered = all.filter(a => a && a.name); // Protección defensiva
            Central.adventureList = filtered;
            setAdventures(filtered);
        } catch (e) {
            console.error("No se pudieron cargar aventuras", e);
            setError("No se pudieron cargar las aventuras");
        }
    };

    useEffect(() => {
        loadAdventures();
    }, []);

    useEffect(() => {
        Central.adventure = selectedAdventure;
    }, [selectedAdventure]);

    const handleLogin = async (isDM) => {
        if (!selectedAdventure) return;
        setLoading(true);
        try {
            const correctPassword =
                selectedAdventure.pasword === password || Central.lastpasword === password;
            if (correctPassword) {
                Central.adventure = selectedAdventure;
                Central.dm = isDM;
                Central.lastpasword = password;
                setError('');
                Central.setView("lobby");
            } else {
                setError('Contraseña incorrecta.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAdventure = async () => {
        if (!newName || !newPassword) {
            setError("Nombre y contraseña requeridos");
            return;
        }

        const newAdventure = {
            name: newName,
            pasword: newPassword
        };

        try {
            const saved = await AdventureService.create(newAdventure);
            const updated = [...adventures, saved];
            setAdventures(updated);
            Central.adventureList = updated;
            setSelectedAdventure(saved);
            Central.adventure = saved;
            Central.dm = true;
            Central.lastpasword = newPassword;
            Central.setView("lobby");
        } catch (e) {
            setError("Error al crear la aventura: " + e.message);
        }
    };

    return (
        <div className="adventure-container">
            <h1>Elige una aventura</h1>

            {createAdventure ? (
                <div className="form-container">
                    <input
                        type="text"
                        placeholder="Nombre de la aventura"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button className="cancel-button" onClick={() => setCreate(false)}>Cancelar</button>
                    <button className="save-button" onClick={handleCreateAdventure}>Guardar y Entrar</button>
                    {error && <p className="error">{error}</p>}
                </div>
            ) : (
                <>
                    <select
                        onClick={loadAdventures} // Recarga cuando haces clic
                        value={selectedAdventure?.name || ''}
                        onChange={(e) => {
                            const selected = adventures.find(adv => adv?.name === e.target.value);
                            setSelectedAdventure(selected || null);
                            setPassword('');
                            setError('');
                        }}
                    >
                        {adventures
                            .filter(adv => adv && adv.name)
                            .map((adv, i) => (
                                <option key={i} value={adv.name}>
                                    {adv.name}
                                </option>
                        ))}
                    </select>

                    {selectedAdventure && (
                        <div className="form-container">
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                            <button className="create-button" onClick={() => setCreate(true)}> + </button>
                            <div className="button-group">
                                <button onClick={() => handleLogin(true)} disabled={loading}>
                                    Entrar como DM
                                </button>
                                <button onClick={() => handleLogin(false)} disabled={loading}>
                                    Entrar como Player
                                </button>
                            </div>
                            {error && <p className="error">{error}</p>}
                            {loading && <div className="spinner"></div>}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
