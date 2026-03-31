// Cumpliendo requisito: Implementar al menos una clase principal [cite: 146, 147]
export class WeatherApp {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.urlBase = "https://api.openweathermap.org/data/2.5/";
  }

  // Método asíncrono con fetch y async/await [cite: 165, 170]
  async obtenerClima(ciudad) {
    try {
      const response = await fetch(`${this.urlBase}weather?q=${ciudad}&appid=${this.apiKey}&units=metric&lang=es`);
      if (!response.ok) throw new Error("Error al cargar los datos"); // Manejo de error simple [cite: 178, 179]
      return await response.json();
    } catch (error) {
      console.error("Error en API:", error);
      throw error;
    }
  }

  // Función para calcular estadísticas a partir del pronóstico [cite: 156, 175]
  calcularEstadisticas(pronosticoSemanal) {
    // Lógica para calcular min, max y promedio [cite: 136, 156]
    const temps = pronosticoSemanal.map(dia => dia.main.temp);
    const suma = temps.reduce((a, b) => a + b, 0);
    const promedio = suma / temps.length;

    return {
      max: Math.max(...temps).toFixed(1),
      min: Math.min(...temps).toFixed(1),
      promedio: promedio.toFixed(1)
    };
  }
}
