# PFE - Back-End

El proyecto de back end esta construido sobre Node, utilizando Express como web Framework.

### Arrancar el proyecto

1. npm install
2. Podemos:
	- Levantar el servidor sirviendo la carpeta `public` (simulación de producción)
	- Levantar el servidor sirviendo la carpeta de desarrollo front: `front-dev`

En el primero de los casos basta con lanzar:

`node server`

Para trabajar en desarrollo, lanzar:

`node server dev`

A nivel interno, la aplicación de servidor considerará el primer parámetro pasado como el entorno de trabajo (en este caso, `dev`). Esto facilitará en gran medida el desarrollo del front end.