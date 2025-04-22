export function getMaxMinToday({ fecha, weather }) {
    const indicedelafecha = weather.daily.time.indexOf(fecha);
  
    if (indicedelafecha !== -1) {
      const maxtemerature = weather.daily.temperature_2m_max[indicedelafecha];
      const mintemperature = weather.daily.temperature_2m_min[indicedelafecha];
      const prepitition = weather.daily.precipitation_sum[indicedelafecha];
      return [maxtemerature, mintemperature, prepitition];
    } else {
      console.error("Error en la fecha");
    }
 
  }
  