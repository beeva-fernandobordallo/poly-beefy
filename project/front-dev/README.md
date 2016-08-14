# PFE - Front-End

Proyecto de front-end basado en Polymer y apoyado en la herramienta Polymer-CLI para la construcción de builds. **Ir al README del proyecto de Back-end (server-dev folder) para leer pasos con los que levantar el servidor en modo 'Front developer'**.

### Instalación de dependencias

Hay que tener instalados **node y npm**. Adicionalmente hay que tener instalado bower:

`npm install -g bower`

Posteriormente lanzar:

- `npm install && bower install`

### Comandos Gulp

Hay disponibles dos comandos fundamentales para 'trasladar' versiones DEV y PRO a la carpeta que servirá el backend en modo producción. Estos son:

- `gulp deploy-dev`
- `gulp deploy-pro`

El primero traslada una copia del proyecto sin vulcanizar junto a todas sus dependencias. El segundo lanza el comando `polymer build` en segundo plano, vulcanizando nuestro proyecto y posteriormente trasladando los archivos necesarios al proyecto de Back-end (/server-dev/public).