// src/routes/login.routes.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const pool = require("../config/postgres");

router.post("/", async (req, res) => {
  console.log("Petición recibida");
  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    console.log("Faltan campos requeridos:", { email, contrasena });
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  try {
    console.log("Consultando usuario en BD con email:", email);
    const resultado = await pool.query("SELECT * FROM login_usuario($1)", [email]);

    if (resultado.rows.length === 0) {
      console.log("Usuario no encontrado o inactivo:", email);
      return res.status(401).json({ error: "Usuario no encontrado o inactivo" });
    }

    const usuario = resultado.rows[0];
    console.log("Usuario encontrado:", { email: usuario.email });

    // Comparar contraseña directamente (sin bcrypt por ahora)
    if (usuario.contrasena !== contrasena) {
      console.log("Contraseña incorrecta para usuario:", email);
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    console.log("Login exitoso para usuario:", email);

    // 👉 Generar el token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol_id: usuario.rol_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );


    // Devolver token junto al usuario
    res.status(200).json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol_id: usuario.rol_id,
      },
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
