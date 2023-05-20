const fs = require('fs');
const sharp = require('sharp');

const inputFolder = 'Aqui tu direccion de carpeta'; // Carpeta de entrada (PNG)
const outputFolder = 'Aqui tu direccion de carpeta'; // Carpeta de salida (WebP)


// Crea la carpeta de salida si no existe
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Lee el contenido de la carpeta de entrada
fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error('Error al leer la carpeta de entrada:', err);
    return;
  }

  // Filtra los archivos PNG
  const pngFiles = files.filter(file => file.endsWith('.png'));

  // Convierte cada archivo PNG a WebP
  pngFiles.forEach(file => {
    const inputPath = `${inputFolder}/${file}`;
    const outputFile = file.replace('.png', '.webp');
    const outputPath = `${outputFolder}/${outputFile}`;

    sharp(inputPath)
      .toFormat('webp')
      .toFile(outputPath, (err) => {
        if (err) {
          console.error(`Error al convertir ${file}:`, err);
        } else {
          console.log(`${file} convertido exitosamente a ${outputFile}`);
        }
      });
  });
});
