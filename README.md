# 🌤️ CliamSur - App del Clima de Latinoamérica

Aplicación web desarrollada en Vue 3 (Vite) para consultar el clima actual y el pronóstico extendido de las principales ciudades de Latinoamérica. 

**Enlace al repositorio público:** [🔗 Haz clic aquí para ver el repositorio en GitHub](https://github.com/DECMAA/app_clima.git)


---

## ⚙️ Instrucciones de Ejecución Local

Para correr este proyecto en tu máquina, sigue estos pasos:

### 1. Requisitos Previos
* Tener instalado **Node.js**.
* Tener instalado el gestor de paquetes **npm**.

### 2. Configuración de Variables de Entorno (.env)
Este proyecto consume la API de OpenWeatherMap, por lo que requiere una clave API.
1. Crea un archivo llamado `.env` en la raíz del proyecto.
2. Agrega tu clave de la siguiente manera:
   `VITE_API_KEY=tu_clave_api_aqui`

### 3. Pasos Básicos de Instalación
Abre tu terminal, ubícate en la carpeta del proyecto y ejecuta:

1. Instalar las dependencias:
   `npm install`
2. Iniciar el servidor de desarrollo:
   `npm run dev`

---

## 🗺️ Rutas Principales de la App

El proyecto utiliza **Vue Router** para la navegación SPA:
* **`/` (Home):** Pantalla principal con el listado de ciudades de Latinoamérica y buscador.
* **`/detalle/:ciudad` (Detalles):** Ruta dinámica con información ampliada (Humedad, Sensación Térmica) y pronóstico de 5 días.

---

## ✨ Funcionalidades Clave

* **Consumo de API:** Integración con OpenWeatherMap usando **Axios**.
* **Manejo de Estado Centralizado:** Uso de **Vuex** para almacenar datos, estado de carga y errores.
* **Preferencias Básicas:** Cambio dinámico entre **°C y °F** sin recargar la API.
* **Manejo de Errores:** Validaciones en el buscador y feedback visual si la ciudad no es válida.
* **Diseño:** Interfaz responsiva con **Bootstrap 5**, íconos y banner de bienvenida.