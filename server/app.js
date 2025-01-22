require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Importar rutas
const pricesRoutes = require("./routes/prices");
const pdfRoutes = require("./routes/pdf");

// Usar rutas
app.use("/api/prices", pricesRoutes);
app.use("/api/pdf", pdfRoutes);

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
