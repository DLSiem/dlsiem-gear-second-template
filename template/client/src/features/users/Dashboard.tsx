import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Dashboard = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const currentUser = auth.currentUser;

  if (auth.status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Welcome, {currentUser?.username}</p>
      <h2>Profile</h2>
      <img src={currentUser?.imageUrl} alt="Profile" />
      <p>Username: {currentUser?.username}</p>
      <p>Email: {currentUser?.email}</p>
      <p>Role: {currentUser?.role}</p>
    </section>
  );
};

export default Dashboard;
