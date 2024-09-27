import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-red-600 mb-4">
        404 Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, that page does not exist.
      </p>

      <p>
        <Link
          to="/"
          className="text-blue-600 hover:underline text-xl font-semibold"
        >
          Back to Home
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
