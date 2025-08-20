import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <span className="logo-letter">C</span>
          <div>
            <div className="logo-title">CARYAN</div>
            <div className="logo-subtitle">Insights</div>
          </div>
        </div>

        <nav className="desktop-nav">
          <button onClick={() => navigate("/customer")}>Inicio</button>
          <button onClick={() => navigate("/perfil")}>Perfil</button>
          <button onClick={() => navigate("/resultados")}>Resultados</button>
          <button onClick={() => navigate("/")}>Salir</button>
        </nav>

        <div className="mobile-menu-button">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="menu-toggle">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-nav">
            <button onClick={() => { navigate("/customer"); setIsMenuOpen(false); }}>Inicio</button>
            <button onClick={() => { navigate("/perfil"); setIsMenuOpen(false); }}>Perfil</button>
            <button onClick={() => { navigate("/resultados"); setIsMenuOpen(false); }}>Resultados</button>
            <button onClick={() => { navigate("/"); setIsMenuOpen(false); }}>Salir</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
