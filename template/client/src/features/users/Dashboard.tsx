import { useAppSelector } from "../../app/hooks";
import { selectAuthStatus, selectCurrentUser } from "../auth/authSlice";

const Dashboard = () => {
  const authStatus = useAppSelector(selectAuthStatus);
  const currentUser = useAppSelector(selectCurrentUser);
  if (!currentUser || authStatus === "loading") {
    return (
      <div className="flex items-center mt-10 justify-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 border-8 border-orange-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
          <p className="text-lg font-semibold text-orange-600 mt-4">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 text-center py-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg text-gray-700 mb-6">
        Welcome, {currentUser?.username}
      </p>
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <img
        src={currentUser?.imageUrl}
        alt="Profile"
        className="w-32 h-32 mx-auto rounded-full mb-4"
      />
      <p className="text-lg mb-2"> {currentUser?.username}</p>
      <p className="text-lg mb-2"> {currentUser?.email}</p>
      <p className="text-lg mb-2"> {currentUser?.role}</p>
    </section>
  );
};

export default Dashboard;
