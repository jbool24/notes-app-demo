import React, { Component } from "react";

export default class DefaultLayout extends Component {
  render() {
    return (
      <div>
        <h1>Notes App</h1>
        {this.props.children}
      </div>
    );
  }
}
