import { CloudSun, Waves, Wind } from "lucide-react";
import React from "react";

interface HourlyForecastProps {
  forecastList: any[];
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({
  forecastList,
}) => {
  return (
    <div className="mt-6">
      <h2 className="text-3xl font-bold text-gray-800">Hourly Forecast</h2>
      <div className="overflow-x-auto flex gap-4 mt-4 pb-2 scrollbar-hide justify-evenly">
        {forecastList.slice(0, 9).map((hour, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-b from-[#00c6ff] to-[#0072ff] text-white bg-opacity-80 min-w-[6.25rem] backdrop-blur-md rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center transition hover:scale-105 duration-300"
          >
            <p className="text-sm text-white font-semibold">
              {new Date(hour.dt * 1000).getHours()}:00
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
              alt={hour.weather[0].main}
              className="w-10 h-10 mx-auto"
            />
            <p className="font-bold">{Math.round(hour.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface WeatherItem {
  dt: number;
  main: {
    temp_max: number;
    temp_min: number;
    pressure: number;
    humidity: number;
    feels_like: number;
    name: string;
    country: string;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
}

interface Forecast {
  city: any;
  list: WeatherItem[];
}

export const WeeklyForecast: React.FC<{ forecast: Forecast, monthly: boolean }> = ({
  forecast,
  monthly,
}) => {
  const getDailyForecasts = () => {
    if (!forecast?.list) return [];

    return forecast?.list?.map((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      return {
        date,
        day: date,
        month: new Date(item.dt * 1000).getDate(),
        maxTemp: item.main.temp_max,
        minTemp: item.main.temp_min,
        normalTemp: Math.round(item.main.feels_like),
        itemName: item.main.name,
        itemCountry: item.main.country,
        weather: item.weather[0],
        description: item.weather[0].description,
      };
    });
  };

  const dailyForecasts = monthly ? getDailyForecasts().slice(0, 30) : getDailyForecasts().slice(0, 7);

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Weekly Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {/* <div className="overflow-x-auto flex gap-4 mt-4 pb-2 scrollbar-hide justify-evenly"> */}
        {dailyForecasts?.map((day, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center transition hover:scale-105 duration-300"
          >
            <p className="font-semibold text-white text-sm">
              {idx === 0
                ? "Today"
                : new Date(day.date).toLocaleDateString(undefined, {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
            </p>

            <CloudSun className="w-12 h-12 my-2" />

            <p className="text-2xl font-semibold">
              {day.normalTemp}°C
              <br />
              {day.itemName}
            </p>
            <p className="text-white text-sm capitalize">{day.description}</p>

            <div className="flex justify-between items-center w-full mt-4 px-2 text-sm">
              <div className="flex items-center gap-1">
                <Waves className="w-4 h-4" />
                <span>{Math.floor(Math.random() * 100)}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="w-4 h-4" />
                <span>{(Math.random() * 20 + 5).toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
