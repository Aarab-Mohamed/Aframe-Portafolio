import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "../css/portafolio.css";

const URI = "http://localhost:3001/portafolio/";

const CompShowData = () => {
  const [data, setData] = useState([]);
  const [showModalIsOpen, setShowModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get(URI);
    setData(res.data);
  };

  const deleteData = async (id) => {
    await axios.delete(`${URI}${id}`);
    getData();
  };

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Devuelve una cadena vacía si la fecha es nula o vacía

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="">
      {data.length === 0 && (
        <Link to="/create" className="btn btn-primary mt-2 mb-2">
          <i className="">Crear nuevo portafolio</i>
        </Link>
      )}
      <div className="col">
        {data.map((item) => (
          <div
            key={item._id}
            className="card mb-3"
            style={{ boxShadow: " 0px 0px 15px #f0f0f0" }}
          >
            <div className="header">
              <img
                src="../imagenes/foto1.png"
                alt="imagen"
                style={{ width: "70px", height: "70px", marginTop: "10px" }}
              />
              {item.datosPersonales.nombre} {item.datosPersonales.apellidos}
            </div>

            <div className="card-body">
              <div
                className="mb-3"
                style={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <div
                  className="card-header"
                  style={{
                    paddingLeft: "20px",
                    textAlign: "left",
                    color: "blue",
                  }}
                >
                  <p className="card-text">Contacto</p>
                </div>
                <p
                  className="card-text"
                  style={{ paddingLeft: "80px", textAlign: "left" }}
                >
                  Email: {item.datosPersonales.email}
                </p>
                <p
                  className="card-text"
                  style={{ paddingLeft: "80px", textAlign: "left" }}
                >
                  Telefono: {item.datosPersonales.telefono}
                </p>
              </div>

              <div
                className="mb-3"
                style={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                {" "}
                <div
                  className="card-header"
                  style={{
                    paddingLeft: "20px",
                    textAlign: "left",
                    color: "blue",
                  }}
                >
                  <p className="card-text">Sobre Mí</p>
                </div>
                <p
                  className="card-text"
                  style={{ paddingLeft: "80px", textAlign: "left" }}
                >
                  {item.sobreMi}
                </p>
              </div>

              <div
                className="mb-3"
                style={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <div
                  className="card-header"
                  style={{
                    paddingLeft: "20px",
                    textAlign: "left",
                    color: "blue",
                  }}
                >
                  <p className="card-text">Formación</p>
                </div>

                {item.formacion.map((formacion) => (
                  <div
                    key={formacion._id}
                    style={{
                      backgroundColor: "#f0f0f0",
                      border: "1.5px solid white",
                      borderRadius: "10px",
                      paddingBottom: "10px",
                      paddingTop: "10px",
                      paddingLeft: "80px",
                      margin: "10px",
                      textAlign: "left",
                    }}
                  >
                    <p>Institucion: {formacion.institucion}</p>
                    <p>Titulo: {formacion.titulo}</p>
                    <p>Fecha de inicio: {formatDate(formacion.fechaInicio)}</p>
                    <p>Fecha de fin: {formatDate(formacion.fechaFin)}</p>
                  </div>
                ))}
              </div>

              <div
                className="mb-3"
                style={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <div
                  className="card-header"
                  style={{
                    paddingLeft: "20px",
                    textAlign: "left",
                    color: "blue",
                  }}
                >
                  <p className="card-text">Experiencia Laboral</p>
                </div>
                {item.experienciaLaboral.map((exp) => (
                  <div
                    key={exp._id}
                    style={{
                      backgroundColor: "#f0f0f0",
                      border: "1.5px solid white",
                      borderRadius: "10px",
                      paddingBottom: "10px",
                      paddingTop: "10px",
                      paddingLeft: "80px",
                      margin: "10px",
                      textAlign: "left",
                    }}
                  >
                    <p>Empresa: {exp.empresa}</p>
                    <p>Descripcion: {exp.descripcion}</p>
                    <p>Fecha de inicio: {formatDate(exp.fechaInicio)}</p>
                    <p>Fecha de fin: {formatDate(exp.fechaFin)}</p>
                  </div>
                ))}
              </div>

              <div
                className="mb-3"
                style={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                {" "}
                <div
                  className="card-header"
                  style={{
                    paddingLeft: "20px",
                    textAlign: "left",
                    color: "blue",
                  }}
                >
                  <p className="card-text">Competencias</p>
                </div>
                <p
                  className="card-text"
                  style={{ paddingLeft: "80px", textAlign: "left" }}
                >
                  {item.competencias}
                </p>
              </div>

              <div
                className="mb-3"
                style={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                {" "}
                <div
                  className="card-header"
                  style={{
                    paddingLeft: "20px",
                    textAlign: "left",
                    color: "blue",
                  }}
                >
                  <p className="card-text">Idiomas</p>
                </div>
                {item.idiomas.map((idioma) => (
                  <div
                    key={idioma._id}
                    style={{ paddingLeft: "80px", textAlign: "left" }}
                  >
                    <p>
                      {idioma.idioma} : {idioma.nivel}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="mb-3"
                style={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                {" "}
                <div
                  className="card-header"
                  style={{
                    paddingLeft: "20px",
                    textAlign: "left",
                    color: "blue",
                  }}
                >
                  <p className="card-text">Más Información</p>
                </div>
                <p
                  className="card-text"
                  style={{ paddingLeft: "80px", textAlign: "left" }}
                >
                  {item.masInformacion}
                </p>
              </div>

              <Link to={`/edit/${item._id}`} className="btn btn-info">
                <i className="fas fa-edit">Editar</i>
              </Link>
              <button
                onClick={() => deleteData(item._id)}
                className="btn btn-danger ml-2"
              >
                <i className="fas fa-trash-alt">Borrar</i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompShowData;
