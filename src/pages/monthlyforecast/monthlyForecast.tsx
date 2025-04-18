import { WeeklyForecast } from "../../components/common/Forecast";
import { useWeatherByCoordinates } from "../../api/useWeatherData";

import { useState, useEffect } from "react";
function monthlyForecast() {
  const [Coor, setCoor] = useState<{ lat: number; lon: number }>({
    lat: 40.712776,
    lon: -74.005974,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCoor({ lat, lon });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  const {
    weather,
    weatherLoading,
    weatherError,
    forecast,
    forecastLoading,
    forecastError,
  } = useWeatherByCoordinates(Coor.lat, Coor.lon);
  

  if (!weather || !forecast || weatherLoading || forecastLoading) return null;
  if (weatherError || forecastError) return <div>Error loading data.</div>;
  return (
    <div>
      <WeeklyForecast forecast={forecast} monthly={true} />
    </div>
  );
}

export default monthlyForecast;
