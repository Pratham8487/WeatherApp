import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-20 text-red-500">
        <span className="font-bold text-red-700">404</span> - Page Not Found
      </h1>
      <p className="text-4xl font-bold text-center mt-20 text-red-500">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link to="/" className="text-blue-500 hover:underline">
        <p className="text-center mt-4 text-blue-500 hover:underline">
          Go back to Home Page
        </p>
      </Link>
    </div>
  );
}

export default NotFoundPage;
