import Img from "../../assets/images/weather1.avif";
import WeatherDashboard from "../../components/common/weatherDashboard";

function HomePage() {
  return (
    <div className="">
      <div className="relative">
        <img
          src={Img}
          alt="Flower"
          className="w-full h-90 rounded-md opacity-85"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl text-orange-500 font-bold">WeatherApp</h1>
          <p className="text-4xl text-white font-bold">
            Weather forecasts, nowcasts and history in a fast and elegant way
          </p>
        </div>
      </div>
      <WeatherDashboard />
    </div>
  );
}

export default HomePage;
