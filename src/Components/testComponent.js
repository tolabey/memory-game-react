import React from 'react'
import {connect} from "react-redux";
import {utils} from "../Utils/utils.js";

class Test extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="App">
        <h1> test!!! </h1>
        <button onClick={utils.testUtil(this.props.dispatch)}>Redux Test</button>
        <div>{this.props.test}</div>

        <h1> Test!!! </h1>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    test: store.get("test", ""),
  };
}



export default connect(mapStateToProps)(Test);
