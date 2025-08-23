import React, { useEffect, useState } from "react";

const ListaFormularios = () => {
  const [formularios, setFormularios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchFormularios = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/formularios/listar", {
          credentials: "include", // si usas cookies de sesión
        });
        const data = await response.json();
        setFormularios(data);
      } catch (error) {
        console.error("Error al cargar formularios:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchFormularios();
  }, []);

  if (cargando) return <p>Cargando formularios...</p>;

  return (
    <div>
      <h2>Lista de Formularios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Niño</th>
            <th>Edad</th>
            <th>Sexo</th>
            <th>Fecha Nacimiento</th>
            <th>Tipo de Parto</th>
            <th>Lactancia</th>
          </tr>
        </thead>
        <tbody>
          {formularios.map((f) => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.nombre_nino}</td>
              <td>{f.edad}</td>
              <td>{f.sexo}</td>
              <td>{f.fecha_nacimiento}</td>
              <td>{f.tipo_parto}</td>
              <td>{f.lactancia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaFormularios;
