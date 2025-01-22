const express = require("express");
const cors = require("cors"); // Importar CORS
const app = express();

app.use(cors()); // Habilitar CORS
app.use(express.json()); // Para manejar JSON

// Registrar rutas
app.use("/api/pdf", pdfRoutes);

// Endpoint de prueba para verificar si el servidor funciona
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente.");
});

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

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
