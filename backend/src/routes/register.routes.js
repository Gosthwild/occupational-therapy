const express = require("express");
const router = express.Router();

const UsuarioDAO = require("../dao/postgres/usuarioDAO");
const usuarioDAO = new UsuarioDAO();

// Validar Email
const esEmailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// POST /api/registro
router.post("/", async (req, res) => {
  const { nombre, apellido, cedula, telefono, email, contrasena, rol_id } = req.body;

  // Validación de campos obligatorios
  if (!nombre || !apellido || !cedula || !telefono || !email || !contrasena || !rol_id) {
    return res.status(400).json({ success: false, error: "Todos los campos son obligatorios" });
  }

  if (!esEmailValido(email)) {
    return res.status(400).json({ success: false, error: "Correo con formato inválido" });
  }

  try {
    // Verificar si el usuario ya existe
    const existente = await usuarioDAO.buscarPorEmail(email);
    if (existente) {
      return res.status(400).json({ success: false, error: "Correo ya registrado" });
    }

    // Crear usuario en PostgreSQL
    const usuarioPG = { nombre, apellido, cedula, telefono, email, contrasena, rol_id };
    const resultado = await usuarioDAO.crear(usuarioPG);

    res.status(201).json({
      success: true,
      message: "Usuario registrado correctamente",
      id: resultado.id
    });

  } catch (error) {
    console.error("❌ Error en el registro:", error);
    res.status(500).json({
      success: false,
      error: "Error en el servidor al registrar el usuario"
    });
  }
});

module.exports = router;
