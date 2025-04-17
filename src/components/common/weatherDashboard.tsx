import {
  useState,
  Key,
  useEffect,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { useWeatherData } from "../../api/useWeatherData";

const WeatherDashboard = () => {
  const [city, setCity] = useState("Ahmedabad");
  const [searchTerm, setSearchTerm] = useState("Ahmedabad");
  const [unit] = useState("metric");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setCity(searchTerm);
  };
  const {
    weather,
    weatherLoading,
    weatherError,
    forecast,
    forecastLoading,
    forecastError,
  } = useWeatherData(city, unit);

  const isLoading = weatherLoading || forecastLoading;
  const error = weatherError || forecastError;

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setCity("Ahmedabad");
        setSearchTerm("Ahmedabad");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  const getDayName = (date: string | number | Date) =>
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(date).getDay()];

  const formatTime = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const getCurrentDate = () => {
    const now = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[now.getMonth()]} ${now.getDate()}, ${formatTime(
      now.getTime() / 1000
    )}`;
  };

  const getDailyForecasts = () => {
    if (!forecast) return [];
    const dailyData: Record<
      string,
      {
        date: string;
        day: string;
        month: number;
        maxTemp: number;
        minTemp: number;
        weather: {
          icon: any;
          description: string;
        };
        description: string;
      }
    > = {};

    return forecast?.list?.map(
      (item: {
        dt: number;
        main: { temp_max: any; temp_min: any };
        weather: {
          [x: string]: any;
          description: any;
        }[];
      }) => {
        const date = new Date(item.dt * 1000).toDateString();
        return {
          date,
          day: getDayName(date),
          month: new Date(item.dt * 1000).getDate(),
          maxTemp: item.main.temp_max,
          minTemp: item.main.temp_min,
          weather: {
            icon: item.weather[0].icon,
            description: item.weather[0].description,
          },
          description: item.weather[0].description,
        };
      }
    );

    return Object.values(dailyData).slice(0, 7);
  };

  const getHourlyForecast = () => {
    if (!forecast) return [];
    return forecast.list.slice(0, 8);
  };

  const getHourlyTempRange = () => {
    if (!forecast || forecast.list.length === 0) return { min: 20, max: 40 };
    const temps = forecast.list
      .slice(0, 8)
      .map((item: { main: { temp: number } }) => item.main.temp);
    const min = Math.floor(Math.min(...temps)) - 2;
    const max = Math.ceil(Math.max(...temps)) + 2;
    return { min, max };
  };

  const dailyForecasts = getDailyForecasts().slice(0, 7);
  const hourlyForecasts = getHourlyForecast();
  const tempRange = getHourlyTempRange();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-3xl">
        Loading weather data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-3xl">
        Failed to fetch weather data... The city name might be incorrect...
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 font-sans">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Weather Dashboard
          </h1>
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter city name"
              className="border border-gray-300 rounded-l px-4 py-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
            >
              Search
            </button>
          </form>
        </div>
        <div className="mb-4">
          <div className="text-gray-500 text-sm">{getCurrentDate()}</div>
          <div className="text-2xl font-bold">
            {weather.name}, {weather.sys.country}
            <span className="text-sm text-gray-500 font-semibold">
              {" "}
              (Lat: {weather.coord.lat})
            </span>
            <span className="text-sm text-gray-500 font-semibold">
              {" "}
              (Lon: {weather.coord.lon})
            </span>
          </div>
        </div>

        <div className="flex justify-between mb-8">
          <div>
            <div className="text-6xl text-red-500">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="text-gray-600">
              Feels like {Math.round(weather.main.feels_like)}°C.{" "}
              {weather.weather[0].main}. {weather.weather[0].description}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center">
                  <span className="mr-2">→</span> {weather.wind.speed} m/s W
                </div>
                <div>Humidity: {weather.main.humidity}%</div>
                <div>
                  Dew point:{" "}
                  {Math.round(
                    weather.main.temp - (100 - weather.main.humidity) / 5
                  )}
                  °C
                </div>
              </div>
              <div>
                <div>
                  UV:{" "}
                  {weather.clouds?.all
                    ? Math.round(10 - weather.clouds.all / 10)
                    : "N/A"}
                </div>
                <div>Pressure: {weather.main.pressure}hPa</div>
                <div>
                  Visibility: {(weather.visibility / 1000).toFixed(1)}km
                </div>
              </div>
              <div className="text-gray-500 text-sm font-semibold">
                Lat: {weather.coord.lat}
              </div>
              <div className="text-gray-500 text-sm font-semibold">
                Lon: {weather.coord.lon}
              </div>
            </div>
          </div>

          <div className="w-1/2">
            <div className="bg-white p-4 rounded shadow">
              <div className="h-6 bg-gray-100 rounded flex">
                {Array(12)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 text-xs text-center border-r border-gray-200 last:border-0"
                    ></div>
                  ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <div>now</div>
                <div>15min</div>
                <div>30min</div>
                <div>45min</div>
                <div>60min</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Hourly forecast
          </h2>
          <div className="relative bg-white p-4 rounded-lg">
            <div className="h-64 md:h-72">
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500 z-10">
                {Array.from({ length: 6 }, (_, i) => {
                  const range = tempRange.max - tempRange.min;
                  const step = range / 5;
                  return (
                    <div key={i} className="flex items-center">
                      <span className="pr-1">
                        {Math.round(tempRange.max - step * i)}°
                      </span>
                      <div className="h-px w-2 bg-gray-300"></div>
                    </div>
                  );
                })}
              </div>

              <div className="absolute left-6 right-0 top-0 bottom-8 flex flex-col justify-between">
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={i}
                    className="border-b border-gray-200 border-dashed w-full h-0"
                  ></div>
                ))}
              </div>

              <div className="absolute left-6 right-2 bottom-8 top-0">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 800 400"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="tempGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.7" />
                      <stop
                        offset="100%"
                        stopColor="#f97316"
                        stopOpacity="0.1"
                      />
                    </linearGradient>
                  </defs>

                  {hourlyForecasts.length > 0 && (
                    <>
                      <path
                        d={`
                          M0,${
                            400 -
                            ((hourlyForecasts[0]?.main.temp - tempRange.min) /
                              (tempRange.max - tempRange.min)) *
                              400
                          } 
                          ${hourlyForecasts
                            .map(
                              (item: { main: { temp: number } }, i: number) =>
                                `L${(i / (hourlyForecasts.length - 1)) * 800},${
                                  400 -
                                  ((item.main.temp - tempRange.min) /
                                    (tempRange.max - tempRange.min)) *
                                    400
                                }`
                            )
                            .join(" ")}
                          L${800},400 L0,400 Z
                        `}
                        fill="url(#tempGradient)"
                      />

                      <path
                        d={`
                          M0,${
                            400 -
                            ((hourlyForecasts[0]?.main.temp - tempRange.min) /
                              (tempRange.max - tempRange.min)) *
                              400
                          } 
                          ${hourlyForecasts
                            .map(
                              (item: { main: { temp: number } }, i: number) =>
                                `L${(i / (hourlyForecasts.length - 1)) * 800},${
                                  400 -
                                  ((item.main.temp - tempRange.min) /
                                    (tempRange.max - tempRange.min)) *
                                    400
                                }`
                            )
                            .join(" ")}
                        `}
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {hourlyForecasts.map(
                        (
                          item: { main: { temp: number } },
                          i: Key | null | undefined
                        ) => (
                          <g key={i}>
                            <circle
                              cx={`${
                                ((typeof i === "number" ? i : 0) /
                                  (hourlyForecasts.length - 1)) *
                                800
                              }`}
                              cy={`${
                                400 -
                                ((item.main.temp - tempRange.min) /
                                  (tempRange.max - tempRange.min)) *
                                  400
                              }`}
                              r="5"
                              fill="#f97316"
                              stroke="#fff"
                              strokeWidth="2"
                            />
                            <text
                              x={`${
                                ((typeof i === "number" ? i : 0) /
                                  (hourlyForecasts.length - 1)) *
                                800
                              }`}
                              y={`${
                                400 -
                                ((item.main.temp - tempRange.min) /
                                  (tempRange.max - tempRange.min)) *
                                  400 -
                                15
                              }`}
                              textAnchor="middle"
                              fill="#f97316"
                              fontSize="12"
                              fontWeight="bold"
                            >
                              {Math.round(item.main.temp)}°
                            </text>
                          </g>
                        )
                      )}
                    </>
                  )}
                </svg>
              </div>
            </div>

            <div className="flex justify-between mt-2 px-6">
              {hourlyForecasts.map(
                (
                  item: { dt: any; weather: any },
                  i: Key | null | undefined
                ) => (
                  <div
                    key={i}
                    className="text-center flex flex-col items-center"
                  >
                    {/* <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt={item.weather[0].description}
                      className="w-8 h-8"
                    /> */}
                    <div className="text-sm font-medium">
                      {formatTime(item.dt).slice(0, -3)}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Weekly forecast
          </h2>
          <div className="space-y-4">
            {dailyForecasts.map(
              (
                day: {
                  date: string | number | Date;
                  weather: { icon: any };
                  description:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | Promise<
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactPortal
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                  maxTemp: number;
                  minTemp: number;
                },
                i: Key | null | undefined
              ) => (
                <div
                  key={i}
                  className="flex border-b border-gray-300 pb-3 items-center justify-between"
                >
                  <div className="w-32">
                    {i === 0
                      ? "Today"
                      : new Date(day.date).toLocaleDateString(undefined, {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                  </div>
                  <div className="flex items-center">
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather.icon}.png`}
                      alt={
                        typeof day.description === "string"
                          ? day.description
                          : String(day.description || "No description")
                      }
                      className="w-12 h-12 my-2"
                    />
                    <div className="w-24">
                      {Math.round(day.maxTemp)}°/{Math.round(day.minTemp)}°C
                    </div>
                  </div>
                  <div className="flex-1 text-right text-gray-500">
                    {day.description}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherDashboard;
