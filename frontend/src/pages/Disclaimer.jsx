import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Disclaimer.css'; // Mantener estilos existentes

const Disclaimer = () => {
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const navigate = useNavigate();

    const handleStart = () => {
        if (acceptedTerms) {
            navigate("/formulario"); // Aquí iría la vista siguiente
        } else {
            alert("Por favor acepta los términos y condiciones antes de continuar.");
        }
    };

    const handleCancel = () => {
        navigate("/customer");
    };

    return (
        <div className="landing-container">
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <div className="header-inner">
                        <div className="logo-container">
                            <div className="logo-wrapper">
                                <div className="logo-icon">
                                    <span className="logo-letter">C</span>
                                </div>
                                <div>
                                    <div className="logo-title">CARYAN</div>
                                    <div className="logo-subtitle">Insights</div>
                                </div>
                            </div>
                        </div>

                        <nav className="desktop-nav">
                            <button className="nav-link" onClick={() => navigate("/customer")}>Inicio</button>
                            <button className="nav-link" onClick={() => navigate("/perfil")}>Perfil</button>
                            <button className="nav-link" onClick={() => navigate("/resultados")}>Resultados</button>
                            <button className="nav-link" onClick={() => navigate("/")}>Salir</button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Contenido principal */}
            <section className="featu-section" id="disclaimer">
                <div className="container">
                    <br />
                    <h2>Directrices generales</h2>
                    <br />

                    <p>
                        La participación en esta evaluación es voluntaria. Al responder, el cuidador acepta y brinda su consentimiento para que la información obtenida sea utilizada con fines de valoración clínica, seguimiento del desarrollo y recomendaciones terapéuticas.
                    </p>
                    <br />
                    <h3>Recomendaciones</h3>
                    <br />
                    <p>
                        • Leer cada pregunta de manera pausada y comprensible.<br />
                        • Responda de manera clara y sincera, según lo que observe en su niño(a).<br />

                        • Complementar con observación clínica y anotar observaciones relevantes.
                    </p>
                    <br />
                    <br />
                    <label className="terms-label">
                        <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                        />
                        Acepto los términos y condiciones.
                    </label>
                    <br />

                    <div className="disclaimer-buttons">
                        <button
                            className="ctaa-button"
                            onClick={handleStart}
                            disabled={!acceptedTerms}
                            style={{
                                opacity: acceptedTerms ? 1 : 0.6,
                                cursor: acceptedTerms ? 'pointer' : 'not-allowed',
                                marginBottom: '10px',
                                width: '200px'
                            }}
                        >
                            Iniciar evaluación
                        </button>

                        <button
                            className="ctaa-button"
                            onClick={handleCancel}
                            style={{
                                backgroundColor: '#e31414d7',
                                color: '#ffffffff',
                                cursor: 'pointer',
                                width: '200px'
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>© 2025 CARYAN Insights. Todos los derechos reservados.</p>
                    <p>Texto de ejemplo para modificar más adelante.</p>
                </div>
            </footer>
        </div>
    );
};

export default Disclaimer;
