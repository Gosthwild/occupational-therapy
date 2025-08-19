class usuarioDTO {
  constructor({ id, nombre, apellido, cedula, telefono, email, contrasena, rol }) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.cedula = cedula;
    this.telefono = telefono;
    this.email = email;
    this.contrasena = contrasena; // nuevo campo agregado
    this.rol = rol; // string desde la vista JOIN con roles
  }
}

module.exports = usuarioDTO;
