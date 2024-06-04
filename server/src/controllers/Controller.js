const portafolioModel = require("../models/portafolioModel.js");

// Mostrar todos
exports.getAllData = async (req, res) => {
  try {
    const portafolio = await portafolioModel.find();
    res.status(200).json(portafolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mostrar un Dato
exports.getData = async (req, res) => {
  try {
    const id = req.params.id;
    const portafolio = await portafolioModel.findById(id);
    if (!portafolio) {
      return res.status(404).json({ message: "portafolio no encontrado" });
    }
    res.status(200).json(portafolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear Data
exports.createData = async (req, res) => {
  try {
    // Verificar si ya existe un portafolio guardado
    const existingPortafolio = await portafolioModel.findOne();
    if (existingPortafolio) {
      return res.status(400).json({
        message:
          "Hay un portafolio guardado, solo se permite actualizarlo. Si quieres crear otro nuevo, tienes que eliminar el existente.",
      });
    }

    // Si no hay un portafolio existente, crea uno nuevo
    const nuevoportafolio = await portafolioModel.create(req.body);
    res.status(201).json(nuevoportafolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un portafolio
exports.updateData = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body; // Se obtienen los nuevos datos del cuerpo de la solicitud
    const portafolioActualizado = await portafolioModel.findByIdAndUpdate(
      id,
      newData,
      { new: true }
    );
    if (!portafolioActualizado) {
      return res.status(404).json({ message: "portafolio no encontrado" });
    }
    res.status(200).json(portafolioActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un portafolio
exports.deleteData = async (req, res) => {
  try {
    const id = req.params.id;
    const portafolioEliminado = await portafolioModel.findByIdAndDelete(id);
    if (!portafolioEliminado) {
      return res.status(404).json({ message: "portafolio no encontrado" });
    }
    res.status(200).json({ message: "portafolio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
