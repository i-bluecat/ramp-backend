const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { generatePDF } = require("../utils/generatePDF");

// Ruta para generar el PDF
router.post("/", async (req, res) => {
  const { cart, total } = req.body;

  if (!cart || !total) {
    return res.status(400).json({ error: "Cart data or total missing" });
  }

  try {
    const filePath = path.join(__dirname, "../receipt.pdf");

    // Generar el PDF
    await generatePDF(cart, total, filePath);

    // Enviar el archivo PDF generado como respuesta para descarga
    res.setHeader("Content-Disposition", 'attachment; filename="receipt.pdf"');
    res.setHeader("Content-Type", "application/pdf");

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (err) {
    console.error("Error generating or sending PDF:", err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

module.exports = router;
