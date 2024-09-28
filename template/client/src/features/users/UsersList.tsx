import React, { useMemo } from "react";
import { useGetUsersQuery, UserState } from "../api/apiSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const {
    data: users = [],
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetUsersQuery();

  let content: React.ReactNode;

  const sortedUsers = useMemo(() => {
    const sortedUsers = users
      .slice()
      .sort((a: UserState, b: UserState) =>
        a.username.localeCompare(b.username)
      );
    return sortedUsers;
  }, [users]);
  //   const sortedUsers = users;

  if (isLoading) {
    content = (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-blue-600 animate-spin">
          Loading...
        </div>
      </div>
    );
  } else if (isError) {
    content = (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-red-600">
          Error: {error.toString()}
        </div>
      </div>
    );
  } else if (isSuccess) {
    content = (
      <ul className="space-y-4">
        {sortedUsers.map((user: UserState) => (
          <li
            key={user.id}
            className="p-4 border-b border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300"
          >
            <Link to={`/users/${user.id}`}>
              <div className="text-xl font-semibold">{user.username}</div>
            </Link>
          </li>
        ))}
      </ul>
    );
  } else {
    content = (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-red-600">
          Something went wrong.
        </div>
      </div>
    );
  }

  console.log(users);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">User List</h2>
      {content}
    </div>
  );
};

export default UsersList;
