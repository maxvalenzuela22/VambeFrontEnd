# URL: https://vambe-front-end.vercel.app/
# Instrucciones para ejecutar el Frontend localmente

Este documento proporciona los pasos necesarios para ejecutar el frontend de la aplicación en tu entorno local.

## 1. Configuración del archivo `.env`
Para que la aplicación funcione correctamente, es necesario crear un archivo `.env` en la raíz del proyecto con la siguiente información:

```env
VITE_BACKEND_URL=http://localhost:3000
```

## 2.Instalación de dependencias
A continuación, ejecuta los siguientes comandos en tu terminal para instalar las dependencias necesarias:

```
nvm use 22.14  # Establece la versión de Node.js a 22.14
nvm install --latest-npm  # Instala la última versión de npm
npm install  # Instala todas las dependencias del proyecto
```

## 3. Iniciar el servidor
Una vez que las dependencias estén instaladas puedes iniciar el servidor ejecutando:

```
npm run dev -- --port 4000
```
