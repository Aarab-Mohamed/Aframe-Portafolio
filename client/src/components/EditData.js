import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = "http://localhost:3001/portafolio/";

const CompEditData = () => {
  const [formData, setFormData] = useState({
    datosPersonales: {
      nombre: "",
      apellidos: "",
      email: "",
      telefono: "",
      imagen: "",
    },
    sobreMi: "",
    formacion: [
      {
        institucion: "",
        titulo: "",
        fechaInicio: "",
        fechaFin: "",
      },
    ],
    experienciaLaboral: [
      {
        empresa: "",
        fechaInicio: "",
        fechaFin: "",
        descripcion: "",
      },
    ],
    masInformacion: "",
    competencias: "",
    idiomas: [
      {
        idioma: "",
        nivel: "",
      },
    ],
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const [validationMessages, setValidationMessages] = useState({
    telefono: "",
    email: "",
  });

  const update = async (e) => {
    e.preventDefault();
    await axios.put(`${URI}${id}`, formData);
    navigate("/");
  };

  useEffect(() => {
    getDataById();
  }, []);

  const getDataById = async () => {
    const res = await axios.get(`${URI}${id}`);
    const data = res.data;
    const formattedData = {
      ...data,
      formacion: data.formacion.map((item) => ({
        ...item,
        fechaInicio: item.fechaInicio || "",
        fechaFin: item.fechaFin || "",
      })),
      experienciaLaboral: data.experienciaLaboral.map((item) => ({
        ...item,
        fechaInicio: item.fechaInicio || "",
        fechaFin: item.fechaFin || "",
      })),
    };
    setFormData(formattedData);
  };

  const handleChange = (e, field, index) => {
    const value = e.target.value;
    const name = e.target.name;
    let message = "";

    if (name === "telefono" && !/^\d+$/.test(value)) {
      message = "El teléfono debe contener solo números";
    }

    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      message = "El email debe tener un formato válido";
    }

    setValidationMessages((prevMessages) => ({
      ...prevMessages,
      [name]: message,
    }));

    if (name === "fechaFin") {
      const startDate = new Date(formData[field][index].fechaInicio).getTime();
      const endDate = new Date(value).getTime();

      if (endDate < startDate) {
        alert("La fecha de fin no puede ser anterior a la fecha de inicio");
        return;
      }
    } else if (name === "fechaInicio") {
      const startDate = new Date(value).getTime();
      const endDate = new Date(formData[field][index].fechaFin).getTime();

      if (startDate > endDate) {
        alert("La fecha de inicio no puede ser posterior a la fecha de fin");
        return;
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: Array.isArray(prevFormData[field])
        ? prevFormData[field].map((item, i) =>
            i === index ? { ...item, [name]: value } : item
          )
        : { ...prevFormData[field], [name]: value },
    }));
  };

  const handleAddItem = (field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: [...prevFormData[field], {}],
    }));
  };

  const handleRemoveItem = (field, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: prevFormData[field].filter((item, i) => i !== index),
    }));
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
    <div
      className="container"
      style={{
        boxShadow: " 0px 0px 15px #f0f0f0",
        backgroundColor: "#f0f0f0",
        borderRadius: "10px",
        marginBottom: "20px",
        padding: "10px",
        width: "70%",
        marginTop: "20px",
      }}
    >
      <p className="card-text">Actualizar portafolio</p>

      <form onSubmit={update}>
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
              value={formData.datosPersonales.nombre}
              onChange={(e) => handleChange(e, "datosPersonales", null)}
              name="nombre"
              type="text"
              className="form-control"
            />
          </div>
          <div className="col">
            <input
              placeholder="Apellidos"
              value={formData.datosPersonales.apellidos}
              onChange={(e) => handleChange(e, "datosPersonales", null)}
              name="apellidos"
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              placeholder="Email"
              value={formData.datosPersonales.email}
              onChange={(e) => handleChange(e, "datosPersonales", null)}
              name="email"
              type="text"
              className="form-control"
            />
            {validationMessages.email && (
              <div style={{ color: "red" }}>{validationMessages.email}</div>
            )}
          </div>

          <div className="col">
            <input
              placeholder="Telefono"
              value={formData.datosPersonales.telefono}
              onChange={(e) => handleChange(e, "datosPersonales", null)}
              name="telefono"
              type="text"
              className="form-control"
            />
            {validationMessages.telefono && (
              <div style={{ color: "red" }}>{validationMessages.telefono}</div>
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
            value={formData.sobreMi}
            onChange={(e) =>
              setFormData({ ...formData, sobreMi: e.target.value })
            }
            type="text"
            className="form-control"
          />
        </div>
        <div
          className="card-header"
          style={{ paddingLeft: "20px", textAlign: "left", color: "blue" }}
        >
          <p className="card-text">Formación</p>
        </div>
        {formData.formacion.map((item, index) => (
          <div key={index} className="row mb-3 mt-3">
            <div className="col">
              <textarea
                placeholder="Institución"
                value={item.institucion}
                onChange={(e) => handleChange(e, "formacion", index)}
                name="institucion"
                type="text"
                className="form-control"
              />
            </div>
            <div className="col">
              <textarea
                placeholder="Título"
                value={item.titulo}
                onChange={(e) => handleChange(e, "formacion", index)}
                name="titulo"
                type="text"
                className="form-control"
              />
            </div>
            <div className="col">
              <label className="form-label">
                {formatDate(item.fechaInicio)}
              </label>
              <input
                value={item.fechaInicio}
                onChange={(e) => handleChange(e, "formacion", index)}
                name="fechaInicio"
                type="date"
                className="form-control"
              />
            </div>
            <div className="col">
              <label className="form-label">{formatDate(item.fechaFin)}</label>
              <input
                value={item.fechaFin}
                onChange={(e) => handleChange(e, "formacion", index)}
                name="fechaFin"
                type="date"
                className="form-control"
              />
            </div>
            <div className="col" style={{ padin: "0px", margin: "30px" }}>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveItem("formacion", index)}
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
            onClick={() => handleAddItem("formacion")}
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
        {formData.experienciaLaboral.map((item, index) => (
          <div key={index} className="row mb-3 mt-3">
            <div className="col">
              <textarea
                placeholder="Empresa"
                value={item.empresa}
                onChange={(e) => handleChange(e, "experienciaLaboral", index)}
                name="empresa"
                className="form-control"
              />
            </div>
            <div className="col">
              <textarea
                placeholder="Descripción"
                value={item.descripcion}
                onChange={(e) => handleChange(e, "experienciaLaboral", index)}
                name="descripcion"
                className="form-control"
              />
            </div>
            <div className="col">
              <label className="form-label">
                {formatDate(item.fechaInicio)}
              </label>
              <input
                value={item.fechaInicio}
                onChange={(e) => handleChange(e, "experienciaLaboral", index)}
                name="fechaInicio"
                type="date"
                className="form-control"
              />
            </div>
            <div className="col">
              <label className="form-label">{formatDate(item.fechaFin)}</label>
              <input
                value={item.fechaFin}
                onChange={(e) => handleChange(e, "experienciaLaboral", index)}
                name="fechaFin"
                type="date"
                className="form-control"
              />
            </div>
            <div className="col" style={{ padin: "0px", margin: "30px" }}>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveItem("experienciaLaboral", index)}
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
            onClick={() => handleAddItem("experienciaLaboral")}
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
            value={formData.competencias}
            onChange={(e) =>
              setFormData({ ...formData, competencias: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div
          className="card-header"
          style={{ paddingLeft: "20px", textAlign: "left", color: "blue" }}
        >
          <p className="card-text">Idiomas</p>
        </div>
        {formData.idiomas.map((item, index) => (
          <div key={index} className="row mb-3 mt-3">
            <div className="col">
              <input
                placeholder="Idioma"
                value={item.idioma}
                onChange={(e) => handleChange(e, "idiomas", index)}
                name="idioma"
                className="form-control"
              />
            </div>
            <div className="col">
              <select
                value={item.nivel}
                onChange={(e) => handleChange(e, "idiomas", index)}
                name="nivel"
                className="form-control"
              >
                <option value="Nivel bajo">Nivel bajo</option>
                <option value="Nivel medio">Nivel medio</option>
                <option value="Nivel alto">Nivel alto</option>
                <option value="Nivel muy alto">Nivel muy alto</option>
              </select>
            </div>{" "}
            <div className="col" style={{ padin: "0px", margin: "30px" }}>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveItem("idiomas", index)}
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
            onClick={() => handleAddItem("idiomas")}
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
            value={formData.masInformacion}
            onChange={(e) =>
              setFormData({ ...formData, masInformacion: e.target.value })
            }
            className="form-control"
          />
        </div>
        <button className="btn btn-primary mt-2 mb-2" type="submit">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default CompEditData;
