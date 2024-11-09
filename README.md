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
    "UserName": "correo registrado en ghost",
    "UserPass": "contraseña de ingreso",
    "UrlPublic" : "http://localhost:2368",
    "UrlLogin": "http://localhost:2368/ghost/#/signin",
    "UrlPost": "http://localhost:2368/ghost/#/posts"
}
```

* Pruebas con Cypress, desde la consola de comandos en la raiz del proyecto

```bash
//Ejecutar las pruebas en modo interactivo con 
npx cypress open 
//Ejecutr las pruebas en modo headless con 
npx cypress run.
```



* Pruebas con Kraken-node, desde la consola de comandos en la raiz del proyecto

Los archivos de los test estan almacenados en la carpeta "/features/all", alli se encuentra
un archivo .feature por cada escenario, para correr el test es necesario copiar y pegar el 
test que desea correr a la carpeta "/features", desde aqui se corre el test.

¡Nota importante! Solo se puede correr un test a la ves

Para correr el test ejecute desde la consola de comandos en la raiz del proyecto

```bash
npx kraken-node run.
```

Esto iniciara la prueba en modo visual y cargara un navegador contralado por kraken.
