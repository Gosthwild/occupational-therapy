class FormularioDTO {
  constructor({
    userId,
    // Sección 1
    nombreNino,
    edad,
    fechaNacimiento,
    sexo,
    cuidadorPrincipal,
    parentesco,
    nacionalidad,
    contacto,
    convivencia,
    hermanos,
    dificultadesHermanos,
    cuidadorDia,
    cuidadorDiaOtro,

    // Sección 2
    embarazoControlado,
    complicaciones,
    complicacionesOtro,
    embarazoPlaneado,
    tipoParto,
    prematuro,
    hospitalizacion,
    tiempoHospitalizacion,
    dificultadNacimiento,
    dificultadNacimientoDetalle,

    // Sección 3
    lactancia,
    dificultadesAlimentacion,
    dificultadesAlimentacionDesc,
    temperamento,
    estimulacion,

    // Sección 4
    hitos
  }) {
    this.userId = userId;

    // Sección 1
    this.nombreNino = nombreNino;
    this.edad = edad;
    this.fechaNacimiento = fechaNacimiento;
    this.sexo = sexo;
    this.cuidadorPrincipal = cuidadorPrincipal;
    this.parentesco = parentesco;
    this.nacionalidad = nacionalidad;
    this.contacto = contacto;
    this.convivencia = convivencia;
    this.hermanos = hermanos;
    this.dificultadesHermanos = dificultadesHermanos;
    this.cuidadorDia = cuidadorDia;
    this.cuidadorDiaOtro = cuidadorDiaOtro;

    // Sección 2
    this.embarazoControlado = embarazoControlado;
    this.complicaciones = complicaciones || [];
    this.complicacionesOtro = complicacionesOtro;
    this.embarazoPlaneado = embarazoPlaneado;
    this.tipoParto = tipoParto;
    this.prematuro = prematuro;
    this.hospitalizacion = hospitalizacion;
    this.tiempoHospitalizacion = tiempoHospitalizacion;
    this.dificultadNacimiento = dificultadNacimiento;
    this.dificultadNacimientoDetalle = dificultadNacimientoDetalle;

    // Sección 3
    this.lactancia = lactancia;
    this.dificultadesAlimentacion = dificultadesAlimentacion;
    this.dificultadesAlimentacionDesc = dificultadesAlimentacionDesc;
    this.temperamento = temperamento;
    this.estimulacion = estimulacion;

    // Sección 4
    this.hitos = hitos || {}; // JSON con edad, esperado y razones si responde "No"
  }
}

module.exports = FormularioDTO;
