import Nextdaysminicomponent from "./nextdaysminicomponents.jsx"

import { useEffect, useState } from "react";
import { getTemperatureNextDays } from "../func/getTemperaturenextdays";

export default function NextDaysPretipition({ weather }) {
  const [resultado, setResultado] = useState([]);
  useEffect(() => {

    setResultado(
        getTemperatureNextDays({weather: weather, fechas: weather.daily.time})
    );
    
  }, []);
  return (
    <div className="h-auto bg-neutral-300 rounded-[10px] p-2 flex items-center max-w-[100%] overflow-x-auto mt-1">
      <div className="flex flex-row gap-4 w-max p-1 h-full">
        {resultado.map((item, key) => (
          <Nextdaysminicomponent indice={item[0]} shortwave_radiation_sum={item[9]} uv_index_max={item[8]} sunset={item[7]} sunrise={item[6]} dia={item[1]} weathercode={item[2]} min={item[4]} max={item[5]} precipitation_sum={item[3]}/>
        ))}
      </div>
    </div>
  );
}
