export function getTemperatureInfoToday({ fecha, weather }) {
  const horasConFecha = weather.hourly.time
    .map((hora, indice) => {
      if (hora.startsWith(fecha)) {
        const temperatura = weather.hourly.temperature_2m[indice];
        const windspeen = weather.hourly.wind_speed_10m[indice];
        const precipitation = weather.hourly.precipitation[indice];
        const weathercode = weather.hourly.weathercode[indice];

        return [
          indice,
          hora,
          temperatura,
          windspeen,
          precipitation,
          weathercode,
        ];
      }
      return null;
    })
    .filter(Boolean); // Quita los null

  if (horasConFecha.length === 0) {
    console.error("Error en la fecha: No se encontraron horas.");
  }

  return horasConFecha;
}
