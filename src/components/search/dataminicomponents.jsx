import { useEffect, useState } from "react";

export default function Dataminicomponent({
  hour,
  hora,
  indice,
  windspeen,
  temperatura,
  weathercode,
  precipitation,
}) {
  const horafinal = hora.slice(11);
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

  if (hour === Number(hora.slice(11, 13))) {
    return (
      <div className="h-full transition-all hover:scale-105 w-[90px] flex flex-col items-center text-white border-2 border-white rounded-[5px] p-1 bg-sky-600 ">
        <h1 className="text-[20px] text-center">{horafinal}</h1>
        <img className="h-[40px]" alt={wmoCode[0]} src={`/${wmoCode[1]}`} />
        <h1 className="text-center">{temperatura} °C</h1>
        <h2 className="text-center">Preci..{precipitation}</h2>
        <h2>{windspeen} Km/h</h2>
      </div>
    );
  } else {
    return (
      <div className="h-full transition-all hover:scale-105 w-[90px] flex flex-col items-center text-black rounded-[5px] p-1 bg-neutral-50 ">
        <h1 className="text-[20px] text-center">{horafinal}</h1>
        <img className="h-[40px]" alt={wmoCode[0]} src={`/${wmoCode[1]}`} />
        <h1 className="text-center">{temperatura} °C</h1>
        <h2 className="text-center">Preci..{precipitation}</h2>
        <h2>{windspeen} Km/h</h2>
      </div>
    );
  }
}
