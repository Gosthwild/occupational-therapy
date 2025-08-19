require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Conexión a PostgreSQL
const pool = require("./config/postgres"); // asegúrate de que esté configurado correctamente

// Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas PostgreSQL
const registerRoute = require("./routes/register.routes"); // registro de usuarios
const rutasPostgresUsuarios = require("./routes/postgres/usuario.routes"); // usuarios
const rolRoutes = require("./routes/postgres/rol.routes"); // roles
const loginRoutes = require("./routes/login.routes");

// Endpoints
app.use("/api/registro", registerRoute);
app.use("/api/pg/usuarios", rutasPostgresUsuarios);
app.use("/api/roles", rolRoutes);
app.use("/api/login", loginRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://0.0.0.0:${PORT}`);
});
