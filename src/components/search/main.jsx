import React, { useState, useEffect } from "react"; // Cambiado aquí
import FirstPart from "./firstpart";

export default function Main({ city, province }) {
  const [status, setStatus] = useState(200);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState([]);
  const [geoposition, setGeoposition] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        );
        const resultado = await data.json();

        // Ver el resultado en consola para inspeccionar la estructura
        console.log(resultado);

        if (data && data.status === 200 && resultado.results) {
          const filtrarporprovinciaYpueblo = () => {
            const resultadofinal = resultado.results.filter((item) => {
              const nombre = item.name?.toLowerCase();
              const provincia = item.admin1?.toLowerCase();
              const admin2 = item.admin2?.toLowerCase();
              const admin3 = item.admin3?.toLowerCase();
              const cityLower = city.toLowerCase();
              const provinceLower = province.toLowerCase();

              // Si admin3 existe y coincide, OK
              if (admin3 && admin3 === cityLower) {
                return true;
              }

              // Si admin2 coincide con provincia pero admin1 no, y nombre coincide
              if (provincia !== provinceLower) {
                if (admin2 === provinceLower && nombre === cityLower) {
                  return true;
                }
              } else {
                // admin1 coincide con provincia y nombre también
                return nombre === cityLower && provincia === provinceLower;
              }

              return false;
            });

            return resultadofinal;
          };

          const res = filtrarporprovinciaYpueblo(); // Filtramos por provincia y pueblo

          if (res && res.length !== 0) {
            setGeoposition(res[0]); // Solo actualizamos el estado si hay resultados
            try {
              const { latitude, longitude } = res[0]; // Usamos la primera posición
              const weatherData = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_min,temperature_2m_max,precipitation_sum,weathercode,sunrise,sunset,uv_index_max,shortwave_radiation_sum&hourly=temperature_2m,wind_speed_10m,precipitation,weathercode&timezone=auto`
              );

              const weatherResultado = await weatherData.json();

              if (
                weatherData &&
                weatherData.status === 200 &&
                weatherResultado
              ) {
                setWeather(weatherResultado); // Si la petición es correcta, actualizamos el clima
                setStatus(200);
              } else {
                setStatus(500); // Si no hay datos de clima disponibles
              }
            } catch (e) {
              setStatus(500); // Error en la solicitud de clima
            }
          } else {
            setStatus(500); // Si no se encuentra la ciudad/provincia/pueblo
          }
        } else {
          setStatus(500); // Si no se recibe respuesta correcta de la API de geocoding
        }

        setLoading(false);
      } catch (error) {
        console.error(error); // Ver error en consola
        setStatus(500); // Si hubo un error en la solicitud
        setLoading(false);
      }
    };

    fetchdata();
  }, [city, province]); // Dependencias agregadas para hacer el fetch cuando city o province cambian

  if (loading === true) {
    return (
      <div className="flex flex-col items-center w-full h-full">
        <div className="mt-[300px] h-10 w-10 bg-neutral-800 rounded-full animate-bounce"></div>
        <h1 className="mt-2 text-2xl">Fetching data...</h1>
        <p>Please wait</p>
      </div>
    );
  } else if (status === 200) {
    return (
      <div className="flex flex-col items-center w-full h-full">
        <div className="md:w-[600px] flex flex-col items-center rounded-[15px] w-[90%]  mt-10 min-h-auto md:min-h-auto bg-neutral-200">
          <h1 className="font-extrabold text-2xl mt-4 text-center">
            {geoposition.admin2 === geoposition.name ? (
              <>
                {geoposition.admin2} | {geoposition.admin1}
              </>
            ) : (
              <>
                {geoposition.admin3} | {geoposition.admin1}
              </>
            )}
          </h1>
          <h2 className="text-center">
            {geoposition.country} | {weather.timezone} Alture:{" "}
            {weather.elevation}m
          </h2>
        
          <FirstPart weather={weather} geoposition={geoposition} />
        </div>
        <p className="text-center max-w-[700px] mt-[400px]">
          Image used are: joypixels: MIT License:
          https://www.svgrepo.com/svg/402758/sun, Repositorio SVG: MIT / CC0
          License: https://www.svgrepo.com/svg/326775/rainy-outline, SVG Repo:
          CC0 License: https://www.svgrepo.com/svg/38662/hail-storm, SVG Repo:
          LICENSE: CC0 License: https://www.svgrepo.com/svg/131811/storm.
        </p>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center w-full h-full">
        <h1 className="mt-32 font-bold text-3xl">City not found</h1>
        <h1 className="text-2xl mt-2 bg-neutral-800 text-white p-2">{city}</h1>
        <h1 className="text-2xl mt-2">{province}</h1>
        <p>Try adding the province if it's not already added.</p>
        <p className="text-center w-[200px]">{JSON.stringify(geoposition)}</p>
      </div>
    );
  }
}

