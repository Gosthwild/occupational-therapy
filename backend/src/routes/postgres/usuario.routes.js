// src/routes/postgres/usuarios.pg.routes.js
const express = require("express");
const router = express.Router();
const UsuarioDAO = require("../../dao/postgres/usuarioDAO");
const usuarioDAO = new UsuarioDAO();

// ✅ GET: Obtener un usuario por email
router.get("/:email", async (req, res) => {
  try {
    const user = await usuarioDAO.buscarPorEmail(req.params.email);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    // devolvemos solo los datos que quieres mostrar en el perfil
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

// ✅ PUT: Actualizar perfil de usuario
router.put("/:email", async (req, res) => {
  const email = req.params.email;
  const { nombre, apellido, cedula, telefono } = req.body;

  try {
    await usuarioDAO.actualizarPerfil(email, { nombre, apellido, cedula, telefono });

    res.status(200).json({
      mensaje: "Perfil actualizado correctamente",
      usuario: { nombre, apellido, cedula, telefono, email },
    });
  } catch (error) {
    console.error("Error al actualizar perfil de usuario:", error);
    res.status(500).json({ error: "Error interno al actualizar perfil de usuario" });
  }
});

module.exports = router;
