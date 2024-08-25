const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument();

doc.pipe(fs.createWriteStream('output_test.pdf'));

doc.fontSize(25).text('Simple PDF Test', 100, 100);

doc.end();

console.log('PDF generation completed.');
