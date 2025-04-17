import { Facebook, Twitter, Instagram, Gem, X, Github  } from "lucide-react";
import { useState } from "react";

function Footer() {
  const [follow, setFollow] = useState("+Follow");
  return (
    <footer className="bg-white text-gray-500 font-semibold py-4 px-8 mt-auto">
       <div className="flex border-b border-gray-300 justify-between items-center py-4 container mx-auto px-4">
        <div>
          <h1>Get connected us on social media</h1>
        </div>
        <div className="flex space-x-4">
          <Facebook className="w-5 h-5 hover:text-blue-500 hover:scale-110 transition-all duration-300 ease-out" />
          <Twitter className="w-5 h-5 hover:text-blue-500 hover:scale-110 transition-all duration-300 ease-out" />
          <Instagram className="w-5 h-5 hover:text-blue-500 hover:scale-110 transition-all duration-300 ease-out" />
          <X className="w-5 h-5 hover:text-blue-500 hover:scale-110 transition-all duration-300 ease-out" />
          <Github className="w-5 h-5 hover:text-blue-500 hover:scale-110 transition-all duration-300 ease-out" />
        </div>
      </div>
      <div className="border-b border-gray-300 flex flex-cols justify-between px-8 items-center mt-4">
        <div className=" pb-4 w-60  px-2 break-normal">
          <h1 className="flex items-center text-lg font-bold mt-4">
            <Gem className="w-5 h-5 mr-1 hover:scale-110 transition-all duration-400 ease-out" />
            <span>OpenWeather</span>
          </h1>

          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
            diam lectus. Sed sit amet ipsum mauris.
          </p>
          <p className="mt-4">
            Follow us for updates and news!
            <span
              onClick={() =>
                setFollow(follow === "+Follow" ? "Followed..." : "+Follow")
              }
              className="inline-block cursor-pointer p-2 text-blue-500 hover:underline"
            >
              <span
                key={follow}
                className="block transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {follow}
              </span>
            </span>
          </p>
        </div>

        <div className=" pb-4 w-60  px-2 break-normal">
          <h1 className="flex items-center text-lg font-bold mt-4">
            <span className="uppercase">Contact Us</span>
          </h1>
          <p className="mt-4">
            For inquiries, please reach out to us at{" "}
            <span className="text-blue-500 hover:underline hover:cursor-pointer">
              support@openweather.com
            </span>
          </p>
        </div>

        <div className=" pb-4 w-60  px-2 break-normal">
          <h1 className="flex items-center text-lg font-bold mt-4">
            <span className="uppercase">About Us</span>
          </h1>
          <p className="mt-4">
            We are a team of passionate individuals dedicated to providing the
            best weather data and services.
          </p>
        </div>

        <div className="pb-4 w-60 px-2 break-normal">
          <h1 className="flex items-center text-lg font-bold mt-4">
            <span className="uppercase">API Format</span>
          </h1>
          <ul className="mt-4 space-y-2">
            {["JSON", "XML", "CSV", "YAML"].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 px-3 py-2 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-blue-300" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center p-4 container mx-auto px-4 flex justify-between items-center">
        <p className="">&copy; 2025 OpenWeather. All rights reserved.</p>
        <div className="flex space-x-0.5">
          <p className=" hover:text-blue-400 hover:underline hover:cursor-pointer">
            Terms of Service
          </p>
          <p className=" hover:text-blue-400 hover:underline hover:cursor-pointer">
            | Privacy Policy
          </p>
          <p className=" hover:text-blue-400 hover:underline hover:cursor-pointer">
            | Cookie Policy
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
