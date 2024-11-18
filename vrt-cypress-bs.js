
const fs = require('fs');
const path = require('path');

function generateScenarios() {
  const actualDir = './results/cypress/2345';
  const referenceDir = './results/cypress/2368';

  // Leer archivos en ambas carpetas
  const base = fs.readdirSync(actualDir);
  const rc = fs.readdirSync(referenceDir);

  // Crear arreglo para escenarios
  const escenarios = [];

  for (let i = 0; i < base.length; i++) {
    const ss45 = base[i]; // Imagen en 2345
    let ss68 = false; // Imagen correspondiente en 2368

    // Buscar pareja en rc
    for (let j = 0; j < rc.length; j++) {
      if (rc[j] === ss45) {
        ss68 = rc[j];
        rc.splice(j, 1); // Eliminar de rc para evitar duplicados
        console.log("Archivo encontrado:", ss68);
        break;
      }
    }

    if (!ss68) {
      console.log("No encontrado pareja:", ss45);
      continue;
    }

    // Crear escenario
    const escenario = {
      label: ss45.replace(".png", ""),
      //referenceUrl: `file://${path.resolve(referenceDir, ss45)}`,
      //url: `file://${path.resolve(actualDir, ss45)}`,
      referenceUrl: `${referenceDir}/${ss68}`,
      url: `${actualDir}/${ss45}`,
      selectors: ['document'],
      misMatchThreshold: 0.2,
      readyEvent: null,
      delay: 500,
    };

    // Agregar escenario al arreglo
    escenarios.push(escenario);
  }

  // Registrar imágenes de referencia que no tienen pareja en la carpeta actual
  for (const restante of rc) {
    console.log("No encontrado en la carpeta actual:", restante);
  }

  return escenarios;
}

// Crear configuración de Backstop.js
const config = {
  id: 'visual-regression-test',
  viewports: [
    {
      name: 'desktop',
      width: 1024,
      height: 768,
    },
  ],
  scenarios: generateScenarios(),
  paths: {
    bitmaps_reference: './results/cypress/2368',
    bitmaps_test: './results/cypress/backstop',
    html_report: "./results/cypress",
    ci_report: "./results/cypress"
  },
  engine: 'puppeteer',
  report: ['browser'],
  debug: true,
  fileNameTemplate: "{scenarioLabel}"
};

// Guardar el archivo de configuración
fs.writeFileSync('./backstop.json', JSON.stringify(config, null, 2));
console.log('Archivo backstop.json generado con éxito.');
