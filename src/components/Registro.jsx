import { useEffect } from "react";

import React, { useState } from "react";
import "./Registro.css";

const Registro = () => {
  const [fotoPreview, setFotoPreview] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellidos: "",
    biografia: "",
    fechaNacimiento: "",
    pais: "",
    nombreUsuario: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
    terminos: false,
  });

  useEffect(() => {
    localStorage.setItem("formulario", JSON.stringify(formulario));
  }, [formulario]);

  useEffect(() => {
    const datosGuardados = localStorage.getItem("formulario");
    if (datosGuardados) {
      setFormulario(JSON.parse(datosGuardados));
    }
  }, []);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!formulario.nombre || !formulario.apellidos || !formulario.correo || !formulario.contrasena) {
    alert("Por favor completa todos los campos obligatorios.");
    return;
  }

  if (formulario.contrasena !== formulario.confirmarContrasena) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  if (!formulario.terminos) {
    alert("Debes aceptar los términos y condiciones.");
    return;
  }

  setMostrarModal(true);
  console.log("Datos registrados:", formulario);
};


  const handleFoto = (e) => {
  const archivo = e.target.files[0];
  if (archivo) {
    setFotoPreview(URL.createObjectURL(archivo));
  }
};


  return (
    <form className="formulario-registro" onSubmit={handleSubmit}>
      <h2>Formulario de Registro</h2>

      <fieldset className="fieldset-section">
        <legend>Datos Personales</legend>

        <div className="campo campo-nombre-apellidos">
          <div className="campo">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formulario.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="apellidos">Apellidos:</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={formulario.apellidos}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="campo">
          <label htmlFor="foto-perfil">Foto de perfil:</label>
          <div className="foto-perfil-container">
            <label htmlFor="foto-perfil">
              <span>Selecciona tu foto</span>
              {fotoPreview && (
                <img src={fotoPreview} alt="Vista previa" style={{ display: "block" }} />
              )}
            </label>
            <input
              type="file"
              id="foto-perfil"
              name="foto-perfil"
              accept="image/*"
              onChange={handleFoto}
              required
            />
          </div>
        </div>


        <div className="campo">
          <label htmlFor="biografia">Biografía:</label>
          <textarea
            id="biografia"
            name="biografia"
            value={formulario.biografia}
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formulario.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="pais">País:</label>
          <select
            id="pais"
            name="pais"
            value={formulario.pais}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona tu país</option>
            <option value="argentina">Argentina</option>
            <option value="bolivia">Bolivia</option>
            <option value="brasil">Brasil</option>
            <option value="canada">Canadá</option>
            <option value="chile">Chile</option>
            <option value="colombia">Colombia</option>
            <option value="costarica">Costa Rica</option>
            <option value="cuba">Cuba</option>
            <option value="ecuador">Ecuador</option>
            <option value="elsalvador">El Salvador</option>
            <option value="espana">España</option>
            <option value="estadosunidos">Estados Unidos</option>
            <option value="guatemala">Guatemala</option>
            <option value="honduras">Honduras</option>
            <option value="mexico">México</option>
            <option value="nicaragua">Nicaragua</option>
            <option value="panama">Panamá</option>
            <option value="paraguay">Paraguay</option>
            <option value="peru">Perú</option>
            <option value="repdom">República Dominicana</option>
            <option value="uruguay">Uruguay</option>
            <option value="venezuela">Venezuela</option>
          </select>
        </div>
      </fieldset>

      <fieldset className="fieldset-section">
        <legend>Información de Cuenta</legend>

        <div className="campo">
          <label htmlFor="nombreUsuario">Nombre de usuario:</label>
          <input
            type="text"
            id="nombreUsuario"
            name="nombreUsuario"
            value={formulario.nombreUsuario}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="correo">Correo electrónico:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formulario.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={formulario.contrasena}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="confirmarContrasena">Confirmar contraseña:</label>
          <input
            type="password"
            id="confirmarContrasena"
            name="confirmarContrasena"
            value={formulario.confirmarContrasena}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <input
            type="checkbox"
            id="terminos"
            name="terminos"
            checked={formulario.terminos}
            onChange={handleChange}
            required
          />
          <label htmlFor="terminos">
            Acepto los{" "}
            <a href="politica-privacidad.html" target="_blank">
              términos y condiciones
            </a>{" "}
            de acuerdo a la <br />
            política de privacidad de datos de Source Hope.
          </label>
        </div>

        <div className="campo">
          <button type="submit">Registrar</button>
        </div>
      </fieldset>

      <div className="campo">
        <p>
          ¿Ya te has registrado? <a href="log-in.html">Iniciar Sesión</a>
        </p>
      </div>

      {mostrarModal && (
        <div className="modal">
          <div className="modal-contenido">
            <h3>¡Registro exitoso!</h3>
            <p>Gracias por registrarte en Hope Project.</p>
            <button onClick={() => setMostrarModal(false)}>Cerrar</button>
          </div>
        </div>
      )}

    </form>
  );
};

export default Registro;
