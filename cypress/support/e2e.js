// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
/*
// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

const fs = require('fs');
const path = require('path');

// Tomar una captura de pantalla después de cada paso
afterEach(() => {
    // Importar configuración desde 'properties.json' ubicado en la raíz del proyecto
    console.log("process cwd: ",process.cwd())
    const propertiesPath = path.resolve(process.cwd(), 'properties.json');
    console.log("propertiesPath: ",propertiesPath)
    let properties;
    try {
        const data = fs.readFileSync(propertiesPath, 'utf-8');
        properties=JSON.parse(data);
    } catch (error) {
        console.error("Error al leer 'properties.json':",error.message);
        return;
    }
    // const properties = require(propertiesPath);
    const port = properties.Port
    // Obtener el nombre del test actual
    const testName = Cypress.currentTest.title.replace(/[^a-zA-Z0-9]/g, '_');

    // Generar el nombre del archivo de captura con timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotName = `${testName}-${port}`;

    // Tomar la captura de pantalla
    cy.screenshot(screenshotName);
});
*/


let screenshotCounter = 0;
let currentTestName = '';
/*
Cypress.on('command:end', (command) => {
    const allowedCommands = ['click', 'type', 'url', 'visit']; // lista de comandos para capturar
    if (allowedCommands.includes(command.attributes.name)) {
        screenshotCounter++;
        const screenshotName = `${currentTestName}_step_${screenshotCounter}`;
        console.log("Gerando Imagen: ", screenshotName);
        // Tomar la captura de pantalla
        cy.wrap(null).then(() => {
            cy.screenshot(screenshotName);  // Tomar la captura de pantalla
        });
    }
});
*/
Cypress.Commands.add('captureImage', () => {
    screenshotCounter++;  // Incrementar el contador con cada captura
    const testName = Cypress.currentTest.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 6); // Limpiar el nombre del test
    const screenshotName = `${testName}_step_${screenshotCounter}`; // Generar el nombre del archivo
    // Tomar la captura de pantalla con el nombre generado
    cy.screenshot(screenshotName);
});

Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignorar el error específico relacionado con la interrupción de reproducción
    if (err.message.includes('The play() request was interrupted because the media was removed from the document')) {
      return false; // Evita que Cypress falle la prueba
    }
    // Permitir que Cypress maneje otras excepciones no controladas normalmente
    return true;
});

beforeEach(() => {
    // Reiniciar el contador cuando cambie de escenario (basado en el nombre del test)
    const testName = Cypress.currentTest.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 6);
    if (testName !== currentTestName) {
        screenshotCounter = 0;  // Reiniciar contador al cambiar de escenario
        currentTestName = testName; // Guardar el nombre del escenario actual
    }
});
