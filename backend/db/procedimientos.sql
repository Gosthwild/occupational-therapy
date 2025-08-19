-- =============================================
-- Procedimientos Almacenados - Sistema Caryan
-- Base de datos: caryan




-- =============================================
--                  LOGIN
-- =============================================
CREATE OR REPLACE FUNCTION login_usuario(_email TEXT)
RETURNS TABLE(
  id INTEGER,
  email TEXT,
  contrasena TEXT,
  nombre TEXT,
  rol_id INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id, 
    u.email::TEXT, 
    u.contrasena::TEXT,
    u.nombre::TEXT,
    u.rol_id
  FROM usuarios u
  WHERE u.email = _email;  -- quitamos "AND u.activo = TRUE"
END;
$$ LANGUAGE plpgsql;


-- =============================================
--                 ENTIDAD ROLES
-- =============================================

--    Crear nuevo rol
CREATE OR REPLACE FUNCTION nuevo_rol(_nombre TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO roles (nombre) VALUES (_nombre);
END;
$$ LANGUAGE plpgsql;

-- =============================================
---   Listar roles
CREATE OR REPLACE FUNCTION listar_roles()
RETURNS TABLE(
  id INT,
  nombre VARCHAR(50)
) AS $$
BEGIN
  RETURN QUERY
  SELECT r.id, r.nombre
  FROM roles r;
END;
$$ LANGUAGE plpgsql;

-- =============================================
---   Actualizar un rol 
CREATE OR REPLACE FUNCTION actualizar_rol(_id INT, _nombre TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE roles SET nombre = _nombre WHERE id = _id;
END;
$$ LANGUAGE plpgsql;

-- =============================================
---   Eliminar un rol
CREATE OR REPLACE FUNCTION eliminar_rol(_id INT)
RETURNS VOID AS $$
BEGIN
  DELETE FROM roles WHERE id = _id;
END;
$$ LANGUAGE plpgsql;

-- =============================================
--                ENTIDAD USUARIO
-- =============================================

-- Insertar nuevo usuario
CREATE OR REPLACE FUNCTION nuevo_usuario(
  _nombre VARCHAR(100),
  _apellido VARCHAR(100),
  _cedula VARCHAR(20),
  _telefono VARCHAR(20),
  _email VARCHAR(255),
  _contrasena VARCHAR(255),
  _rol_id INT DEFAULT 2 -- 1=admin, 2=votante
)
RETURNS INTEGER AS $$
DECLARE
  nuevo_id INTEGER;
BEGIN
  -- Validar existencia previa
  IF EXISTS (SELECT 1 FROM usuarios WHERE email = _email) THEN
    RAISE EXCEPTION 'El email % ya está registrado', _email;
  END IF;

  INSERT INTO usuarios (nombre, apellido, cedula, telefono, email, contrasena, rol_id)
  VALUES (_nombre, _apellido, _cedula, _telefono, _email, _contrasena, _rol_id)
  RETURNING id INTO nuevo_id;

  RETURN nuevo_id;
END;
$$ LANGUAGE plpgsql;

-- =============================================
--      Ver todos los usuarios
CREATE OR REPLACE FUNCTION listar_usuarios()
RETURNS TABLE(
  id INTEGER,
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  cedula VARCHAR(20),
  telefono VARCHAR(20),
  email VARCHAR(255),
  contrasena VARCHAR(255),
  fecha_registro TIMESTAMP,
  rol_id INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.nombre,
    u.apellido,
    u.cedula,
    u.telefono,
    u.email,
    u.contrasena,
    u.fecha_registro,
    u.rol_id
  FROM usuarios u;
END;
$$ LANGUAGE plpgsql;

-- =============================================
--     Ver usuario por filtro (nombre o email)
CREATE OR REPLACE FUNCTION ver_usuarios(filtro TEXT)
RETURNS TABLE(
  id INT,
  email TEXT,
  nombre TEXT,
  apellido TEXT,
  cedula TEXT,
  telefono TEXT,
  contrasena VARCHAR,
  rol_id INT,
  activo BOOLEAN
)AS $$
BEGIN
  RETURN QUERY
  SELECT id, email, nombre, apellido, cedula, telefono, contrasena, rol_id, activo
  FROM usuarios
  WHERE nombre ILIKE '%' || filtro || '%' OR email ILIKE '%' || filtro || '%';
END;
$$ LANGUAGE plpgsql;

-- =============================================
--          Ver usuarios por rol
CREATE OR REPLACE FUNCTION ver_usuarios_por_rol(_rol_id INT)
RETURNS TABLE(
  id INT,
  email TEXT,
  nombre TEXT,
  apellido TEXT,
  cedula TEXT,
  telefono TEXT,
  contrasena VARCHAR,
  activo BOOLEAN
)AS $$
BEGIN
  RETURN QUERY
  SELECT id, email, nombre, apellido, cedula, telefono, contrasena, activo
  FROM usuarios
  WHERE rol_id = _rol_id;
END;
$$ LANGUAGE plpgsql;

-- =============================================
--        Buscar usuario 
CREATE OR REPLACE FUNCTION buscar_usuario_email(_email VARCHAR(255))
RETURNS TABLE (
  id INT,
  email VARCHAR(255),
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  cedula VARCHAR(20),
  telefono VARCHAR(20),
  contrasena VARCHAR,
  rol_id INT
)
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    usuarios.id, 
    usuarios.email, 
    usuarios.nombre, 
    usuarios.apellido,
    usuarios.cedula, 
    usuarios.telefono,
    usuarios.contrasena,
    usuarios.rol_id
  FROM usuarios
  WHERE usuarios.email = _email;
END;
$$ LANGUAGE plpgsql;

-- =============================================
--        Actualizar usuario
CREATE OR REPLACE FUNCTION actualizar_usuario(
    p_email TEXT,
    p_nombre TEXT,
    p_apellido TEXT,
    p_cedula TEXT,
    p_telefono TEXT
)
RETURNS VOID AS $$
BEGIN
    UPDATE usuarios
    SET
        nombre   = COALESCE(NULLIF(p_nombre, ''), nombre),
        apellido = COALESCE(NULLIF(p_apellido, ''), apellido),
        cedula   = COALESCE(NULLIF(p_cedula, ''), cedula),
        telefono = COALESCE(NULLIF(p_telefono, ''), telefono)
    WHERE email = p_email;
END;
$$ LANGUAGE plpgsql;



-- =============================================
--       Desactivar (eliminar)
CREATE OR REPLACE FUNCTION desactivar_usuario_por_email(_email TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE usuarios SET activo = FALSE WHERE email = _email;
END;
$$ LANGUAGE plpgsql;


