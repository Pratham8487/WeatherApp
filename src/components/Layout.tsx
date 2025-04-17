import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className=" bg-white">
      <Navbar />
      <main className="flex-grow px-4 py-24">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
