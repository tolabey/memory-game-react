import React, { Component} from "react";
import {Provider} from "react-redux";
import Test from "./Components/testComponent.js";
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
        <Test/>
      </Provider>
    );
  }
}

export default App;
