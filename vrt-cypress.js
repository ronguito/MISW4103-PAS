const compareImages = require("resemblejs/compareImages")
const config = require("./config-resemble.json");
const fs = require('fs');

const { viewportHeight, viewportWidth, browsers, options } = config;


const arregloNombre = new Array();
async function executeTest(){
    
    let resultInfo = {}
    let datetime = new Date().toISOString().replace(/:/g,".");
    
    
    const base = fs.readdirSync("./results/cypress/2345")
    const rc = fs.readdirSync("./results/cypress/2368")
    for (let i = 0; i < base.length; i++) {

        ss45 = base[i];
        ss68 = false;
        
        for (let j = 0; j < rc.length; j++) {
            if(rc[j]==ss45){
                ss68=rc[j];
                rc.splice(j, 1);
                console.log("Archivo:", ss68);
                break;
            }
        }
        arregloNombre.push(ss68.trim());
        const data = await compareImages(
            fs.readFileSync(`./results/cypress/2345/${ss45}`),
            fs.readFileSync(`./results/cypress/2368/${ss68}`),
            options
        );

        resultInfo[ss68.trim()] = {
            isSameDimensions: data.isSameDimensions,
            dimensionDifference: data.dimensionDifference,
            rawMisMatchPercentage: data.rawMisMatchPercentage,
            misMatchPercentage: data.misMatchPercentage,
            diffBounds: data.diffBounds,
            analysisTime: data.analysisTime
        }

        fs.writeFileSync(`./results/cypress/compare/${ss68}`, data.getBuffer());
        
    }
    fs.writeFileSync(`./results/cypress/reporte_comparacion_cypress.html`, createReport(datetime, resultInfo));
    fs.copyFileSync('./index.css', `./results/cypress/index.css`);
    console.log('------------------------------------------------------------------------------------');
    console.log("Finalizo ejecución");
    console.log(arregloNombre);
    return resultInfo;  
  }


(async ()=>console.log(await executeTest()))();

function browser(b, info){

    return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Prueba: ${b}</h2>
        <p>Data: ${JSON.stringify(info)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="../cypress/2368/${b}" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="../cypress/2345/${b}" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="../cypress/compare/${b}".png" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
}

function createReport(datetime, resInfo){
    return `
    <html>
        <head>
            <title> Reporte de comparación de la verión 5.96 y 5.4 de Ghost </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Reporte de comparación de la verión 5.96 y 5.4 de Ghost con la ejecución de pruebas automatizadas con Cypress                 
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
            ${arregloNombre.map(b=>browser(b, resInfo[b]))}
            </div>
        </body>
    </html>`
}