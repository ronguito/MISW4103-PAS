node vrt-kraken.js
node pixelmatch_cypress.js
node vrt-cypress-bs.js
start chrome %CD%\results\kraken\index.html & start chrome  %CD%\results\cypress\pixiematch.html & start chrome  %CD%\results\cypress\index.html
npx backstop test
