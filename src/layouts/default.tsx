import React, { Component } from "react";

export default class DefaultLayout extends Component {
  render() {
    return (
      <div className="flex flex-col w-full h-screen">
        <header className="bg-gray-500 py-4 shadow z-50">
          <h1 className="w-full m-auto text-4xl text-center ">📑 Notes App</h1>
        </header>
        <main className="flex-grow py-6 sm:px-6 lg:px-8 bg-gray-200 z-0">
          <section className="w-full md:w-5/6 mx-auto">
            <div className="px-4 py-4 sm:px-0">{this.props.children}</div>
          </section>
        </main>
      </div>
    );
  }
}
