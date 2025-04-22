import Dataminicomponent from "./dataminicomponents";
import { getTemperatureInfoToday } from "../func/getTemperatureetinfoDay";
import { useEffect, useState } from "react";

export default function NextHourPretipition({ weather, hour }) {
  const [resultado, setResultado] = useState([]);
  useEffect(() => {
    const today = new Date();

    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    const formateddate = `${year}-${month}-${day}`;

    setResultado(
      getTemperatureInfoToday({ fecha: formateddate, weather: weather })
    );
  }, []);
  return (
    <div className="h-50 bg-neutral-300 rounded-[10px] p-2 flex items-center max-w-[100%] overflow-x-auto mt-1">
      <div className="flex flex-row gap-4 w-max p-1 h-full">
        {resultado.map((item, key) => (
          <Dataminicomponent
          hour={hour}
            key={key}
            hora={item[1]}
            windspeen={item[3]}
            precipitation={item[4]}
            indice={item[0]}
            weathercode={item[5]}
            temperatura={item[2]}
          />
        ))}
      </div>
    </div>
  );
}
