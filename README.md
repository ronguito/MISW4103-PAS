# Pruebas Automáticas E2E para el Aplicativo Ghost

Este proyecto implementa pruebas de extremo a extremo (E2E) para el aplicativo Ghost, 
utilizando Cypress y Kraken-node. Estas herramientas permiten asegurar la calidad y 
estabilidad de la aplicación mediante la automatización de escenarios de prueba que 
simulan interacciones de usuarios reales

## Herramientas utilizadas

Cypress: Framework de pruebas E2E que permite escribir y ejecutar pruebas en tiempo real 
en un entorno de navegador. Cypress facilita la automatización de pruebas para verificar 
el comportamiento de la interfaz de usuario.

Kraken-node: Plataforma de pruebas E2E multi-dispositivo y multi-navegador, diseñada 
para pruebas visuales en aplicaciones móviles y web. Kraken-node se utiliza para gestionar 
escenarios de prueba avanzados en distintos entornos y configuraciones.

## Prerequisitos

Contar con una instalacion de Ghost de manera local.

## Instalación

Para instalar todas las dependencias, ejecuta:

```bash
npm install
```

## Ejecución de Pruebas

Pruebas con Cypress, desde la consola de comandos en la raiz del proyecto

```bash
//Ejecutar las pruebas en modo interactivo con 
npx cypress open 
//Ejecutr las pruebas en modo headless con 
npx cypress run.
```

Pruebas con Kraken-node, desde la consola de comandos en la raiz del proyecto

```bash
npx kraken-node run.
```
