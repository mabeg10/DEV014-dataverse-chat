# Interacción con Personajes de "Gilmore Girls"

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del Proyecto](#2-resumen-del-proyecto)
* [3. Consideraciones Generales](#3-consideraciones-generales)
* [4. Definición del Producto](#4-definición-del-producto)
* [5. Historias de Usuaria](#5-historias-de-usuaria)
* [6. Sketch y Diseño de la Interfaz de Usuaria](#6-sketch-y-diseño-de-la-interfaz-de-usuaria)
* [7. Problemas Detectados en Tests de Usabilidad](#7-problemas-detectados-en-tests-de-usabilidad)
* [8. Contacto](#8-contacto)


***

## 1. Preámbulo

En nuestro día a día, las aplicaciones web son como amigas inseparables. Desde las redes sociales hasta las herramientas de trabajo, las usamos todo el tiempo. Pero lo que hace que este momento sea realmente especial es que estas aplicaciones nos pueden abrir una puerta a algo asombroso: la interacción con inteligencia artificial.

¿Qué tal si pudiéramos conversar con alguien que vivió hace más de cien años o incluso con los personajes de nuestras series y películas favoritas? La inteligencia artificial nos puede ayudar a entender el pasado y a conectarnos con figuras históricas, así como a sumergirnos en mundos ficticios. Por ello, este proyecto toma a la serie ''Gilmore Girls'', debido a su popularidad e impacto en la cultura pop. 

## 2. Resumen del Proyecto

En este proyecto, se convirtió la aplicación desarrollada en Dataverse en una Single Page Application (SPA), manteniendo las funcionalidades de visualizar, filtrar, ordenar y calcular alguna estadística y agregando la posibilidad de interactuar con un personaje o todos ellos a través de un sistema de chat impulsado por la API de OpenAI.

### Objetivos Generales 
- Desarrollar una Single Page Application (SPA)
- Aplicar los conceptos de responsividad en el desarrollo de las vistas
- Implementar un router para la navegación entre las diferentes vistas de la aplicación
- Integrar una API externa
- Entender la asincronía en JavaScript
- Crear una suite de pruebas unitarias que permitan testear código asíncrono

## 3. Consideraciones Generales

- El rango de tiempo en el que se llevó a cabo el proyecto fue de 6 Sprints.
- La lógica del proyecto debe está implementada completamente en JavaScript (ES6+), HTML y CSS. 
- Se reutilizó ciertas partes del código del proyecto Dataverse.

## 4. Definición del Producto

Este proyecto permite a las usuarias interactuar con los personajes de la serie "Gilmore Girls" a través de una SPA. Los usuarios pueden:
- Visualizar, filtrar y ordenar personajes.
- Chatear con los personajes de forma individual y grupal utilizando un sistema de chat impulsado por la API de OpenAI.


## 5. Historias de Usuaria

1. **Como fan de "Gilmore Girls", quiero poder ver una lista de todos los personajes para recordar quiénes son.**
2. **Como usuaria, quiero poder filtrar los personajes por ciertos criterios (como nombre o rol) para encontrar rápidamente a quien busco.**
3. **Como usuaria, quiero ordenar los personajes alfabéticamente para una mejor navegación.**
4. **Como usuario, quiero poder chatear con los personajes para tener una experiencia interactiva y divertida.**

## 6. Sketch y Diseño de la Interfaz de Usuaria

# Prototipo de Baja Fidelidad
![Prototipo de Baja Fidelidad](src/imagen/prototipo_baja_fidelidad.jpeg)

### Prototipo de Alta Fidelidad
![Prototipo de Alta Fidelidad](src/imagen/prototipo_alta_fidelidad.png)


## 7. Problemas Detectados en Tests de Usabilidad

### Problema 1: Dificultad para Encontrar el Botón API Key
- **Descripción**: Los usuarios tuvieron problemas para encontrar el botón de API Key y lograr que la página funcionara correctamente.
- **Impacto**: Los usuarios no podían acceder a las funcionalidades del chat sin configurar la API Key, lo que limitaba el uso de la aplicación.
- **Frecuencia**: 6 de 10 usuarios reportaron este problema.
- **Posible Solución**: Hacer el botón de API Key más visible o proporcionar instrucciones claras sobre su uso.

### Problema 2: Dificultad para Decidir la Ubicación del API Key
- **Descripción**: Al inicio fue difícil decidir si dejar el API Key en un modal o en una vista separada.
- **Impacto**: La indecisión sobre la ubicación del API Key afectó la consistencia de la interfaz de usuario.
- **Frecuencia**: Este problema fue un desafío durante el desarrollo inicial.
- **Posible Solución**: Optar por una vista clara y coherente que facilite a los usuarios encontrar y configurar la API Key.
### Problema 3: Falta de Botón para Regresar a Home desde la Vista de API Key
- **Descripción**: En la vista de API Key no existe un botón que permita regresar a la página principal; los usuarios deben usar la flecha de retroceso del navegador.
- **Impacto**: Los usuarios encontraron confusa la navegación y tuvieron dificultades para regresar a la página principal.
- **Frecuencia**: 5 de 10 usuarios reportaron este problema.
- **Posible Solución**: Añadir un botón de "Home" en la vista de API Key para facilitar la navegación.

## 8. Contacto

Esta aplicación fue desarrollada por María Belén Guzmán. Contacto: mbguzman.099@gmail.com