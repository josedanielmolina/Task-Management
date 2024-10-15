# Task Management- Proyecto Angular 18 con JSON Server

Esta aplicación de Task Management está desarrollada con Angular 18 y utiliza JSON Server como backend simulado. Ha sido creada como parte de una prueba técnica para un proceso de selección.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente antes de comenzar:

- Node.js (versión 18 o superior)
- npm (generalmente viene con Node.js)
- Angular CLI (versión 18)

## Instalación

1. Clona este repositorio:
   ```
   git clone https://github.com/josedanielmolina/Task-Management.git
   ```

2. Navega hasta el directorio del proyecto:
   ```
   cd task-management
   ```

3. Instala las dependencias, incluyendo JSON Server:
   ```
   npm install
   npm install json-server --save-dev
   ```

## Configuración de JSON Server

Este proyecto utiliza JSON Server para simular una API REST. Los datos se encuentran en el archivo `db.json` en la raíz del proyecto.

Para iniciar JSON Server:

```
npm run database
```

Esto iniciará el servidor en `http://localhost:3000`.

## Desarrollo

Para iniciar el servidor de desarrollo de Angular:

```
ng serve
```

Navega a `http://localhost:4200/` en tu navegador. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Compilación

Para compilar el proyecto para producción:

```
ng build
```

Los artefactos de compilación se almacenarán en el directorio `dist/`.

## Pruebas

Para ejecutar pruebas unitarias:
```
ng test
```

## Tecnologías Utilizadas

- Angular 18
- TypeScript
- JSON Server
- RxJS
- Bootstrap 5

## Autor

Jose Daniel Molina
