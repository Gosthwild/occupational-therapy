import React, { useState } from 'react';
import './styles/Home.css';
import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; // Para scroll suave

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Header/Navigation */}
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

            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              <button className="nav-link" onClick={() => navigate("/registro")}>
                Registrarse
              </button>
              <button className="nav-link" onClick={() => navigate("/login")}>
                Iniciar sesión
              </button>
              <ScrollLink
                className="nav-link"
                to="benefits"
                smooth={true}
                duration={500}
                offset={-80} // Ajusta según altura del header
              >
                Beneficios
              </ScrollLink>
              <ScrollLink
                className="nav-link"
                to="how-it-works"
                smooth={true}
                duration={500}
                offset={-80}
              >
                Cómo Funciona
              </ScrollLink>
              <ScrollLink
                className="nav-link"
                to="footer"
                smooth={true}
                duration={500}
                offset={-80}
              >
                Contacto
              </ScrollLink>
            </nav>

            {/* Mobile menu button */}
            <div className="mobile-menu-button">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="menu-toggle"
              >
                <svg className="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="mobile-nav">
              <div className="mobile-nav-links">
                <button onClick={() => navigate("/registro")} className="mobile-nav-link">
                  Registro
                </button>
                <button onClick={() => navigate("/login")} className="mobile-nav-link">
                  Iniciar sesión
                </button>
                <ScrollLink to="benefits" smooth={true} duration={500} offset={-80} className="mobile-nav-link">
                  Beneficios
                </ScrollLink>
                <ScrollLink to="how-it-works" smooth={true} duration={500} offset={-80} className="mobile-nav-link">
                  Cómo Funciona
                </ScrollLink>
                <ScrollLink to="footer" smooth={true} duration={500} offset={-80} className="mobile-nav-link">
                  Contacto
                </ScrollLink>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <div className="hero-inner">
            {/* Main Heading */}
            <h1 className="hero-title">
              <span className="hero-title-highlight">CARYAN:</span> Iluminando el Camino del
              <br />
              <span className="hero-title-block">Desarrollo Infantil</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              Una herramienta para comprender y potenciar el perfil ocupacional de infantes en etapa temprana
            
              
            </p>

            {/* Call to Action Button */}
            <div className="cta-container">
              <button className="cta-button" onClick={() => navigate("/registro")}>
                Empezar
              </button>
              
            </div>

            {/* Decorative elements */}
            <div className="decorative-dots">
              <div className="dot dot-1"></div>
              <div className="dot dot-2"></div>
              <div className="dot dot-3"></div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="background-pattern">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
      </main>

      

      {/* Sección: ¿Por Qué Elegir CARYAN Insights? */}
      <section className="benefits-section" id="benefits">
        <div className="container">
          <h2>¿Por Qué Elegir CARYAN Insights?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="icon">🔍</div>
              <h3>Evaluación Precisa</h3>
              <p>Obtén una visión detallada y estandarizada del perfil ocupacional, fundamental para un diagnóstico temprano.</p>
            </div>
            <div className="benefit-item">
              <div className="icon">📈</div>
              <h3>Seguimiento Evolutivo</h3>
              <p>Monitorea el progreso del niño a lo largo del tiempo, ajustando las intervenciones según sus necesidades cambiantes.</p>
            </div>
            <div className="benefit-item">
              <div className="icon">💡</div>
              <h3>Recomendaciones Claras</h3>
              <p>El instrumento genera recomendaciones específicas para la intervención en Terapia Ocupacional, facilitando la toma de decisiones.</p>
            </div>
            <div className="benefit-item">
              <div className="icon">🧑‍🤝‍🧑</div>
              <h3>Empoderamiento Familiar</h3>
              <p>Ayuda a los cuidadores a comprender mejor el desarrollo de sus hijos y a participar activamente en su proceso de mejora.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: El Proceso de Evaluación CARYAN */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="container">
          <h2>El Proceso de Evaluación CARYAN</h2>
          <div className="steps-grid">
            <div className="step-item">
              <div className="icon">👤</div>
              <h3>1. Entrevista al Cuidador</h3>
              <p>El profesional realiza una entrevista estructurada con el cuidador principal para recopilar información detallada.</p>
            </div>
            <div className="step-item">
              <div className="icon">📊</div>
              <h3>2. Puntuación y Observación</h3>
              <p>Se asigna un puntaje a cada ítem (0, 1 o 2) y se registran observaciones profesionales.</p>
            </div>
            <div className="step-item">
              <div className="icon">📋</div>
              <h3>3. Análisis y Recomendación</h3>
              <p>El puntaje total determina el nivel de necesidad de intervención y se genera una recomendación clara.</p>
            </div>
            <div className="step-item">
              <div className="icon">📈</div>
              <h3>4. Seguimiento Continuo</h3>
              <p>La herramienta permite realizar evaluaciones de seguimiento para monitorear el progreso evolutivo del infante.</p>
            </div>
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

export default Home;