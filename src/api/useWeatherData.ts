import { useQuery } from "react-query";
import weatherInstance from "./WeatherApi";

const API_KEY = "fae4ccfef41762464a3ab758a1e46c03";

export const useWeatherData = (city: string, unit: string) => {
  const {
    data: weather,
    isLoading: weatherLoading,
    error: weatherError,
  } = useQuery({
    queryKey: ["currentWeather", city],
    queryFn: async () => {
      const { data } = await weatherInstance.get("/weather", {
        params: { q: city, units: unit, appid: API_KEY },
      });
      console.log("Weather data:", data);
      return data;
    },
  });

  const {
    data: forecast,
    isLoading: forecastLoading,
    error: forecastError,
  } = useQuery({
    queryKey: ["forecast", city],
    queryFn: async () => {
      const { data } = await weatherInstance.get("/forecast", {
        params: { q: city, units: unit, appid: API_KEY },
      });
      console.log("Forecast data:", data);
      return data;
    },
  });

  return {
    weather,
    weatherLoading,
    weatherError,
    forecast,
    forecastLoading,
    forecastError,
  };
};
export const useWeatherByCoordinates = (lat: number, lon: number) => {
  const {
    data: weather,
    isLoading: weatherLoading,
    error: weatherError,
  } = useQuery(
    ["weather", lat, lon],
    async () => {
      const response = await weatherInstance.get("/weather", {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: "metric",
        },
      });
      console.log("Weather data by coordinates:", response.data);
      return response.data;
    },
    {
      enabled: !!lat && !!lon,
    }
  );

  const {
    data: forecast,
    isLoading: forecastLoading,
    error: forecastError,
  } = useQuery(
    ["forecast", lat, lon],
    async () => {
      const { data } = await weatherInstance.get("/forecast", {
        params: {
          lat,
          lon,
          exclude: "minutely,hourly",
          units: "metric",
          appid: API_KEY,
        },
      });
      console.log("Forecast data:", data);
      return data;
    },
    {
      enabled: !!lat && !!lon,
    }
  );
  return {
    weather,
    weatherLoading,
    weatherError,
    forecast,
    forecastLoading,
    forecastError,
  };
};
