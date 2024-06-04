const express = require("express");
const {
  getAllData,
  getData,
  createData,
  updateData,
  deleteData,
} = require("../controllers/Controller.js");

const portafolioRouter = express.Router(); // Crear un enrutador
portafolioRouter.get("/", getAllData);
portafolioRouter.get("/:id", getData);
portafolioRouter.post("/", createData);
portafolioRouter.put("/:id", updateData);
portafolioRouter.delete("/:id", deleteData);

module.exports = { portafolioRouter };
