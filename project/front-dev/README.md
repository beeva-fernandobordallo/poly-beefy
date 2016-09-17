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

#### Desarrollo de componentes en PFE_COMPONENTS Folder

Dado que no tenemos repositorios individuales para los componentes específicos de PFE que creemos los ubicaremos en la carpeta `src/pfe_components` y los desarrollaremos considerando que existen en el proyecto dentro de la carpeta `bower_components`.

Esto implica que se deberá hacer una de dos cosas:
- Crear un enlace simbólico del componente que estemos creando dentro de la carpeta `bower_components`. Para hacer esto basta con lanzar `bower link` dentro de la carpeta del componente que estemos creando, copiar el nombre del componente y lanzar `bower link <component_name>` desde la raiz de nuestro proyecto (`front-dev` folder).
- Lanzar `gulp pfe-components` tras realizar cambios. Este task de gulp copia todos los archivos HTML de componentes que hay en la carpeta `src/pfe_components` a la carpeta `bower_components`, respetando la estructura.