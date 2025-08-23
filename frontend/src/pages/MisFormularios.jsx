// src/components/MisFormularios.jsx
import React, { useEffect, useState } from "react";
import "./styles/MisFormularios.css";

// Función para traducir códigos de razones a frases comprensibles
const convertirRazon = (razon) => {
  const mapa = {
    siempreCuna: "Siempre en la cuna",
    noPiso: "No pisa el suelo",
    noAnimaba: "No animaba a moverse",
    muchoAcostado: "Mucho tiempo acostado",
    prematuro: "Nacimiento prematuro",
    noBocaAbajo: "No se pone boca abajo",
    caminar: "Miedo a caminar",
    bajoPeso: "Bajo peso",
    usoAndador: "Uso de andador",
    loCargaban: "Siempre lo cargaban",
    noFuerza: "Falta de fuerza",
    noJugaba: "No jugaba",
    miedoBano: "Miedo al baño",
    dificilInstrucciones: "Dificultad para seguir instrucciones",
    noEnsenio: "No enseñó habilidades",
    muchaTV: "Viendo mucha televisión",
    problemasAuditivos: "Problemas auditivos",
    pocaAtencion: "Poca atención",
  };
  return mapa[razon] || razon;
};

export default function MisFormularios() {
  const [formularios, setFormularios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormularios = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No hay token de autenticación");

        const res = await fetch("http://localhost:5000/api/formularios/mis-formularios", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Error al obtener formularios: ${res.status}`);

        const data = await res.json();
        setFormularios(data || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    fetchFormularios();
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!formularios.length) return <p>No hay formularios guardados.</p>;

  return (
    <div className="mis-formularios">
      {formularios.map((f) => (
        <div key={f.id} className="formulario-card">
          <h2>Paciente {f.nombre_nino}</h2>
          <p><strong>Edad:</strong> {f.edad}</p>
          <p><strong>Sexo:</strong> {f.sexo}</p>
          <p><strong>Cuidador principal:</strong> {f.cuidador_principal}</p>
          <p><strong>Parentesco:</strong> {f.parentesco}</p>
          <p><strong>Nacionalidad:</strong> {f.nacionalidad}</p>
          <p><strong>Contacto:</strong> {f.contacto}</p>
          <p><strong>Convivencia:</strong> {f.convivencia}</p>
          <p><strong>Hermanos:</strong> {f.hermanos}</p>
          <p><strong>Dificultades hermanos:</strong> {f.dificultades_hermanos}</p>
          <p><strong>Cuidador durante el día:</strong> {f.cuidador_dia}</p>
          {f.cuidador_dia_otro && <p><strong>Otro cuidador:</strong> {f.cuidador_dia_otro}</p>}

          <h3>Embarazo y parto:</h3>
          <p><strong>Embarazo controlado:</strong> {f.embarazo_controlado}</p>
          <p><strong>Complicaciones:</strong> {f.complicaciones.join(", ")}</p>
          {f.complicaciones_otro && <p><strong>Otra complicación:</strong> {f.complicaciones_otro}</p>}
          <p><strong>Embarazo planeado:</strong> {f.embarazo_planeado}</p>
          <p><strong>Tipo de parto:</strong> {f.tipo_parto}</p>
          <p><strong>Prematuro:</strong> {f.prematuro}</p>
          <p><strong>Hospitalización:</strong> {f.hospitalizacion}</p>
          <p><strong>Tiempo hospitalización:</strong> {f.tiempo_hospitalizacion}</p>
          <p><strong>Dificultad nacimiento:</strong> {f.dificultad_nacimiento}</p>
          {f.dificultad_nacimiento_detalle && <p><strong>Detalle dificultad:</strong> {f.dificultad_nacimiento_detalle}</p>}

          <h3>Alimentación y desarrollo:</h3>
          <p><strong>Lactancia:</strong> {f.lactancia}</p>
          <p><strong>Dificultades alimentación:</strong> {f.dificultades_alimentacion}</p>
          {f.dificultades_alimentacion_desc && <p><strong>Detalle:</strong> {f.dificultades_alimentacion_desc}</p>}
          <p><strong>Temperamento:</strong> {f.temperamento}</p>
          <p><strong>Estimulación:</strong> {f.estimulacion}</p>

          <h3>Hitos del desarrollo:</h3>
          <div className="hitos">
            {f.hitos &&
              Object.entries(f.hitos).map(([hito, info]) => (
                <div key={hito} className="hito-card">
                  <h4>{hito.charAt(0).toUpperCase() + hito.slice(1)}</h4>
                  <p><strong>Edad registrada:</strong> {info.edad}</p>
                  <p><strong>Esperado:</strong> {info.esperado}</p>
                  {info.razon && info.razon.length > 0 && (
                    <ul>
                      {info.razon.map((r, i) => (
                        <li key={i}>{convertirRazon(r)}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
