require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const generatePDF = require("./utils/generatePDF");

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint para obtener precios
app.get("/api/prices", (req, res) => {
  const prices = [
    { symbol: "BTCUSDT", price: 106855.99 },
    { symbol: "ETHUSDT", price: 3357.6 },
    { symbol: "BNBUSDT", price: 696.14 },
    { symbol: "XRPUSDT", price: 3.218 },
    { symbol: "ADAUSDT", price: 1.0216 },
    { symbol: "SOLUSDT", price: 255.35 },
    { symbol: "DOGEUSDT", price: 0.38455 },
    { symbol: "DOTUSDT", price: 6.814 },
    { symbol: "SHIBUSDT", price: 0.00002119 },
    { symbol: "AVAXUSDT", price: 37.33 },
  ];
  res.json(prices);
});

// Endpoint para generar PDF
app.post("/api/pdf", async (req, res) => {
  const { cart, total } = req.body;

  try {
    const pdfPath = path.join(__dirname, "receipt.pdf");
    await generatePDF(cart, total, pdfPath);

    res.status(200).sendFile(pdfPath);
  } catch (error) {
    console.error("Error generando el PDF:", error.message);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
