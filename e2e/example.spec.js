import { test } from '@playwright/test';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { options } from "../vrt.config";

test.describe("color-pallete", () => { 
  const arregloNombre = new Array();
  test('vrt', async ({ page }) => {  

    let resultInfo = {}
    let datetime = new Date().toISOString().replace(/:/g,".");
    const base = fs.readdirSync("./results/kraken/2345")
    const rc = fs.readdirSync("./results/kraken/2368")
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
          fs.readFileSync(`./results/kraken/2345/${ss45}`),
          fs.readFileSync(`./results/kraken/2368/${ss68}`),
          options
      );
      const img1 = PNG.sync.read(fs.readFileSync(`./results/cypress/2345/${ss45}`));
      const img2 = PNG.sync.read(fs.readFileSync(`./results/cypress/2368/${ss68}`));

      const { width, height } = img1;
      const diff = new PNG({ width, height });
  
      pixelmatch(img1.data, img2.data, diff.data, width, height, options);
      fs.writeFileSync('diff.png', PNG.sync.write(diff));
    } 
   
    console.log('------------------------------------------------------------------------------------');
    console.log("Execution finished. Check the report under the results folder");
    console.log(arregloNombre);
  });

  function browser(b){
  return `<div class=" browser" id="test0">
  <div class="imgline">
    <div class="imgcontainer">
      <span class="imgname">Reference</span>
      <img class="img2" src="../cypress/2368/${b}" id="refImage" label="Reference">
    </div>
    <div class="imgcontainer">
      <span class="imgname">Test</span>
      <img class="img2" src="../cypress/2368/${b}" id="testImage" label="Test">
    </div>
  </div>
  <div class="imgline">
    <div class="imgcontainer">
      <span class="imgname">Diff</span>
      <img class="imgfull" src="../cypress/2368/${b}" id="diffImage" label="Diff">
    </div>
  </div>
</div>`
}

function createReport(datetime, url){
  return `
  <html>
      <head>
          <title> VRT Report </title>
          <link href="index.css" type="text/css" rel="stylesheet">
      </head>
      <body>
          <h1>Report for 
               <a href="${url}"> ${url}</a>
          </h1>
          <p>Executed: ${datetime}</p>
          <div id="visualizer">
          ${arregloNombre.map(b=>browser(b))}
          </div>
      </body>
  </html>`
}
const browsers = ["chromium"];

fs.writeFileSync(`./test-results/report.html`, createReport(datetime, resultInfo));
fs.copyFileSync('./e2e/index.css', `./results/${datetime}/index.css`);
});

