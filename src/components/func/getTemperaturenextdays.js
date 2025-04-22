export function getTemperatureNextDays({ weather, fechas }) {
  const resultado = fechas.map((item) => {
    const indice = weather.daily.time.indexOf(item);
    const weathercode = weather.daily.weathercode[indice];
    const precipitation_sum = weather.daily.precipitation_sum[indice];
    const temperature_2m_min = weather.daily.temperature_2m_min[indice];
    const temperature_2m_max = weather.daily.temperature_2m_max[indice];
    const sunrise = weather.daily.sunrise[indice];
    const sunset = weather.daily.sunset[indice];
    const uv_index_max = weather.daily.uv_index_max[indice];
    const shortwave_radiation_sum =
      weather.daily.shortwave_radiation_sum[indice];
    return [
      indice,
      item,
      weathercode,
      precipitation_sum,
      temperature_2m_min,
      temperature_2m_max,
      sunrise,
      sunset,
      uv_index_max,
      shortwave_radiation_sum,
    ];
  });
  return resultado;
}
