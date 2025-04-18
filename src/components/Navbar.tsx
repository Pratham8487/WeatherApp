import { Search, CloudSun } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function OpenWeatherNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: { key: string }) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-6 px-3 shadow-md h-[5rem] fixed w-full top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-full">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <CloudSun
              className="w-8 h-8 mr-2 transform hover:rotate-12 transition-transform duration-300"
              style={{
                stroke: "url(#cloudGradient)",
              }}
            />

            <svg width="0" height="0">
              <defs>
                <linearGradient id="cloudGradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#f3f4f6" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-semibold text-lg bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text">
              WeatherApp
            </span>
          </Link>

          <div className="relative">
            <input
              type="text"
              placeholder="Weather in your city"
              className="bg-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-56 transition-all hover:bg-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`transition-colors duration-200 relative group py-2 ${
              isActivePath("/") ? "text-orange-400" : "hover:text-orange-400"
            }`}
          >
            <span>Home</span>
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform ${
                isActivePath("/")
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              } transition-transform duration-200`}
            ></span>
          </Link>

          <Link
            to="/dashboard"
            className={`transition-colors duration-200 relative group py-2 ${
              isActivePath("/dashboard")
                ? "text-orange-400"
                : "hover:text-orange-400"
            }`}
          >
            <span>Dashboard</span>
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform ${
                isActivePath("/dashboard")
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              } transition-transform duration-200`}
            ></span>
          </Link>

          <Link
            to="/maps"
            className={`transition-colors duration-200 relative group py-2 ${
              isActivePath("/maps")
                ? "text-orange-400"
                : "hover:text-orange-400"
            }`}
          >
            <span>Maps</span>
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform ${
                isActivePath("/maps")
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              } transition-transform duration-200`}
            ></span>
          </Link>

          <Link
            to="/monthly-forecast"
            className={`transition-colors duration-200 relative group py-2 ${
              isActivePath("/monthly-forecast")
                ? "text-orange-400"
                : "hover:text-orange-400"
            }`}
          >
            <span>Monthly Forecast</span>
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform ${
                isActivePath("/monthly-forecast")
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              } transition-transform duration-200`}
            ></span>
          </Link>

          <Link
            to="/help"
            className={`transition-colors duration-200 relative group py-2 ${
              isActivePath("/help")
                ? "text-orange-400"
                : "hover:text-orange-400"
            }`}
          >
            <span>Help</span>
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform ${
                isActivePath("/help")
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              } transition-transform duration-200`}
            ></span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-700"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {mobileMenuOpen && (
            <div className="absolute top-20 right-0 left-0 bg-gray-800 shadow-lg py-2 px-4 flex flex-col space-y-3">
              <Link
                to="/"
                className={`py-2 ${
                  isActivePath("/")
                    ? "text-orange-400"
                    : "hover:text-orange-400"
                }`}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`py-2 ${
                  isActivePath("/dashboard")
                    ? "text-orange-400"
                    : "hover:text-orange-400"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/maps"
                className={`py-2 ${
                  isActivePath("/maps")
                    ? "text-orange-400"
                    : "hover:text-orange-400"
                }`}
              >
                Maps
              </Link>
              <Link
                to="/monthly-forecast"
                className={`py-2 ${
                  isActivePath("/monthly-forecast")
                    ? "text-orange-400"
                    : "hover:text-orange-400"
                }`}
              >
                Monthly Forecast
              </Link>
              <Link
                to="/help"
                className={`py-2 ${
                  isActivePath("/help")
                    ? "text-orange-400"
                    : "hover:text-orange-400"
                }`}
              >
                Help
              </Link>
              <Link
                to="/login"
                className="bg-orange-500 hover:bg-orange-600 py-2 rounded text-center mt-2"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
