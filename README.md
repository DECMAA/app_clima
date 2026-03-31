# 🌤️ ClimaSur - App de Clima (SPA)

Bienvenido a **ClimaSur**, una aplicación de una sola página (SPA) desarrollada con **Vue.js**. Esta plataforma permite consultar el clima en tiempo real de las principales capitales de Latinoamérica, ofreciendo una experiencia interactiva y personalizada.
🚀 Demo en vivo:https://app-clima-six-rho.vercel.app/
## 🚀 Propósito del Proyecto
[cite_start]El objetivo principal es recrear una interfaz reactiva que gestione datos meteorológicos mediante una API externa, organizando la navegación de forma interna sin recargas de página y manejando un sistema de usuarios global[cite: 106, 107].

## 🔑 Credenciales de Acceso (Para Pruebas)
Para probar las funciones de inicio de sesión y rutas protegidas, utilice los siguientes datos:
* **Usuario:** `admin@climasur.com`
* **Contraseña:** `123`

## 🛠️ Tecnologías Utilizadas
* **Vue.js 3**: Framework principal para la interfaz.
* [cite_start]**Vue Router**: Para la navegación entre vistas (Home, Detalle, Login)[cite: 112, 179].
* [cite_start]**Vuex**: Gestión del estado global (Autenticación y Preferencias)[cite: 110, 161].
* **Axios**: Consumo de la API de OpenWeather.
* **Bootstrap**: Estilos y diseño responsivo.

## 📱 Vistas Principales
1. [cite_start]**Home (`/`)**: Listado de lugares con su clima actual y buscador dinámico[cite: 16, 18].
2. [cite_start]**Detalle de lugar (`/detalle/:ciudad`)**: Información ampliada, pronóstico y estadísticas calculadas[cite: 16, 19, 39].
3. [cite_start]**Login (`/login`)**: Formulario de acceso para usuarios registrados[cite: 120, 137].
4. [cite_start]**Favoritos (`/favoritos`)**: Sección protegida que requiere inicio de sesión[cite: 158].

## 🔐 Sistema de Usuarios y Personalización
La aplicación cuenta con un sistema de autenticación que almacena en **Vuex**:
* [cite_start]**Datos guardados**: Nombre del usuario, email y lista de ciudades favoritas[cite: 165].
* [cite_start]**Preferencias**: El sistema recuerda si el usuario prefiere ver la temperatura en Celsius (°C) o Fahrenheit (°F)[cite: 155].
* [cite_start]**Protección**: La ruta de Favoritos está restringida; si no hay sesión activa, el sistema redirige automáticamente al Login[cite: 159, 182].

## ⚙️ Instrucciones de Ejecución
Para correr este proyecto localmente, sigue estos pasos:

1. Clona el repositorio: `git clone [https://github.com/DECMAA/app_clima]`
2. Instala las dependencias: `npm install`
3. Crea un archivo `.env` con tu `VITE_API_KEY` de OpenWeather.
4. [cite_start]Inicia el servidor de desarrollo: `npm run dev`[cite: 92].

---
Desarrollado por **Denisse Maturana** - Estudiante de Frontend Academy.