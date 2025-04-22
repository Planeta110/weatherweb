import { useEffect, useState } from "react";

export default function Nextdaysminicomponent({
  dia,
  sunrise,
  weathercode,
  precipitation_sum,
  min,
  max,
  sunset,
  uv_index_max,
  shortwave_radiation_sum,
  indice,
}) {
  const diaFormateado = dia.slice(5, 10); // ✅

  const [wmoCode, setWmoCode] = useState([]);
  useEffect(() => {
    const loadWeatherData = async () => {
      const response = await fetch("/wmo_code.json");
      const weatherData = await response.json();
      const restultadfinalcodecorrespondiante = weatherData[weathercode];

      setWmoCode(await restultadfinalcodecorrespondiante);
    };
    // Llamar a la función para cargar los datos
    loadWeatherData();
  }, []);

  if (indice !== 0) {
    return (
      <div className="h-full  transition-all hover:scale-105 w-[120px] flex flex-col items-center text-black rounded-[5px] p-1 bg-neutral-50 ">
        <h1  className="font-bold">{diaFormateado}</h1>
        <img
          className="h-[40px] mt-1"
          alt={wmoCode[0]}
          src={`/${wmoCode[1]}`}
        />
        <h1>Min: {min}</h1>
        <h1>Max: {max}</h1>
        <h1 className="text-center">Precipi: {precipitation_sum} mm</h1>
        <h1 className="text-center mt-1">Sunrise: {sunrise.slice(11)}</h1>
        <h1 className="text-center mt-1">Sunset: {sunset.slice(11)}</h1>
        <h1 className="text-center">UV MAX:</h1>
        <h1 className="text-center">{uv_index_max}</h1>
        <h1 className="text-center">Short wave sum Radiation:</h1>
        <h1 className="text-center">{shortwave_radiation_sum}</h1>
      </div>
    );
  } else {
    return (
      <div className="h-full  transition-all hover:scale-105 w-[120px] flex flex-col items-center text-white border-2 border-white rounded-[5px] p-1 bg-sky-600">
        <h1 className="text-2xl">Today</h1>
        <h1 className="font-bold"> {diaFormateado}</h1>
        <img
          className="h-[40px] mt-1"
          alt={wmoCode[0]}
          src={`/${wmoCode[1]}`}
        />
        <h1>Min: {min}</h1>
        <h1>Max: {max}</h1>
        <h1 className="text-center">Precipi: {precipitation_sum} mm</h1>
        <h1 className="text-center mt-1">Sunrise: {sunrise.slice(11)}</h1>
        <h1 className="text-center mt-1">Sunset: {sunset.slice(11)}</h1>
        <h1 className="text-center">UV MAX:</h1>
        <h1 className="text-center">{uv_index_max}</h1>
        <h1 className="text-center">Short wave sum Radiation:</h1>
        <h1 className="text-center">{shortwave_radiation_sum}</h1>
      </div>
    );
  }
}
