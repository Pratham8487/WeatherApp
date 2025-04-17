import { useEffect, useState } from "react";
import { useWeatherByCoordinates } from "../../api/useWeatherData";
import {
  CloudIcon,
  CompassIcon,
  DropletIcon,
  GaugeIcon,
  SunIcon,
  WindIcon,
} from "lucide-react";
import {
  HourlyForecast,
  WeeklyForecast,
} from "../../components/common/Forecast";

export default function DashboardPage() {
  const [Coor, setCoor] = useState<{ lat: number; lon: number }>({
    lat: 40.712776,
    lon: -74.005974,
  });

  // const [monthlyForecast, setMonthlyForecast] = useState<any>(false);
  const [inputLat, setInputLat] = useState<string>(Coor.lat.toString());
  const [inputLon, setInputLon] = useState<string>(Coor.lon.toString());


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCoor({ lat, lon });
        setInputLat(lat.toString());
        setInputLon(lon.toString());
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
  // console.log("forecast", forecast);

  if (!weather || !forecast || weatherLoading || forecastLoading) return null;
  if (weatherError || forecastError) return <div>Error loading data.</div>;

  function handleCoordinateSubmit() {
    const lat = parseFloat(inputLat);
    const lon = parseFloat(inputLon);
    if (!isNaN(lat) && !isNaN(lon)) {
      setCoor({ lat, lon });
    }
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleCoordinateSubmit();
    }
  }

  function getCurrentDate(): string {
    return new Date().toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function formatTime(seconds: number): string {
    return new Date(seconds * 1000).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <div className="px-32 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-end justify-center mb-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="lat" className="text-sm font-medium text-gray-600">
            Latitude
          </label>
          <input
            type="number"
            value={inputLat}
            onChange={(e) => setInputLat(e.target.value)}
            className="p-2 rounded border w-40"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="lon" className="text-sm font-medium text-gray-600">
            Longitude
          </label>
          <input
            type="number"
            value={inputLon}
            onChange={(e) => setInputLon(e.target.value)}
            className="p-2 rounded border w-40"
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          onClick={handleCoordinateSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      <div className="max-w-7xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Weather Overview
            </h1>
            <p className="text-gray-500 text-sm">{getCurrentDate()}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold text-gray-700">
              {weather.name}
            </h2>
            <p className="text-sm text-gray-500">
              Visibility: {(weather.visibility / 1000).toFixed(1)} km
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-6xl font-bold text-blue-600">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="text-lg capitalize text-gray-600 mt-1">
              {weather.weather[0].description}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Feels like {Math.round(weather.main.feels_like)}°C • Wind{" "}
              {weather.wind.speed} m/s
            </p>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
            className="w-28 h-28"
          />
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">Air</h3>
            <p>
              <WindIcon className="inline mr-2" /> Wind: {weather.wind.speed}{" "}
              m/s
            </p>
            <p>
              <CompassIcon className="inline mr-2" /> Direction:{" "}
              {weather.wind.deg}°
            </p>
            <p>
              <GaugeIcon className="inline mr-2" /> Gust:{" "}
              {weather.wind.gust ?? "N/A"} m/s
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">Atmosphere</h3>
            <p>
              <CloudIcon className="inline mr-2" /> Clouds: {weather.clouds.all}
              %
            </p>
            <p>
              <GaugeIcon className="inline mr-2" /> Pressure:{" "}
              {weather.main.pressure} hPa
            </p>
            <p>
              <DropletIcon className="inline mr-2" /> Humidity:{" "}
              {weather.main.humidity}%
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">Comfort</h3>
            <p>
              <SunIcon className="inline mr-2" /> Feels Like:{" "}
              {Math.round(weather.main.feels_like)}°C
            </p>
            <p>
              <DropletIcon className="inline mr-2" /> Dew Point:{" "}
              {Math.round(
                weather.main.temp - (100 - weather.main.humidity) / 5
              )}
              °C
            </p>
            <p>
              <SunIcon className="inline mr-2" /> UV Index:{" "}
              {Math.round(10 - weather.clouds.all / 10)}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-6 font-medium text-gray-600 text-lg">
          <p>Sunrise: {formatTime(weather.sys.sunrise)}</p>
          <p>Sunset: {formatTime(weather.sys.sunset)}</p>
        </div>
        <HourlyForecast forecastList={forecast.list} />
        <WeeklyForecast forecast={forecast} monthly={false} />
      </div>
    </div>
  );
}
