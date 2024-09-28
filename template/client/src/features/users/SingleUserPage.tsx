import React from "react";
import { useGetUserByIdQuery } from "../api/apiSlice";
import { useParams } from "react-router-dom";

const SingleUserPage = () => {
  const { userId } = useParams();

  const {
    data: user,
    error,
    isFetching,
    isSuccess,
    isError,
  } = useGetUserByIdQuery(Number(userId));

  let content: React.ReactNode;

  if (isFetching) {
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
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full object-cover mb-4"
            src={user.imageUrl}
            alt={`${user.username}'s profile`}
          />
          <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
          <p className="text-gray-600 mb-2">{user.email}</p>
          <span className="px-3 py-1 bg-blue-500 text-white rounded-full">
            {user.role}
          </span>
        </div>
      </div>
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

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">User</h1>
      {content}
    </div>
  );
};

export default SingleUserPage;
