// import { Cloud, Gauge, Waves, Wind } from "lucide-react";
// import React from "react";

// interface HourlyForecastProps {
//   forecastList: any[];
// }

// export const HourlyForecast: React.FC<HourlyForecastProps> = ({
//   forecastList,
// }) => {
//   return (
//     <div className="mt-6">
//       <h2 className="text-3xl font-bold text-gray-800">Hourly Forecast</h2>
//       <div className="overflow-x-auto flex gap-4 mt-4 pb-2 scrollbar-hide justify-evenly">
//         {forecastList.slice(0, 9).map((hour, idx) => (
//           <div
//             key={idx}
//             className="bg-gradient-to-b from-[#00c6ff] to-[#0072ff] text-white bg-opacity-80 min-w-[6.25rem] backdrop-blur-md rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center transition hover:scale-105 duration-300"
//           >
//             <p className="text-sm text-white font-semibold">
//               {new Date(hour.dt * 1000).getHours()}:00
//             </p>
//             <img
//               src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
//               alt={hour.weather[0].main}
//               className="w-10 h-10 mx-auto"
//             />
//             <p className="font-bold">{Math.round(hour.main.temp)}°C</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// interface WeatherItem {
//   dt: number;
//   main: {
//     temp_max: number;
//     temp_min: number;
//     pressure: number;
//     humidity: number;
//     feels_like: number;
//     name: string;
//     country: string;
//   };
//   weather: {
//     description: string;
//     icon: string;
//     main: string;
//   }[];
//   wind: {
//     speed: number;
//     deg: number;
//     gust: number;
//   };
//   clouds: {
//     all: number;
//   };
//   visibility: number;
// }

// interface Forecast {
//   city: any;
//   list: WeatherItem[];
// }

// export const WeeklyForecast: React.FC<{
//   forecast: Forecast;
//   monthly: boolean;
// }> = ({ forecast, monthly }) => {
//   const getDailyForecasts = () => {
//     if (!forecast?.list) return [];

//     return forecast?.list?.map((item) => {
//       const date = new Date(item.dt * 1000).toDateString();
//       return {
//         date,
//         day: date,
//         month: new Date(item.dt * 1000).getDate(),
//         maxTemp: item.main.temp_max,
//         minTemp: item.main.temp_min,
//         normalTemp: Math.round(item.main.feels_like),
//         itemName: item.main.name,
//         itemCountry: item.main.country,
//         weather: item.weather[0],
//         description: item.weather[0].description,
//         icon: item.weather[0].icon,
//         visibility: item.visibility,
//         clouds: item.clouds.all,
//         windSpeed: item.wind.speed,
//         gustSpeed: item.wind.gust,
//         windDeg: item.wind.deg,
//         humidity: item.main.humidity,
//         pressure: item.main.pressure,
//       };
//     });
//   };

//   const formatVisibility = (meter: number) => {
//     const miles = meter / 1609.34;
//     return miles.toFixed(2) + " mi";
//   };

//   const dailyForecasts = monthly
//     ? getDailyForecasts().slice(0, 30)
//     : getDailyForecasts().slice(0, 7);

//   return (
//     <div className="mt-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-4">Weekly Forecast</h2>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-0 gap-12">
//         {dailyForecasts?.map((day, idx) => (
//           <div
//             key={idx}
//             className="bg-gradient-to-br from-gray-50 to-gray-100 text-black rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center transition hover:scale-105 duration-300"
//           >
//             <p className="font-semibold text-black text-sm">
//               {idx === 0
//                 ? "Today"
//                 : new Date(day.date).toLocaleDateString(undefined, {
//                     weekday: "short",
//                     day: "numeric",
//                     month: "short",
//                   })}
//             </p>
//             <img
//               src={`https://openweathermap.org/img/wn/${day.icon}.png`}
//               alt={day.description}
//               className="w-16 h-16 my-2"
//             />
//             <p className="text-2xl font-semibold">
//               {day.normalTemp}°C
//               <br />
//               {day.itemName}
//             </p>
//             <p className="text-white text-sm capitalize">{day.description}</p>
//             <div className="w-full mt-4 px-2 text-sm">
//               <div className="flex items-start gap-5 justify-between p-3">
//                 <div className="flex items-center gap-1">
//                   <Waves className="w-4 h-4 text-blue-500" />
//                   <span className="font-semibold text-xs">
//                     <span className="font-bold text-xs">Humidity: </span>
//                     {day.humidity}%
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Gauge className="w-4 h-4 text-green-500" />
//                   <span className="font-semibold text-xs">
//                     <span className="font-bold text-xs">Pressure: </span>
//                     {day.pressure} hPa
//                   </span>
//                 </div>
//               </div>
//               <div className="flex items-start gap-5 justify-between p-3">
//                 <div className="flex items-center gap-1">
//                   <Wind className="w-4 h-4 text-gray-500" />
//                   <span className="font-semibold text-xs">
//                     <span className="font-bold text-xs">Wind Speed: </span>
//                     {day.windSpeed} km/h
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Wind className="w-4 h-4 text-gray-500" />
//                   <span className="font-semibold text-xs">
//                     <span className="font-bold text-xs">Gusts: </span>
//                     {day.gustSpeed} km/h
//                   </span>
//                 </div>
//               </div>
//               <div className="flex items-start gap-5 justify-between p-3">
//                 <div className="flex items-center gap-1">
//                   <Cloud className="w-4 h-4 text-gray-500" />
//                   <span className="font-semibold text-xs">
//                     <span className="font-bold text-xs">Cloud Cover: </span>
//                     {day.clouds}%
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Waves className="w-4 h-4 text-blue-500" />
//                   <span className="font-semibold text-xs">
//                     <span className="font-bold text-xs">Visibility: </span>
//                     {formatVisibility(day.visibility)}
//                   </span>
//                 </div>
//               </div>
//             </div>{" "}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

