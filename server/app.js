require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const pricesRoutes = require("./routes/prices");
const pdfRoutes = require("./routes/pdf");

app.use("/api/prices", pricesRoutes);
app.use("/api/pdf", pdfRoutes);

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente.");
});
