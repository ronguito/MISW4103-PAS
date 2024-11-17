const compareImages = require("resemblejs/compareImages")
const config = require("./config-resemble.json");
const fs = require('fs');

const { viewportHeight, viewportWidth, browsers, options } = config;


async function executeTest(){
    
    let resultInfo = {}
    let datetime = new Date().toISOString().replace(/:/g,".");

    if(!fs.existsSync('./results/kraken/compare')){
        fs.mkdirSync('./results/kraken/compare', { recursive: true });
    }
    
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
        
        const data = await compareImages(
            fs.readFileSync(`./results/kraken/2345/${ss45}`),
            fs.readFileSync(`./results/kraken/2368/${ss68}`),
            options
        );

        resultInfo = {
            isSameDimensions: data.isSameDimensions,
            dimensionDifference: data.dimensionDifference,
            rawMisMatchPercentage: data.rawMisMatchPercentage,
            misMatchPercentage: data.misMatchPercentage,
            diffBounds: data.diffBounds,
            analysisTime: data.analysisTime
        }

        fs.writeFileSync(`./results/kraken/compare/${ss68}.png`, data.getBuffer());
        
    }

    console.log('------------------------------------------------------------------------------------')
    console.log("Execution finished. Check the report under the results folder")
    return resultInfo;  
  }


(async ()=>console.log(await executeTest()))();