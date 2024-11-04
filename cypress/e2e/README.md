
# Proyecto de Pruebas con Cypress

Este proyecto contiene un script de pruebas automatizadas utilizando Cypress.
Creacion de un Monky para pruebas aleatoreas de diferentes eventos 

A continuación se describen los pasos para configurar el entorno y ejecutar las pruebas.

## Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) en tu máquina

Cypress se ejecuta en Node.js, se puede descargar desde https://nodejs.org/
Crea una carpeta para el proyecto. Abrir una terminal y crea una nueva carpeta donde se instalara Cypress.
•	mkdir mi-proyecto-cypress
•	cd mi-proyecto-cypress

Inicializa el proyecto con npm init: Esto crea un archivo package.json para gestionar dependencias.
•	npm init -y

Instalar Cypress usando npm: Ejecutar el siguiente comando en la terminal para instalar Cypress como dependencia de desarrollo en caso de requerir versiones especificas para cada proyecto, de lo contrario se instala de manera global.
•	npm install cypress --save-dev
•	npm install -g cypress  // instalación de manera global

Abrir Cypress: Una vez instalado, abrir Cypress:
•	npx cypress open

Esto abrirá la interfaz de Cypress ahí se puede agregar un nuevo proyecto, agregue la carpeta donde se inicio el proyecto y luego de clic en el botón E2E Testing, esto creará una estructura de carpetas (cypress/) donde se podrá almacenar las pruebas, 
De clic en el botón del navegador y luego clic en el botón Start E2E.

## Ejecutar las pruebas
Copia el archivo prueba.cy.js dentro de la carpeta e2e de cypress en tu proyecto:

proyecto/cypress/e2e

Una vez copiado el archivo inicia cypress desde la raiz de tu proyecto

cypress open

