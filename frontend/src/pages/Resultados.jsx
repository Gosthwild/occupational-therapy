// src/pages/Perfil.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./styles/Perfil.css";

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formulario, setFormulario] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email"); 
    const token = localStorage.getItem("token"); 

    if (!email) {
      navigate("/login");
      return;
    }

    const fetchUsuario = async () => {
      try {
        const res = await api.get(`/api/pg/usuarios/${email}`, {
          headers: { Authorization: `Bearer ${token || ""}` },
        });
        setUsuario(res.data);
        setFormulario(res.data);
      } catch (error) {
        console.error("Error al obtener usuario:", error.response?.data || error.message);
      }
    };

    fetchUsuario();
  }, [navigate]);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/api/pg/usuarios/${usuario.email}`, formulario, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
      });
      setUsuario(formulario);
      setEditando(false);
      alert("Perfil actualizado ✅");
    } catch (error) {
      console.error("Error al actualizar:", error.response?.data || error.message);
      alert("Error al actualizar perfil ❌");
    }
  };

  if (!usuario) return <p>⏳ Cargando datos de usuario...</p>;

  return (
    <div className="perfil-page">
      {/* Header idéntico a Customer */}
      <header className="header">
        <div className="header-content">
          <div className="header-inner">
            <div className="logo-container">
              <div className="logo-wrapper">
                <div className="logo-icon"><span className="logo-letter">C</span></div>
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
              <button className="nav-link" onClick={() => { localStorage.clear(); navigate("/login"); }}>Salir</button>
            </nav>
          </div>
        </div>
      </header>

      {/* Contenedor de perfil */}
      <div className="perfil-container">
        {/* Icono / foto de usuario */}
        <div className="perfil-icon" onClick={() => document.getElementById('fotoInput').click()}>
          {usuario.foto ? (
            <img src={usuario.foto} alt="Usuario" />
          ) : (
            "👤"
          )}
          <input
            type="file"
            id="fotoInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => setUsuario({ ...usuario, foto: reader.result });
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>

        {/* Información del usuario */}
        <div className="perfil-info">
          {["nombre", "apellido", "cedula", "telefono", "email"].map((campo) => (
            <div className="perfil-row" key={campo}>
              <label>{campo.toUpperCase()}:</label>
              {editando ? (
                <input type="text" name={campo} value={formulario[campo] || ""} onChange={handleChange} />
              ) : (
                <span>{usuario[campo]}</span>
              )}
            </div>
          ))}

          {editando ? (
            <div className="perfil-buttons">
              <button onClick={handleUpdate}>💾 Guardar</button>
              <button onClick={() => { setFormulario(usuario); setEditando(false); }}>❌ Cancelar</button>
            </div>
          ) : (
            <button className="editar" onClick={() => setEditando(true)}>Actualizar Información</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
