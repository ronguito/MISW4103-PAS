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

* Contar con una instalacion de Ghost de manera local.
* Haber configurado manualmente una cuenta en ghost

## Instalación
El proceso de instalacion incluye las dos herramientas para ejecutar las pruebas
desarrolladas en este proyecto.

* Para instalar todas las dependencias ejecute en la consola de comandos desde la raiz del proyecto:

```bash
npm install
```

* Despues de instalar las dependencias instale Cypress de manera global
 
```bash
npm install -g cypress
```

* Configuracion adicional para Kraken

a) Para que kraken funcione adecuadamente en Windows es necesario instalar ADB (Android Debug Bridge), para ello
descargue desde la pagina oficial de Android 
<a href="https://developer.android.com/studio/releases/platform-tools">Descargar ABD</a> siga los siguientes pasos

1. Descomprima los archivos descargados
2. Copie la carpeta "platform-tools" en el disco C:
3. Abra el panel de control y busque la opcion Sistema
4. De clic en opciones avanzadas del sistema.
5. De clic en el boton Variables de entorno.
6. En la seccion variables del sistema busque la variable "Path" y de clic sobre ella
7. De clic en el boton editar y luego de clic en Nuevo
8. Digite la direccion de la carpeta c:\platform-tools
9. De clic en Aceptar a todas las ventanas hasta salir de la configuracion.
10. Para que tenga efecto debe cerrar la consola y volverla a abrir

b) Es posible que se presente un error con la herrameinta Appium utilizada por Kraken para 
la automatización de pruebas para aplicaciones móviles y de escritorio, si esto ocurre instale Appium de 
manera glogal

```bash
npm install -g appium
```


## Ejecución de Pruebas

* Configuracion.

Tanto Cypres como Kraken comparte un unico archivo de configuracion inicial de las pruebas, este archivo 
se encuentra en la raiz del proyecto y se llama properties.json. Es importante revisar y modificar los datos
de este archivo antes de iniciar las pruebas, alli podra configurar el Usuario, la contraseña y las Url 
necesarias para algunas de las pruebas. Si es necesario cambie las direcciones Url de acuerdo a la instalacion
de sus sistema

properties.json
```bash
{
    "UserName": "admin@redfox.com.co",
    "UserPass": "Admin123++",
    "Host": "http://localhost",
    "Port": 2345,
    "UrlPublic" : "",
    "UrlLogin": "/ghost/#/signin",
    "UrlPost": "/ghost/#/posts",
    "UrlTag": "/ghost/#/tags",
    "UrlPage": "/ghost/#/pages",
    "UrlMember": "/ghost/#/members",
    "Results": "./results"
}

```

* Pruebas con Cypress, desde la consola de comandos en la raiz del proyecto

```bash
//Ejecutar las pruebas en modo interactivo con 
npx cypress open 

//Ejecutar las pruebas en modo headless con 
npx cypress run.
```



* Pruebas con Kraken-node, desde la consola de comandos en la raiz del proyecto

Los archivos de los test estan almacenados en la carpeta "/features/all", alli se encuentra
un archivo .feature por cada escenario, para correr el test es necesario copiar y pegar el 
test que desea correr a la carpeta "/features", desde aqui se corre el test.

¡Nota importante! Solo se puede correr un test a la vez

Para correr el test ejecute desde la consola de comandos en la raiz del proyecto

```bash
npx kraken-node run
```

Esto iniciara la prueba en modo visual y cargara un navegador contralado por kraken.

Para correr todas las pruebas en secuencia, se implemento un script automatizado que inyecta 
la prueba en la carpeta de features de kraken y corre automanticamente todos los test. Si un test falla el comando reinicia desde el primero nuevamente.

Ejecute desde la consola el comando
```bash
node kraken.js
```


## Ejecución de informe de comparación de imagenes

* Requisitos: 
Tener instalada la version 4.5 de Ghost en el puerto 2345.
Tener instalada la version 5.96 de Ghost en el puerto 2368.
NOTA: Si instalo Ghost en un puerto diferente las pruebas van a fallar

Para realizar la comparación de las prueba con las dos version de Ghost se debe seguir los siguiente pasos.

* Correr las pruebas de las versiones

1. Validar el puerto configurado en el archivo properties en el parametro "Port", para la version de Ghost que desea probar de acuerdo a los requisitos previos.
Ghost versión 4.5 puerto 2345. 
Ghost version 5.96 puerto 2368.

2. Ejecutar el comando adecuado de acuerdo a la herramienta que desea utilizar para realizar las pruebas.
* Kraken
```bash
//correr test por test individual
npx kraken-node run 

//correr todos los test
node kraken.js
```
* Cypress
```bash
//correr test en modo interactivo 
cypress open 

//correr en modo headless
cypress run
```
3. Las prueba ejecutadas generan los pantallazos de cada paso y los guarda en la carpeta /results/<herramienta_de_prueba>/<puerto_configurado>. Con esto ya tenemos la imagenes de la versión seleccionada de acuerdo al puerto.

4. Cambiar el puerto del archivo properties al de la versión que desea probar y repetir el proceso del paso 2, con la misma herramienta.

* Correr los test de regresion visual

Si uso la herramienta Kraken para las pruebas, el test se corre con el siguiente comando 
```bash
node vrt-kraken.js
```
El informe de la prueba se genera en la ruta ./results/kraken/index.html


Si uso la herramienta Cypress para las pruebas el test se corre con el siguiente comando:

```bash
node pixelmatch_cypress.js
```
El informe de la prueba se genera en la ruta ./results/cypress/pixelmatch.html

Si desea correr todos los test indistintamente de la herramienta usada se debe correr el siguinte comando
```bash
vrt
```
Esto corre todos los test de regresion visual incluido el test de Blockstop configurado para las pruebas con cypres, y abre automaticamente los reportes html de los test.

## Escenarios con datos aleatorios.
Se adaptaron test e2e para correr escenarios con diferentes datos para las pruebas, lo cual incluye datos a-priri, datos pseudo-aleatorios y datos aletarios con la libreria faker, estos escenarios se configuraron a traves de un archivos .json de configuracion el cuale s cargado por el test adaptato para cargar estos escearios y ejecutarlos. 
Los archivos de configuracion de los escenarios se encuentran alojados en la carpeta ./e2e/data.
En la carpeta ./e2e se encuentran los test adaptados con el nombre suit-data.cy.js, usando la herramienta cypress puede ejecutar cada test el cual se encargar de correr los escenarios desde la carpeta data, a continuacion se relaciona los escenarios que son cargados por cada test suit-data:

suit-data.cy.js -> f01e01.json & f01e02.json & f02e01.json & f03e01.json<br>
suit-data-f04.cy.js -> f04e01.json<br>
suit-data-f05.cy.js -> f05e01.json

## Integrantes
Nombre | Correo
-------|---------
Calletana Lopez  | c.lopezb2@uniandes.edu.co
Sergio Gelvez | s.gelvezg@uniandes.edu.co
Raul Ramos | r.ramosg@uniandes.edu.co
Juan Tapia | ja.tapia911@uniandes.edu.co
