const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Definir las rutas de las carpetas
const sourceDir = path.join(__dirname, 'features', 'all');
const targetDir = path.join(__dirname, 'features');

// Obtener la lista de archivos .feature en la carpeta 'all'
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error('Error leyendo la carpeta source:', err);
    return;
  }

  // Filtrar solo los archivos .feature
  const featureFiles = files.filter(file => file.endsWith('.feature'));

  let index = 0;

  // Función para ejecutar el ciclo de copia, ejecución y borrado
  const processFile = () => {
    if (index >= featureFiles.length) {
      console.log('Todos los tests han sido procesados.');
      return;
    }

    const file = featureFiles[index];
    const sourceFile = path.join(sourceDir, file);
    const targetFile = path.join(targetDir, file);

    // Copiar el archivo de 'all' a la raíz
    fs.copyFile(sourceFile, targetFile, (copyErr) => {
      if (copyErr) {
        console.error(`Error copiando el archivo ${file}:`, copyErr);
        index++;
        processFile(); // Continuar con el siguiente archivo
        return;
      }

      console.log(`Archivo ${file} copiado a la raíz.`);

      // Ejecutar el test con Kraken
      exec('npx kraken-node run', (execErr, stdout, stderr) => {
        if (execErr) {
          console.error(`Error ejecutando el test para ${file}:`, execErr.message);
          console.error(stderr);
        } else {
          console.log(`Test para ${file} ejecutado con éxito.`);
          console.log(stdout);
        }

        // Borrar el archivo después de ejecutar el test
        fs.unlink(targetFile, (unlinkErr) => {
          if (unlinkErr) {
            console.error(`Error borrando el archivo ${file}:`, unlinkErr);
          } else {
            console.log(`Archivo ${file} borrado después de la ejecución.`);
          }

          // Incrementar el índice y procesar el siguiente archivo
          index++;
          processFile();
        });
      });
    });
  };

  // Iniciar el procesamiento de archivos
  processFile();
});
