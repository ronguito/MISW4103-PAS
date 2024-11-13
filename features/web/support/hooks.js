const { After, Before, AfterStep } = require('@cucumber/cucumber');
const { WebClient } = require('kraken-node');

Before(async function() {
  this.deviceClient = new WebClient('chrome', {}, this.userId);
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
})

After(async function() {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});

const fs = require('fs');
const path = require('path');
// Importar configuración desde 'properties.json' ubicado en la raíz del proyecto
const propertiesPath = path.join(process.cwd(), 'properties.json');
const properties = require(propertiesPath);

// Inicializar contador global para las capturas de pantalla
let screenshotCounter = 0;

AfterStep(async function (step) {
    const driver = this.driver;

    if (!driver) {
        console.error("La instancia de 'driver' no está disponible.");
        return;
    }

    // Incrementar el contador de capturas
    screenshotCounter += 1;

    // Obtener el texto del paso actual
    const stepText = step.text ? step.text.replace(/[^a-zA-Z0-9]/g, '_') : `step_${screenshotCounter}`;
    // Obtener el nombre del paso y formatearlo para el nombre del archivo
    const EscenarioName = step.pickle.name.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 6);

    // Ruta para guardar capturas de pantalla
    const port = properties.Port
    const screenshotsDir = path.resolve(process.cwd(), properties.results + "/kraken/" + port );
   

    // Crear el directorio si no existe
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    // Generar el nombre del archivo de captura con contador y texto del paso
    //const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    //const screenshotName = `${EscenarioName}_${stepText}-${timestamp}.png`;
    const screenshotName = `${EscenarioName}_${stepText}.png`;
    const screenshotPath = path.join(screenshotsDir, screenshotName);

    // Tomar la captura de pantalla y guardarla
    try {
        await driver.saveScreenshot(screenshotPath);
        console.log(`Captura de pantalla guardada: ${screenshotPath}`);
    } catch (error) {
        console.error(`Error al tomar la captura de pantalla: ${error.message}`);
    }
});