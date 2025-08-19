-- ============================================
--          CREACIÓN BASE DE DATOS
-- ============================================
 CREATE DATABASE caryan;




-- ============================================
--                  ENTIDADES
-- ============================================

--    ENTIDAD ROLES
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE NOT NULL
);

--    ENTIDAD USUARIO
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  cedula VARCHAR(20),
  telefono VARCHAR(20),
  email VARCHAR(255) UNIQUE NOT NULL,
  contrasena VARCHAR(255) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  rol_id INTEGER NOT NULL REFERENCES roles(id)
);

