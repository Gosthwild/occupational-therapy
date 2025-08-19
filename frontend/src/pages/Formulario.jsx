import React, { useState } from 'react';
import './styles/Formulario.css';
import { useNavigate } from 'react-router-dom';

const Formulario = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        edad: '',
        fechaNacimiento: '',
        sexo: '',
        cuidador: '',
        parentesco: '',
        contacto: '',
        convivencia: '',
        hermanos: '',
        dificultadesHermanos: '',
        cuidadorDia: '',
        cuidadorDiaOtro: '',
        embarazoControlado: '',
        complicaciones: [],
        complicacionesOtro: '',
        embarazoPlaneado: '',
        tipoParto: '',
        prematuro: '',
        hospitalizacion: '',
        tiempoHospitalizacion: '',
        dificultadNacimiento: '',
        lactancia: '',
        dificultadesAlimentacion: '',
        temperamento: '',
        estimulacion: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked, dataset } = e.target;

        if (type === 'checkbox' && dataset.group === 'complicaciones') {
            const updated = checked
                ? [...formData.complicaciones, value]
                : formData.complicaciones.filter(item => item !== value);
            setFormData({ ...formData, complicaciones: updated });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
    };

    const handleCancel = () => {
        navigate('/customer'); // 👈 Te lleva a customer.jsx
    };

    return (
        <div className="anamnesis-container">
            <h2>EVALUACIÓN PERFIL OCUPACIONAL</h2>
            <h2>I: Anamnesis y Antecedentes del Desarrollo</h2>
            <form onSubmit={handleSubmit} className="anamnesis-form">
                <fieldset>
                    <legend>1. Información general</legend>

                    <label>Nombre del niño(a):</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />

                    <label>Edad:</label>
                    <input type="number" name="edad" value={formData.edad} onChange={handleChange} />

                    <label>Fecha de nacimiento:</label>
                    <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />

                    <label>Sexo:</label>
                    <div className="radio-group">
                        <label><input type="radio" name="sexo" value="masculino" checked={formData.sexo === "masculino"} onChange={handleChange} /> Masculino</label>
                        <label><input type="radio" name="sexo" value="femenino" checked={formData.sexo === "femenino"} onChange={handleChange} /> Femenino</label>
                    </div>

                    <label>Cuidador principal:</label>
                    <input type="text" name="cuidador" value={formData.cuidador} onChange={handleChange} />

                    <label>Parentesco:</label>
                    <input type="text" name="parentesco" value={formData.parentesco} onChange={handleChange} />

                    <label>Número de contacto:</label>
                    <input type="tel" name="contacto" value={formData.contacto} onChange={handleChange} />

                    <label>¿Con quién vive el niño actualmente?</label>
                    <input type="text" name="convivencia" value={formData.convivencia} onChange={handleChange} />

                    <label>¿Tiene hermanos?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="hermanos" value="sí" checked={formData.hermanos === "sí"} onChange={handleChange} /> Sí</label>
                        <label><input type="radio" name="hermanos" value="no" checked={formData.hermanos === "no"} onChange={handleChange} /> No</label>
                    </div>

                    <label>¿Alguno tiene o tuvo dificultades del desarrollo?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="dificultadesHermanos" value="sí" checked={formData.dificultadesHermanos === "sí"} onChange={handleChange} /> Sí</label>
                        <label><input type="radio" name="dificultadesHermanos" value="no" checked={formData.dificultadesHermanos === "no"} onChange={handleChange} /> No</label>
                    </div>

                    <label>¿Quién lo cuida durante el día?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="cuidadorDia" value="madre" checked={formData.cuidadorDia === "madre"} onChange={handleChange} /> Madre</label>
                        <label><input type="radio" name="cuidadorDia" value="padre" checked={formData.cuidadorDia === "padre"} onChange={handleChange} /> Padre</label>
                        <label><input type="radio" name="cuidadorDia" value="otro" checked={formData.cuidadorDia === "otro"} onChange={handleChange} /> Otro</label>
                    </div>
                    {formData.cuidadorDia === "otro" && (
                        <label>Especifique: <input type="text" name="cuidadorDiaOtro" value={formData.cuidadorDiaOtro} onChange={handleChange} /></label>
                    )}
                </fieldset>

                <fieldset>
                    <legend>2. Embarazo y nacimiento</legend>
                    <label>¿El embarazo fue controlado por un profesional de salud?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="embarazoControlado" value="sí" checked={formData.embarazoControlado === "sí"} onChange={handleChange} /> Sí</label>
                        <label><input type="radio" name="embarazoControlado" value="parcialmente" checked={formData.embarazoControlado === "parcialmente"} onChange={handleChange} /> Parcialmente</label>
                        <label><input type="radio" name="embarazoControlado" value="no" checked={formData.embarazoControlado === "no"} onChange={handleChange} /> No</label>
                    </div>

                    <label>¿Hubo complicaciones durante el embarazo?</label>
                    <div className="checkbox-group">
                        {["Infecciones", "Sangrados", "Medicación", "Riesgo de aborto", "Otro"].map(item => (
                            <label key={item}>
                                <input
                                    type="checkbox"
                                    name="complicaciones"
                                    value={item}
                                    checked={formData.complicaciones.includes(item)}
                                    onChange={handleChange}
                                    data-group="complicaciones"
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                    {formData.complicaciones.includes("Otro") && (
                        <label>Describa otra complicación: <input type="text" name="complicacionesOtro" value={formData.complicacionesOtro} onChange={handleChange} /></label>
                    )}

                    <label>¿Fue un embarazo planeado?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="embarazoPlaneado" value="sí" checked={formData.embarazoPlaneado === "sí"} onChange={handleChange} /> Sí</label>
                        <label><input type="radio" name="embarazoPlaneado" value="no" checked={formData.embarazoPlaneado === "no"} onChange={handleChange} /> No</label>
                    </div>

                    <label>Tipo de parto:</label>
                    <div className="radio-group">
                        <label><input type="radio" name="tipoParto" value="natural" checked={formData.tipoParto === "natural"} onChange={handleChange} /> Natural</label>
                        <label><input type="radio" name="tipoParto" value="cesárea" checked={formData.tipoParto === "cesárea"} onChange={handleChange} /> Cesárea</label>
                        <label><input type="radio" name="tipoParto" value="instrumentado" checked={formData.tipoParto === "instrumentado"} onChange={handleChange} /> Instrumentado</label>
                    </div>

                    <label>¿El bebé nació antes de la semana 37?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="prematuro" value="sí" checked={formData.prematuro === "sí"} onChange={handleChange} /> Sí</label>
                        <label><input type="radio" name="prematuro" value="no" checked={formData.prematuro === "no"} onChange={handleChange} /> No</label>
                    </div>

                    <label>¿Requirió incubadora u hospitalización al nacer?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="hospitalizacion" value="sí" checked={formData.hospitalizacion === "sí"} onChange={handleChange} /> Sí</label>
                        <label><input type="radio" name="hospitalizacion" value="no" checked={formData.hospitalizacion === "no"} onChange={handleChange} /> No</label>
                    </div>

                    <label>¿Cuánto tiempo?:</label>
                    <input type="text" name="tiempoHospitalizacion" value={formData.tiempoHospitalizacion} onChange={handleChange} />
                    
                    <label>¿Tuvo alguna dificultad al nacer?: </label>
                    <input type="text" name="dificultadNacimiento" value={formData.dificultadNacimiento} onChange={handleChange} />
                </fieldset>

                <fieldset>
                    <legend>3. Alimentación y cuidados tempranos</legend>
                    <label>¿Recibió lactancia materna exclusiva durante los primeros 6 meses?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="lactancia" value="sí" checked={formData.lactancia === "sí"} onChange={handleChange} /> Sí</label>
                        <label><input type="radio" name="lactancia" value="parcialmente" checked={formData.lactancia === "parcialmente"} onChange={handleChange} /> Parcialmente</label>
                        <label><input type="radio" name="lactancia" value="no" checked={formData.lactancia === "no"} onChange={handleChange} /> No</label>
                    </div>

                    <label>¿Tuvo dificultades para succionar, tragar o alimentarse?: </label>
                    <input type="text" name="dificultadesAlimentacion" value={formData.dificultadesAlimentacion} onChange={handleChange} />

                    <label>¿Fue un bebé tranquilo o muy irritable?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="temperamento" value="tranquilo" checked={formData.temperamento === "tranquilo"} onChange={handleChange} /> Tranquilo</label>
                        <label><input type="radio" name="temperamento" value="dificultad" checked={formData.temperamento === "dificultad"} onChange={handleChange} /> Con dificultad para dormir o calmarse</label>
                        <label><input type="radio" name="temperamento" value="irritable" checked={formData.temperamento === "irritable"} onChange={handleChange} /> Muy irritable / lloraba excesivamente</label>
                    </div>

                    <label>¿Recibió estimulación temprana en casa?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="estimulacion" value="frecuente" checked={formData.estimulacion === "frecuente"} onChange={handleChange} /> Sí frecuentemente</label>
                        <label><input type="radio" name="estimulacion" value="ocasional" checked={formData.estimulacion === "ocasional"} onChange={handleChange} /> De forma ocasional</label>
                        <label><input type="radio" name="estimulacion" value="poca" checked={formData.estimulacion === "poca"} onChange={handleChange} /> Muy poca o nada</label>
                    </div>
                </fieldset>

                <div className="button-group">
                    <button type="submit" className="submit-button">Siguiente</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div >
    );
};

export default Formulario;
