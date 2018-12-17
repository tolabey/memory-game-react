import React, { Component} from "react";
import {Provider} from "react-redux";
import Picture from "./Components/Picture.js";
import Level from "./Components/Level.js";
import {createStore} from "redux";
import {reducer} from "../src/reduxStore/reducer.js";
import "./App.css";

class App extends Component{
  constructor(props) {
    super(props);
    this.store = createStore(reducer);
  }

  render(){
    return(
      <Provider store={this.store}>
        <div className="app">
          <Level/>
          <Picture/>
        </div>
      </Provider>
    );
  }
}

export default App;
