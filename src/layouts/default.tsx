import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class DefaultLayout extends Component {
  render() {
    return (
      <div className="flex flex-col w-full h-screen">
        <header className="bg-gray-500 py-4 shadow z-50">
          <Link to="/">
            <h1 className="w-full m-auto text-4xl text-center ">
              <span role="img" aria-label="note emoji">
                📑
              </span>
              Notes App
            </h1>
          </Link>
        </header>
        <main className="flex-grow py-6 sm:px-6 lg:px-8 bg-gray-200 z-0">
          <section className="w-full md:w-5/6 md:mx-auto">
            <div className="px-0 md:px-4 md:py-4">{this.props.children}</div>
          </section>
        </main>
      </div>
    );
  }
}
