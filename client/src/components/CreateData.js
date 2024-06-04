import axios from "axios";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CompShowData from "./ShowData";
import "../css/portafolio.css";

const URI = "http://localhost:3001/portafolio/";

const CompCreateData = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [existePortafolio, setExistePortafolio] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telefono, setTelefono] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [sobreMi, setSobreMi] = useState("");
  const [formacion, setFormacion] = useState([
    {
      institucion: "",
      titulo: "",
      fechaInicio: "",
      fechaFin: "",
      error: "",
    },
  ]);
  const [experienciaLaboral, setExperienciaLaboral] = useState([
    {
      empresa: "",
      descripcion: "",
      fechaInicio: "",
      fechaFin: "",
      error: "",
    },
  ]);
  const [masInformacion, setMasInformacion] = useState("");
  const [competencias, setCompetencias] = useState("");
  const [idiomas, setIdiomas] = useState([{ idioma: "", nivel: "" }]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPortafolio = async () => {
      try {
        const response = await axios.get(URI);
        if (response.data.length > 0) {
          setExistePortafolio(true);
        }
      } catch (error) {
        console.error("Error al verificar el portafolio:", error);
      }
    };
    checkPortafolio();
  }, []);

  const handleTelefonoChange = (e) => {
    const value = e.target.value;
    if (isNaN(value)) {
      setTelefonoError("El campo de Teléfono debe ser numérico");
    } else {
      setTelefonoError("");
    }
    setTelefono(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(value)) {
      setEmailError("Ingrese un correo electrónico válido");
    } else {
      setEmailError("");
    }
    setEmail(value);
  };

  const addFormacion = () => {
    setFormacion([
      ...formacion,
      { institucion: "", titulo: "", fechaInicio: "", fechaFin: "", error: "" },
    ]);
  };

  const removeFormacion = (index) => {
    const updatedFormacion = [...formacion];
    updatedFormacion.splice(index, 1);
    setFormacion(updatedFormacion);
  };

  const handleFormacionChange = (index, key, value) => {
    const updatedFormacion = [...formacion];
    updatedFormacion[index][key] = value;
    updatedFormacion[index].error = ""; // Limpiar el mensaje de error al cambiar el valor
    if (key === "fechaInicio" || key === "fechaFin") {
      const startDate = new Date(updatedFormacion[index].fechaInicio).getTime();
      const endDate = new Date(updatedFormacion[index].fechaFin).getTime();
    }
    setFormacion(updatedFormacion);
  };

  const addExperienciaLaboral = () => {
    setExperienciaLaboral([
      ...experienciaLaboral,
      {
        empresa: "",
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        error: "",
      },
    ]);
  };

  const removeExperienciaLaboral = (index) => {
    const updatedExperienciaLaboral = [...experienciaLaboral];
    updatedExperienciaLaboral.splice(index, 1);
    setExperienciaLaboral(updatedExperienciaLaboral);
  };

  const handleExperienciaLaboralChange = (index, key, value) => {
    const updatedExperienciaLaboral = [...experienciaLaboral];
    updatedExperienciaLaboral[index][key] = value;
    updatedExperienciaLaboral[index].error = ""; // Limpiar el mensaje de error al cambiar el valor
    if (key === "fechaInicio" || key === "fechaFin") {
      const startDate = new Date(
        updatedExperienciaLaboral[index].fechaInicio
      ).getTime();
      const endDate = new Date(
        updatedExperienciaLaboral[index].fechaFin
      ).getTime();
    }
    setExperienciaLaboral(updatedExperienciaLaboral);
  };
  const addIdioma = () => {
    setIdiomas([...idiomas, { idioma: "", nivel: "" }]);
  };

  const handleIdiomaChange = (index, key, value) => {
    const updatedIdiomas = [...idiomas];
    updatedIdiomas[index][key] = value;
    setIdiomas(updatedIdiomas);
  };

  const removeIdioma = (index) => {
    const updatedIdiomas = [...idiomas];
    updatedIdiomas.splice(index, 1);
    setIdiomas(updatedIdiomas);
  };

  const store = async (e) => {
    e.preventDefault();

    const idiomasToSend = idiomas.filter((idioma) => idioma.idioma);

    try {
      const response = await axios.post(URI, {
        datosPersonales: {
          nombre,
          apellidos,
          email,
          telefono,
        },
        sobreMi,
        formacion,
        experienciaLaboral,
        masInformacion,
        competencias,
        idiomas: idiomasToSend,
      });

      if (response.status === 201) {
        navigate("/");
      } else {
        console.error("Error al crear el registro:", response.data);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <div
      className="container"
      style={{
        boxShadow: " 0px 0px 15px #f0f0f0",
        backgroundColor: "#f0f0f0",
        borderRadius: "10px",
        marginBottom: "20px",
        padding: "10px",
        width: "70%",
        marginTop: "30px",
      }}
    >
      <p className="card-text">Crear nuevo portafolio </p>

      {existePortafolio && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <CompShowData />
        </Modal>
      )}
      {!existePortafolio && (
        <div>
          <form onSubmit={store}>
            <div
              className="card-header"
              style={{ paddingLeft: "20px", textAlign: "left", color: "blue" }}
            >
              <p className="card-text">Datos personales</p>
            </div>
            <div className="row mb-3 mt-3">
              <div className="col">
                <input
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col">
                <input
                  placeholder="apellidos"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mb-3 mt-3">
              <div className="col">
                <input
                  placeholder="email"
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  className="form-control"
                />
                {emailError && <div style={{ color: "red" }}>{emailError}</div>}
              </div>

              <div className="col">
                <input
                  placeholder="telefono"
                  value={telefono}
                  onChange={handleTelefonoChange}
                  type="text"
                  className="form-control"
                />
                {telefonoError && (
                  <div style={{ color: "red" }}>{telefonoError}</div>
                )}
              </div>
            </div>
            <div
              className="card-header"
              style={{ paddingLeft: "20px", textAlign: "left", color: "blue" }}
            >
              <p className="card-text">Sobre mí</p>
            </div>
            <div className="mb-3">
              <textarea
                value={sobreMi}
                onChange={(e) => setSobreMi(e.target.value)}
                className="form-control"
              />
            </div>
            <div
              className="card-header"
              style={{ paddingLeft: "20px", textAlign: "left", color: "blue" }}
            >
              <p className="card-text">Formación</p>
            </div>
            {formacion.map((item, index) => (
              <div key={index}>
                <div className="row mb-3 mt-3">
                  <div className="col">
                    <textarea
                      placeholder="Institución"
                      value={item.institucion}
                      onChange={(e) =>
                        handleFormacionChange(
                          index,
                          "institucion",
                          e.target.value
                        )
                      }
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="col">
                    <textarea
                      placeholder="Título"
                      value={item.titulo}
                      onChange={(e) =>
                        handleFormacionChange(index, "titulo", e.target.value)
                      }
                      type="text"
                      className="form-control"
                    />
                  </div>

                  <div className="col">
                    <label className="form-label">Fecha de Inicio</label>
                    <input
                      value={item.fechaInicio}
                      onChange={(e) =>
                        handleFormacionChange(
                          index,
                          "fechaInicio",
                          e.target.value
                        )
                      }
                      type="date"
                      className="form-control"
                      max={item.fechaFin}
                    />
                    {item.error && (
                      <div style={{ color: "red" }}>{item.error}</div>
                    )}
                  </div>
                  <div className="col">
                    <label className="form-label">Fecha de Fin</label>
                    <input
                      value={item.fechaFin}
                      onChange={(e) =>
                        handleFormacionChange(index, "fechaFin", e.target.value)
                      }
                      type="date"
                      className="form-control"
                      min={item.fechaInicio} // Restringir la fecha de fin al valor de la fecha de inicio
                    />
                  </div>

                  <div className="col" style={{ padin: "0px", margin: "30px" }}>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeFormacion(index)}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="mb-3">
              <button
                type="button"
                className="agregar btn btn-primary"
                onClick={addFormacion}
              >
                +
              </button>
            </div>
            <div
              className="card-header"
              style={{ paddingLeft: "20px", textAlign: "left", color: "blue" }}
            >
              <p className="card-text">Experiencia Laboral</p>
            </div>
            {experienciaLaboral.map((item, index) => (
              <div key={index}>
                <div className="row mb-3 mt-3">
                  <div className="col">
                    <textarea
                      placeholder="Empresa"
                      value={item.empresa}
                      onChange={(e) =>
                        handleExperienciaLaboralChange(
                          index,
                          "empresa",
                          e.target.value
                        )
                      }
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="col">
                    <textarea
                      placeholder="Descripción"
                      value={item.descripcion}
                      onChange={(e) =>
                        handleExperienciaLaboralChange(
                          index,
                          "descripcion",
                          e.target.value
                        )
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Fecha de Inicio</label>
                    <input
                      value={item.fechaInicio}
                      onChange={(e) =>
                        handleExperienciaLaboralChange(
                          index,
                          "fechaInicio",
                          e.target.value
                        )
                      }
                      type="date"
                      className="form-control"
                      max={item.fechaFin}
                    />
                    {item.error && (
                      <div style={{ color: "red" }}>{item.error}</div>
                    )}
                  </div>
                  <div className="col">
                    <label className="form-label">Fecha de Fin</label>
                    <input
                      value={item.fechaFin}
                      onChange={(e) =>
                        handleExperienciaLaboralChange(
                          index,
                          "fechaFin",
                          e.target.value
                        )
                      }
                      type="date"
                      className="form-control"
                      min={item.fechaInicio} // Restringir la fecha de fin al valor de la fecha de inicio
                    />
                  </div>
                  <div className="col" style={{ padin: "0px", margin: "30px" }}>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeExperienciaLaboral(index)}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="mb-3">
              <button
                type="button"
                className="agregar btn btn-primary"
                onClick={addExperienciaLaboral}
              >
                +
              </button>
            </div>

            <div
              className="card-header"
              style={{ paddingLeft: "20px", textAlign: "left", color: "blue" }}
            >
              <p className="card-text">Competencias</p>
            </div>
            <div className="mb-3">
              <textarea
                value={competencias}
                onChange={(e) => setCompetencias(e.target.value)}
                className="form-control"
              />
            </div>

            <div
              className="card-header"
              style={{ paddingLeft: "20px", textAlign: "left", color: "blue" }}
            >
              <p className="card-text">Idiomas</p>
            </div>
            {idiomas.map((idioma, index) => (
              <div className="row mb-3 mt-3" key={index}>
                <div className="col">
                  <input
                    placeholder="Idioma"
                    value={idioma.idioma}
                    onChange={(e) =>
                      handleIdiomaChange(index, "idioma", e.target.value)
                    }
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <select
                    value={idioma.nivel}
                    onChange={(e) =>
                      handleIdiomaChange(index, "nivel", e.target.value)
                    }
                    className="form-control"
                  >
                    <option value="">Seleccione un nivel</option>
                    <option value="Nivel bajo">Nivel bajo</option>
                    <option value="Nivel medio">Nivel medio</option>
                    <option value="Nivel alto">Nivel alto</option>
                    <option value="Nivel muy alto">Nivel muy alto</option>
                  </select>
                </div>
                <div className="col" style={{ padin: "0px", margin: "30px" }}>
                  <button
                    type="button"
                    className="agregar btn btn-danger"
                    onClick={() => removeIdioma(index)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={addIdioma}
              >
                +
              </button>
            </div>

            <div
              className="card-header"
              style={{ paddingLeft: "20px", textAlign: "left", color: "blue" }}
            >
              <p className="card-text">Más Información</p>
            </div>
            <div className="mb-3">
              <textarea
                value={masInformacion}
                onChange={(e) => setMasInformacion(e.target.value)}
                className="form-control"
              />
            </div>

            <button className="btn btn-primary mt-2 mb-2" type="submit">
              Guardar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CompCreateData;
