import * as React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function HomePage() {
  const {
    error,
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    user
  } = useAuth0();
  if (error) {
    console.group(`JB User ERRORs`);
    console.error(`Err ${error}`);
    console.error(`Loading: ${isLoading}`);
    console.error(`Auth'd: ${isAuthenticated}`);
    console.error(`User Info: ${user}`);
    console.groupEnd();
  }

  if (!isAuthenticated)
    return (
      <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Please login to see the notes.
          </h2>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <button
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                onClick={loginWithRedirect}
              >
                Click to Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  return isLoading ? (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h3 className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
          Loading...
        </h3>
      </div>
    </div>
  ) : (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <Link
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          to="/notes"
        >
          Go to Notes.
        </Link>
      </div>
    </div>
  );
}
