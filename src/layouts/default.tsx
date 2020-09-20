import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function DefaultLayout(props: { children: JSX.Element }) {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <div className="flex flex-col w-full h-screen">
      <header className="bg-gray-500 py-4 shadow z-50">
        <div className="flex w-full justify-center items-center">
          <h1 className="flex-grow w-full m-auto text-4xl text-center ">
            <span role="img" aria-label="note emoji">
              📑
            </span>
            Notes App
          </h1>
          <div
            className={`justify-end mr-6 px-2 ${
              isAuthenticated ? "flex" : "hidden"
            }`}
          >
            <button
              onClick={() => logout({ returnTo: "/" })}
              className="flex-shrink-0 font-medium py-1 px-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow  py-2 px-4 border py-6 sm:px-6 lg:px-8 bg-gray-200 z-0">
        <section className="w-full md:w-5/6 md:mx-auto">
          <div className="px-0 md:px-4 md:py-4">{props.children}</div>
        </section>
      </main>
    </div>
  );
}
