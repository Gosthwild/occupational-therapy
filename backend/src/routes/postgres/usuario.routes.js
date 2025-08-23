const express = require("express");
const router = express.Router();
const UsuarioDAO = require("../../dao/postgres/usuarioDAO");
const usuarioDAO = new UsuarioDAO();
const authMiddleware = require("../../middleware/auth"); // ✅ importar middleware

// GET protegido: obtener usuario por email
router.get("/:email", authMiddleware, async (req, res) => {
  try {
    const user = await usuarioDAO.buscarPorEmail(req.params.email);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({
      nombre: user.nombre,
      apellido: user.apellido,
      cedula: user.cedula,
      telefono: user.telefono,
      email: user.email,
    });
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    res.status(500).json({ error: "Error interno" });
  }
});

// PUT protegido: actualizar perfil de usuario usando el email del token
router.put("/", authMiddleware, async (req, res) => {
  const email = req.user.email; // ✅ email del usuario desde el token
  const { nombre, apellido, cedula, telefono } = req.body;

  try {
    await usuarioDAO.actualizarPerfil(email, { nombre, apellido, cedula, telefono });

    res.json({
      mensaje: "Perfil actualizado correctamente",
      usuario: { nombre, apellido, cedula, telefono, email },
    });
  } catch (error) {
    console.error("Error al actualizar perfil de usuario:", error);
    res.status(500).json({ error: "Error interno al actualizar perfil de usuario" });
  }
});

module.exports = router;
