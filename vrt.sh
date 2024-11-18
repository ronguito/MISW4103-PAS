#!/bin/bash

# Ejecutar los scripts de Node.js
node vrt-kraken.js
node pixelmatch_cypress.js
node vrt-cypress-bs.js

# Abrir los archivos HTML en Google Chrome (o el navegador que estés utilizando)
google-chrome ./results/kraken/index.html &
google-chrome ./results/cypress/pixiematch.html &
google-chrome ./results/cypress/index.html &

# Ejecutar el comando de Backstop
npx backstop test


