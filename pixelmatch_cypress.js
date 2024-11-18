const fs = require('fs');
const { PNG } = require('pngjs');

(async () => {
  const pixelmatch = (await import('pixelmatch')).default;
  const arregloNombre = new Array();

    if(!fs.existsSync('./results/kraken/compare')){
        fs.mkdirSync('./results/kraken/compare', { recursive: true });
    }
    let datetime = new Date().toISOString().replace(/:/g,".");
    const base = fs.readdirSync("./results/cypress/2345")
    const rc = fs.readdirSync("./results/cypress/2368")
    for (let i = 0; i < base.length; i++) {
      let ss45 = base[i];
      let ss68 = false;
      
      for (let j = 0; j < rc.length; j++) {
          if(rc[j]==ss45){
              ss68=rc[j];
              rc.splice(j, 1);
              console.log("Archivo:", ss68);
              break;
          }
      }
      if(!ss68) { console.log("No encontrado pareja:", ss45); continue; }
      arregloNombre.push(ss68.trim());
      
      const img1 = PNG.sync.read(fs.readFileSync(`./results/cypress/2345/${ss45}`));
      const img2 = PNG.sync.read(fs.readFileSync(`./results/cypress/2368/${ss68}`));

      const { width, height } = img1;
      const { width2, height2 } = img2;
      const diff = new PNG({ width, height });
      try{
        pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
        fs.writeFileSync(`./results/cypress/compare/${ss68}`, PNG.sync.write(diff));
      }catch(error){
        console.log("#####################ERROR###################");
        console.log(error);
      }   
      
    }   
    
    console.log('------------------------------------------------------------------------------------');
    console.log("Finalizo ejecución");
    console.log(arregloNombre);

  // Crear contenido del informe HTML
  function browser(b){
    return `<div class=" browser" id="test0">
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
        <img class="img2" src="../cypress/compare/${b}" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
  }
  
  function createReport(datetime, url){
    return `
    <html>
        <head>
            <title> Reporte de comparación de la verión 5.96 y 4.5 de Ghost </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <style>
           .browser {
                position: relative;
                margin: 5px auto;
                padding: 10px 30px;
                background-color: #FAFAFA;
                box-shadow: 0 3px 6px 0 rgba(0,0,0,0.16);
                min-height: 40px;
                -webkit-break-inside: avoid;
                break-inside: avoid;
            }
            .btitle {
                padding: 5px 0;
            }
            .imgline {
                position: relative;
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
            }
            .imgcontainer {
                -webkit-flex: 1 1 auto;
                -ms-flex: 1 1 auto;
                flex: 1 1 auto;
                padding: 0 25px;
                padding-top: 20px;
                text-align: center;
            }
            .imgname {
                text-align: center;
                font-family: latoregular;
                color: #787878;
                display: block;
                margin: 0 auto;
                text-transform: uppercase;
                padding: 5px 0;
                padding-bottom: 15px;
                font-size: 12px;
            }
            .img2 {
                width: auto;
                max-width: 100%;
                max-height: 400px;
            }
            .imgfull{
                width:100%
            }
        </style>
        <body>
            <h1>Reporte de comparación de la verión 5.96 y 5.4 de Ghost con la ejecución de pruebas automatizadas con Cypress
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
            ${arregloNombre.map(b=>browser(b))}
            </div>
        </body>
    </html>`
  }
  
  fs.writeFileSync(`./results/cypress/pixiematch.html`, createReport(datetime));
})();
