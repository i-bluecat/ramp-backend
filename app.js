{
    "name": "server",
    "version": "1.0.0",
    "main": "server/app.js",
    "scripts": {
        "start": "node server/app.js"
    },
    "dependencies": {
        "axios": "^1.7.9",
        "cors": "^2.8.5",
        "dotenv": "^16.4.7",
        "express": "^4.21.2",
        "helmet": "^8.0.0",
        "pdfkit": "^0.16.0",
        "stripe": "^17.5.0"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "type": "commonjs",
    "description": ""
}


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
