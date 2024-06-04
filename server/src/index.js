const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/users");
const { portafolioRouter } = require("./routes/portafolioRoutes.js");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/portafolio", portafolioRouter);

// Solo establecer la conexión a MongoDB y escuchar en el puerto si no estamos en un entorno de prueba
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`SERVER STARTED on port ${PORT}!`));
}

module.exports = app;
