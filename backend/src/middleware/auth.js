const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // 1️⃣ Leer el token del header Authorization
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"

  // 2️⃣ Si no hay token, devolver 401
  if (!token) {
    return res.status(401).json({ error: "Token requerido" });
  }

  try {
    // 3️⃣ Verificar token usando el secreto del .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Guardar info del usuario en req.user
    req.user = decoded;

    // 5️⃣ Continuar a la ruta
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

module.exports = authMiddleware;
