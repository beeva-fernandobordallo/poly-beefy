![alt text](/static/horizontal-beeva-logo.png "BEEVA")

## Portal de Formación Externa

Este proyecto nace con el objetivo de poner a disposición de los empleados de Beeva un catálogo de formaciones de interés para la empresa. En el se recogerán:
- Descripción de cursos
- Organos que lo imparten
- Fechas
- Costes
- Información adicional de interés

Adicionalmente se ofrecerá la posibilidad de que los empleados:
- Muestren interés por atender a un curso
- Den feedback de la calidad de los cursos
- Aporten información sobre cursos que no están en el catálogo y pueden ser de interés para Beeva


### Requisitos mínimos

- Login requerido y solo permitido a empleados de beeva (@beeva.com)
- 2 Roles:
	- Empleado / Alumno
	- Gestor de cursos
- CRUD Cursos
- Catálogo de cursos
- Buzón de sugerencias / feedback
- Por parte del Empleado / Alumno, capacidad para mostrar interés por un curso
- Por parte del Gestor, capacidad de 'admisión' / confirmación de alumnos para un curso


### Tecnologías

- Back: Node.js, Express.js, MongoDB
- Front: Polymer
- Auth: Passport / JWT