import { Cloud, Gauge, Waves, Wind } from "lucide-react";
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
      <div className="overflow-x-auto flex gap-4 mt-4 pb-2 scrollbar-hide justify-start">
        {forecastList.slice(0, 9).map((hour, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-b from-[#00c6ff] to-[#0072ff] text-white min-w-[6.25rem] rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center transition hover:scale-105 duration-300"
          >
            <p className="text-sm font-semibold">
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
  visibility: number;
  name?: string;
  country?: string;
}

interface Forecast {
  city: any;
  list: WeatherItem[];
}

export const WeeklyForecast: React.FC<{
  forecast: Forecast;
  monthly: boolean;
}> = ({ forecast, monthly }) => {
  const formatVisibility = (meter: number) => {
    const miles = meter / 1609.34;
    return miles.toFixed(2) + " mi";
  };

  const getDailyForecasts = () => {
    if (!forecast?.list) return [];

    return forecast.list.map((item) => {
      const date = new Date(item.dt * 1000);
      return {
        date: date.toDateString(),
        maxTemp: item.main.temp_max,
        minTemp: item.main.temp_min,
        normalTemp: Math.round(item.main.feels_like),
        weather: item.weather[0],
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        visibility: item.visibility,
        clouds: item.clouds.all,
        windSpeed: item.wind.speed,
        gustSpeed: item.wind.gust,
        windDeg: item.wind.deg,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
      };
    });
  };

  const dailyForecasts = monthly
    ? getDailyForecasts().slice(0, 30)
    : getDailyForecasts().slice(0, 7);

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Weekly Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dailyForecasts.map((day, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center transition hover:scale-105 duration-300"
          >
            <p className="font-semibold text-gray-700 text-sm">
              {idx === 0
                ? "Today"
                : new Date(day.date).toLocaleDateString(undefined, {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              alt={day.description}
              className="w-16 h-16 my-2"
            />

            <p className="text-2xl font-semibold text-gray-800">
              {day.normalTemp}°C
            </p>
            <p className="text-gray-600 text-sm capitalize">
              {day.description}
            </p>

            <div className="w-full mt-4 px-2 text-sm text-left space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-blue-600">
                  <Waves className="w-4 h-4" />
                  <span className="text-xs font-semibold">
                    Humidity: {day.humidity}%
                  </span>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <Gauge className="w-4 h-4" />
                  <span className="text-xs font-semibold">
                    Pressure: {day.pressure} hPa
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-gray-600">
                  <Wind className="w-4 h-4" />
                  <span className="text-xs font-semibold">
                    Wind: {day.windSpeed} km/h
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Wind className="w-4 h-4" />
                  <span className="text-xs font-semibold">
                    Gusts: {day.gustSpeed} km/h
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-gray-600">
                  <Cloud className="w-4 h-4" />
                  <span className="text-xs font-semibold">
                    Clouds: {day.clouds}%
                  </span>
                </div>
                <div className="flex items-center gap-1 text-blue-600">
                  <Waves className="w-4 h-4" />
                  <span className="text-xs font-semibold">
                    Visibility: {formatVisibility(day.visibility)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
