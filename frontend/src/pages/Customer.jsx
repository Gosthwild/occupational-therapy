import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Customer.css';

const Customer = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userName, setUserName] = useState("Usuario"); // valor por defecto
    const navigate = useNavigate();

    // Obtener el nombre del usuario desde localStorage al montar el componente
    useEffect(() => {
        const storedName = localStorage.getItem("nombre");
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    const handleStart = () => {
        navigate("/disclaimer", { state: { userName } });
    };

    return (
        <div className="landing-container">
            <header className="header">
                <div className="header-content">
                    <div className="header-inner">
                        {/* Logo */}
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

                        {/* Navegación Desktop */}
                        <nav className="desktop-nav">
                            <button className="nav-link" onClick={() => navigate("/customer")}>Inicio</button>
                            <button className="nav-link" onClick={() => navigate("/perfil")}>Perfil</button>
                            <button className="nav-link" onClick={() => navigate("/resultados")}>Resultados</button>
                            <button className="nav-link" onClick={() => navigate("/")}>Salir</button>
                        </nav>

                        {/* Botón menú móvil */}
                        <div className="mobile-menu-button">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="menu-toggle">
                                <svg className="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Menú móvil */}
                    {isMenuOpen && (
                        <div className="mobile-nav">
                            <div className="mobile-nav-links">
                                <button onClick={() => { navigate("/customer"); setIsMenuOpen(false); }} className="mobile-nav-link">Inicio</button>
                                <button onClick={() => { navigate("/perfil"); setIsMenuOpen(false); }} className="mobile-nav-link">Perfil</button>
                                <button onClick={() => { navigate("/resultados"); setIsMenuOpen(false); }} className="mobile-nav-link">Resultados</button>
                                <button onClick={() => { navigate("/"); setIsMenuOpen(false); }} className="mobile-nav-link">Salir</button>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Sección principal */}
            <section className="featu-section" id="features">
                <div className="container">
                    <br /><br />
                    <h2>Bienvenido {userName}</h2>
                    <br /><br />
                    <p>
                        Estás por comenzar una evaluación que nos permitirá conocer mejor las habilidades, rutinas y necesidades del niño en distintas áreas clave del desarrollo.
                        Esta información será útil para brindar un acompañamiento más personalizado y efectivo. Estas son las áreas que evaluamos
                    </p>
                    <br />

                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="icon">👶</div>
                            <h3>Historia del Desarrollo</h3>
                            <p>Desde el gateo y la marcha hasta el control de esfínteres, exploramos los hitos clave del desarrollo motor y de autonomía.</p>
                        </div>
                        <div className="feature-item">
                            <div className="icon">🍴</div>
                            <h3>Alimentación</h3>
                            <p>Evaluamos hábitos alimenticios, uso de utensilios, preferencias de consistencia y posibles dificultades sensoriales o motoras.</p>
                        </div>
                        <div className="feature-item">
                            <div className="icon">🚿</div>
                            <h3>Higiene</h3>
                            <p>Analizamos la independencia en el baño, lavado de manos y colaboración en rutinas de higiene personal.</p>
                        </div>
                        <div className="feature-item">
                            <div className="icon">🧥</div>
                            <h3>Vestido y Desvestido</h3>
                            <p>Observamos el nivel de autonomía del niño al vestirse y desvestirse, identificando posibles desafíos motores o de coordinación.</p>
                        </div>
                        <div className="feature-item">
                            <div className="icon">🎲</div>
                            <h3>Juego e Interacción</h3>
                            <p>Comprendemos cómo el niño juega, su nivel de interacción con otros y su interés por el entorno lúdico.</p>
                        </div>
                        <div className="feature-item">
                            <div className="icon">💬</div>
                            <h3>Comunicación</h3>
                            <p>Evaluamos las formas en que el niño se comunica, tanto verbal como no verbalmente, y su capacidad para expresar necesidades.</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <button
                            className="ctaa-button"
                            onClick={handleStart}
                        >
                            Comenzar
                        </button>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-content">
                    <p>© 2025 CARYAN Insights. Todos los derechos reservados.</p>
                    <p>Texto de ejemplo para modificar más adelante.</p>
                </div>
            </footer>
        </div>
    );
};

export default Customer;
