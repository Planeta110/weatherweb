import { useEffect, useState } from "react";
import { getMaxMinToday } from "../func/getMaxMinToday";
import NextHourPretipition from "./nexthourprepitition";
import NextDaysPretipition from "./nextdaysprepitition";

export default function FirstPart({ weather, geoposition }) {
  const [wmoCode, setWmoCode] = useState([]);
  const [minmax, setMinmax] = useState([]);
  const [sunornight, setSunornight] = useState([]);
  const [hours, setHour] = useState();
  useEffect(() => {
    const loadWeatherData = async () => {
      const response = await fetch("/wmo_code.json");
      const weatherData = await response.json();
      const restultadfinalcodecorrespondiante = await weatherData[
        weather.current_weather.weathercode
      ];
      console.log("Weather" + JSON.stringify(weather));
      setWmoCode(await restultadfinalcodecorrespondiante);
    };
    // Llamar a la función para cargar los datos
    loadWeatherData();
    const setsunornight = async () => {
      const response = await fetch("/isday.json");
      const finalresponse = await response.json();
      setSunornight(await finalresponse[weather.current_weather.is_day]);
    };
    setsunornight();

    const today = new Date();

    const year = today.getFullYear();
    let month = today.getMonth() + 1; // Los meses en JavaScript empiezan desde 0
    let day = today.getDate();
    const hour = today.getHours();
    setHour(hour);

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    const formateddate = `${year}-${month}-${day}`;

    setMinmax(getMaxMinToday({ fecha: formateddate, weather: weather }));
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <img
        src={`/${wmoCode[1]}`}
        alt={`/${wmoCode[0]}`}
        className="h-[150px] text-white w-[150px] md:h-[230px] md:w-[230px] mt-3"
      />
      <h1 className="text-3xl mt-4 text-center max-w-[500px]">{wmoCode[0]}</h1>
      <h2 className="text-2xl mt-1 text-center max-w-[500px] font-extrabold ">
        {weather.current_weather.temperature} °C
      </h2>
      <h2 className="text-2xl text-center">
        Min: {minmax[1]} °C Max: {minmax[0]} °C
      </h2>
      <h2 className="text-2xl mt-1 text-center max-w-[500px]">
        Wind: {weather.current_weather.windspeed} Km/h
      </h2>
      <h2>Total fall water: {minmax[2]} mm </h2>
      <div className="flex flex-row items-center cursor-pointer hover:scale-105 transition-all p-3 mt-4 bg-neutral-100 rounded-[15px]">
        <h2 className="text-1xl">Is it day :</h2>
        <img src={`/${sunornight[1]}`} className="h-12 w-12 ml-4" alt={`/${sunornight[0]}`} />
      </div>

      <div className="p-3 md:p-10 w-full">
        <h1>Today</h1>
        <NextHourPretipition hour={hours} weather={weather} />
        <h1 className="mt-4">This week</h1>
        <NextDaysPretipition weather={weather} />
      </div>

      <h2 className="text-1xl mt-1 text-center max-w-[500px] pb-5">
        Last data fetched: {weather.current_weather.time}
      </h2>
    </div>
  );
}
