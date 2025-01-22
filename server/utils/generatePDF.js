const PDFDocument = require("pdfkit");
const fs = require("fs");

const generatePDF = (cart, total, outputPath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    doc.fontSize(18).text("Receipt", { align: "center" });
    doc.moveDown();

    cart.forEach((item) => {
      doc.text(
        `${item.symbol}: ${item.units.toFixed(4)} units - $${item.amount.toFixed(2)}`,
        { align: "left" }
      );
    });

    doc.moveDown();
    doc.text(`Total: $${total.toFixed(2)}`, { align: "right" });

    doc.end();

    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
};

module.exports = generatePDF;
