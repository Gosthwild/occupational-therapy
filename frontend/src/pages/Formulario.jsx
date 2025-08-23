import React, { useState } from 'react';
import './styles/Formulario.css';
import { useNavigate } from 'react-router-dom';

const Formulario = () => {
    const [formData, setFormData] = useState({
        // Sección 1
        nombre: '',
        edad: '',
        fechaNacimiento: '',
        sexo: '',
        cuidador: '',
        parentesco: '',
        nacionalidad: '',
        contacto: '',
        convivencia: '',
        hermanos: '',
        dificultadesHermanos: '',
        cuidadorDia: '',
        cuidadorDiaOtro: '',

        // Sección 2
        embarazoControlado: '',
        complicaciones: [],
        complicacionesOtro: '',
        embarazoPlaneado: '',
        tipoParto: '',
        prematuro: '',
        hospitalizacion: '',
        tiempoHospitalizacion: '',
        dificultadNacimiento: '',

        // Sección 3
        lactancia: '',
        dificultadesAlimentacion: '',
        dificultadesAlimentacionDesc: '',
        temperamento: '',
        estimulacion: '',

        // Sección 4
        hitos: {
            cabeza: { edad: '', esperado: '', razon: '' },
            sentado: { edad: '', esperado: '', razon: '' },
            gateo: { edad: '', esperado: '', razon: '' },
            caminar: { edad: '', esperado: '', razon: '' },
            primerasPalabras: { edad: '', esperado: '', razon: '' },
            irAlBaño: { edad: '', esperado: '', razon: '' },
        },
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked, dataset } = e.target;

        // Manejar checkboxes de complicaciones
        if (type === 'checkbox' && dataset.group === 'complicaciones') {
            const updated = checked
                ? [...formData.complicaciones, value]
                : formData.complicaciones.filter(item => item !== value);
            setFormData({ ...formData, complicaciones: updated });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleHitoChange = (e, hito, campo) => {
        const { value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            hitos: {
                ...prev.hitos,
                [hito]: {
                    ...prev.hitos[hito],
                    [campo]: type === 'checkbox'
                        ? checked
                            ? [...prev.hitos[hito][campo], value]
                            : prev.hitos[hito][campo].filter(v => v !== value)
                        : value
                }
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token"); // 🔹 obtener JWT

            const response = await fetch("http://localhost:5000/api/formularios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // 🔹 enviar token
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Respuesta del backend:", data);
            if (response.ok) {
                console.log("Formulario guardado correctamente:", data);
                navigate("/misformularios");
            } else {
                console.log("Error guardando formulario: " + data.error);
            }
        } catch (error) {
            console.error("Error enviando formulario:", error);
        }
    };


    const handleCancel = () => {
        navigate('/customer');
    };

    return (
        <div className="anamnesis-container">
            <h2>EVALUACIÓN PERFIL OCUPACIONAL</h2>
            <h2>I: Anamnesis y Antecedentes del Desarrollo</h2>
            <form onSubmit={handleSubmit} className="anamnesis-form">

                {/* ===================== SECCIÓN 1 ===================== */}
                <fieldset>
                    <legend>1. Información general</legend>
                    <label>Nombre del niño(a):</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />

                    <label>Edad (meses/años):</label>
                    <input type="number" name="edad" value={formData.edad} onChange={handleChange} />

                    <label>Fecha de nacimiento:</label>
                    <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />

                    <label>Sexo:</label>
                    <div className="radio-group">
                        <label><input type="radio" name="sexo" value="masculino" checked={formData.sexo === 'masculino'} onChange={handleChange} /> Masculino</label>
                        <label><input type="radio" name="sexo" value="femenino" checked={formData.sexo === 'femenino'} onChange={handleChange} /> Femenino</label>
                    </div>

                    <label>Cuidador principal:</label>
                    <input type="text" name="cuidador" value={formData.cuidador} onChange={handleChange} />

                    <label>Parentesco:</label>
                    <input type="text" name="parentesco" value={formData.parentesco} onChange={handleChange} />

                    <label>Nacionalidad:</label>
                    <input type="text" name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} />

                    <label>Número de contacto:</label>
                    <input type="tel" name="contacto" value={formData.contacto} onChange={handleChange} />

                    <label>¿Con quién vive el niño(a) actualmente?</label>
                    <input type="text" name="convivencia" value={formData.convivencia} onChange={handleChange} />

                    <label>¿Tiene hermanos?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="hermanos" value="sí" checked={formData.hermanos === 'sí'} onChange={handleChange} /> Sí</label>
                        <label><input type="radio" name="hermanos" value="no" checked={formData.hermanos === 'no'} onChange={handleChange} /> No</label>
                    </div>

                    {/* 👇 Solo se muestra si respondió "Sí" */}
                    {formData.hermanos === 'sí' && (
                        <>
                            <label>¿Alguno tiene o tuvo dificultades del desarrollo?</label>
                            <div className="radio-group">
                                <label><input type="radio" name="dificultadesHermanos" value="sí" checked={formData.dificultadesHermanos === 'sí'} onChange={handleChange} /> Sí</label>
                                <label><input type="radio" name="dificultadesHermanos" value="no" checked={formData.dificultadesHermanos === 'no'} onChange={handleChange} /> No</label>
                            </div>
                        </>
                    )}

                    <label>¿Quién lo cuida durante el día?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="cuidadorDia" value="madre" checked={formData.cuidadorDia === 'madre'} onChange={handleChange} /> Madre</label>
                        <label><input type="radio" name="cuidadorDia" value="padre" checked={formData.cuidadorDia === 'padre'} onChange={handleChange} /> Padre</label>
                        <label><input type="radio" name="cuidadorDia" value="otro" checked={formData.cuidadorDia === 'otro'} onChange={handleChange} /> Otro</label>
                    </div>

                    {formData.cuidadorDia === 'otro' && (
                        <label>Especifique:
                            <input type="text" name="cuidadorDiaOtro" value={formData.cuidadorDiaOtro} onChange={handleChange} />
                        </label>
                    )}
                </fieldset>

                {/* ===================== SECCIÓN 2 ===================== */}
                <fieldset>
                    <legend>2. Embarazo y nacimiento</legend>

                    <label>¿Durante el embarazo tuvo chequeos con un médico o enfermera?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="embarazoControlado" value="sí" checked={formData.embarazoControlado === 'sí'} onChange={handleChange} /> Sí</label>
                        <label><input type="radio" name="embarazoControlado" value="parcialmente" checked={formData.embarazoControlado === 'parcialmente'} onChange={handleChange} /> Parcialmente</label>
                        <label><input type="radio" name="embarazoControlado" value="no" checked={formData.embarazoControlado === 'no'} onChange={handleChange} /> No</label>
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
                        <label>Describa otra complicación:
                            <input type="text" name="complicacionesOtro" value={formData.complicacionesOtro} onChange={handleChange} />
                        </label>
                    )}

                    <label>¿Fue un embarazo planeado?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="embarazoPlaneado" value="sí" checked={formData.embarazoPlaneado === 'sí'} onChange={handleChange} /> Sí</label>
                        <label><input type="radio" name="embarazoPlaneado" value="no" checked={formData.embarazoPlaneado === 'no'} onChange={handleChange} /> No</label>
                    </div>

                    <label>Tipo de parto:</label>
                    <div className="radio-group">
                        <label><input type="radio" name="tipoParto" value="natural" checked={formData.tipoParto === 'natural'} onChange={handleChange} /> Natural</label>
                        <label><input type="radio" name="tipoParto" value="cesarea" checked={formData.tipoParto === 'cesarea'} onChange={handleChange} /> Cesárea</label>
                        <label><input type="radio" name="tipoParto" value="instrumental" checked={formData.tipoParto === 'instrumental'} onChange={handleChange} /> Con ayuda de instrumentos</label>
                    </div>

                    <label>¿El bebé nació antes de los 9 meses (prematuro)?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="prematuro" value="sí" checked={formData.prematuro === 'sí'} onChange={handleChange} /> Sí</label>
                        <label><input type="radio" name="prematuro" value="no" checked={formData.prematuro === 'no'} onChange={handleChange} /> No</label>
                    </div>

                    <label>¿Requirió incubadora u hospitalización al nacer?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="hospitalizacion" value="sí" checked={formData.hospitalizacion === 'sí'} onChange={handleChange} /> Sí</label>
                        <label><input type="radio" name="hospitalizacion" value="no" checked={formData.hospitalizacion === 'no'} onChange={handleChange} /> No</label>
                    </div>

                    {formData.hospitalizacion === 'sí' && (
                        <label>¿Cuánto tiempo?
                            <input type="text" name="tiempoHospitalizacion" value={formData.tiempoHospitalizacion} onChange={handleChange} />
                        </label>
                    )}

                    <label>¿Tuvo alguna dificultad al nacer (llanto débil, no respiraba, color morado, etc.)?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="dificultadNacimiento" value="no" checked={formData.dificultadNacimiento === 'no'} onChange={handleChange} /> No</label>
                        <label><input type="radio" name="dificultadNacimiento" value="sí" checked={formData.dificultadNacimiento === 'sí'} onChange={handleChange} /> Sí, describa</label>
                    </div>

                    {formData.dificultadNacimiento === 'sí' && (
                        <input type="text" name="dificultadNacimientoDetalle" onChange={handleChange} />
                    )}
                </fieldset>

                {/* ===================== SECCIÓN 3 ===================== */}
                <fieldset>
                    <legend>3. Alimentación y cuidados tempranos</legend>

                    <label>¿Su bebé tomó solo leche materna durante los primeros 6 meses, sin otros alimentos ni leche de tarro?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="lactancia" value="sí" checked={formData.lactancia === "sí"} onChange={handleChange} /> Sí</label>
                        <label><input type="radio" name="lactancia" value="un_poco" checked={formData.lactancia === "un_poco"} onChange={handleChange} /> Un poco (a veces le daban otras cosas)</label>
                        <label><input type="radio" name="lactancia" value="no" checked={formData.lactancia === "no"} onChange={handleChange} /> No</label>
                    </div>

                    <label>¿Su bebé tuvo problemas para agarrarse al pecho, tragar o alimentarse?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="dificultadesAlimentacion" value="no" checked={formData.dificultadesAlimentacion === "no"} onChange={handleChange} /> No</label>
                        <label><input type="radio" name="dificultadesAlimentacion" value="sí" checked={formData.dificultadesAlimentacion === "sí"} onChange={handleChange} /> Sí</label>
                    </div>

                    {/* SOLO MUESTRA ESTE INPUT SI ELIGE "Sí" */}
                    {formData.dificultadesAlimentacion === "sí" && (
                        <label>
                            Describa:
                            <input
                                type="text"
                                name="dificultadesAlimentacionDesc"
                                value={formData.dificultadesAlimentacionDesc || ""} // ✅ controlado
                                onChange={handleChange}
                            />
                        </label>
                    )}

                    <label>¿Su bebé era tranquilo o lloraba mucho?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="temperamento" value="tranquilo" checked={formData.temperamento === "tranquilo"} onChange={handleChange} /> Tranquilo</label>
                        <label><input type="radio" name="temperamento" value="dificultad" checked={formData.temperamento === "dificultad"} onChange={handleChange} /> Con dificultad para dormir o calmarse</label>
                        <label><input type="radio" name="temperamento" value="irritable" checked={formData.temperamento === "irritable"} onChange={handleChange} /> Lloraba mucho / se enojaba con facilidad</label>
                    </div>

                    <label>En casa, ¿le hacían juegos, le hablaban, lo acariciaban o le miraban a los ojos?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="estimulacion" value="seguido" checked={formData.estimulacion === "seguido"} onChange={handleChange} /> Sí, seguido</label>
                        <label><input type="radio" name="estimulacion" value="ocasional" checked={formData.estimulacion === "ocasional"} onChange={handleChange} /> A veces</label>
                        <label><input type="radio" name="estimulacion" value="poca" checked={formData.estimulacion === "poca"} onChange={handleChange} /> Muy poco o nada</label>
                    </div>
                </fieldset>

                {/* ===================== SECCIÓN 4 ===================== */}
                <fieldset>
                    <legend>4. Hitos del desarrollo</legend>
                    {["cabeza", "sentado", "gateo", "caminar", "primerasPalabras", "irAlBaño"].map(hito => {
                        const labels = {
                            cabeza: "sostuvo bien la cabeza sin ayuda",
                            sentado: "se sentó solo/a sin caerse",
                            gateo: "empezó a gatear",
                            caminar: "caminó solo/a sin ayuda",
                            primerasPalabras: "dijo sus primeras palabras",
                            irAlBaño: "empezó a avisar o ir solo/a al baño durante el día"
                        };
                        const causas = {
                            cabeza: [["prematuro", "Nació antes de tiempo"], ["muchoAcostado", "Estaba mucho tiempo acostado"], ["noBocaAbajo", "No lo poníamos boca abajo"]],
                            sentado: [["noFuerza", "No tenía fuerza"], ["loCargaban", "Lo cargaban mucho"], ["noJugaba", "No lo dejábamos jugar en el piso"]],
                            gateo: [["siempreCuna", "Pasaba casi siempre en la cuna o coche"], ["noPiso", "No le gustaba estar en el piso"], ["noAnimaba", "No se le animaba a moverse"]],
                            caminar: [["miedoCaminar", "Tuvo miedo de caminar"], ["usoAndador", "Usó mucho andador o coche"], ["bajoPeso", "Nació con bajo peso o débil"]],
                            primerasPalabras: [["muchaTV", "Veía mucha TV"], ["pocaAtencion", "No se hablaba mucho en casa"], ["problemasAuditivos", "Problemas de audición"]],
                            irAlBaño: [["miedoBano", "Tenía miedo al baño"], ["noEnsenio", "No se le enseñó a tiempo"], ["dificilInstrucciones", "Le cuesta entender instrucciones"]]
                        };
                        return (
                            <div key={hito} className="hito-section">
                                <label>¿A qué edad {labels[hito]}?</label>
                                <input type="text" value={formData.hitos[hito].edad} onChange={e => handleHitoChange(e, hito, "edad")} placeholder="Edad (meses o años)" />

                                <label>¿Fue dentro de lo esperado?</label>
                                <div className="radio-group">
                                    {["sí", "no", "noRecuerda"].map(val => (
                                        <label key={val}>
                                            <input type="radio" value={val} checked={formData.hitos[hito].esperado === val} onChange={e => handleHitoChange(e, hito, "esperado")} />
                                            {val === "noRecuerda" ? "No recuerda" : val}
                                        </label>
                                    ))}
                                </div>

                                {formData.hitos[hito].esperado === "no" && (
                                    <div className="checkbox-group">
                                        <label>¿A qué cree que se puede deber?</label>
                                        {causas[hito].map(([key, text]) => (
                                            <label key={key}>
                                                <input type="checkbox" value={key} checked={formData.hitos[hito].razon.includes(key)} onChange={e => handleHitoChange(e, hito, "razon")} />
                                                {text}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </fieldset>





                <div className="button-group">
                    <button type="submit" className="submit-button">Guardar</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
                </div>

            </form>

        </div>
    );
};

export default Formulario;
