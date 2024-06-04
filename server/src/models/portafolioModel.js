const mongoose = require("mongoose");

const { Schema } = mongoose;

const portafolioSchema = new Schema(
  {
    datosPersonales: {
      nombre: { type: String, required: false },
      apellidos: { type: String, required: false },
      email: { type: String, required: false },
      telefono: { type: Number, required: false },
      imagen: { type: String, required: false },
    },
    sobreMi: { type: String, required: false },
    formacion: [
      {
        institucion: { type: String, required: false },
        titulo: { type: String, required: false },
        fechaInicio: { type: Date, required: false },
        fechaFin: { type: Date, required: false },
      },
    ],
    experienciaLaboral: [
      {
        empresa: { type: String, required: false },
        descripcion: { type: String, required: false },
        fechaInicio: { type: Date, required: false },
        fechaFin: { type: Date, required: false },
      },
    ],
    masInformacion: { type: String, required: false },
    competencias: { type: String, required: false },
    idiomas: [
      {
        idioma: { type: String, required: false },
        nivel: {
          type: String,
          enum: ["Nivel bajo", "Nivel medio", "Nivel alto", "Nivel muy alto"],
          required: false,
        },
      },
    ],
  },
  { collection: "portafolio" }
);

module.exports = mongoose.model("portafolioModel", portafolioSchema);
