import React from 'react'
import {connect} from "react-redux";
import {action} from "../reduxStore/action";
import "./level.scss";
import {utils} from "../Utils/utils.js";



class Level extends React.Component{
  constructor(props){
    super(props);
  }

  startGame() {
    return () => {
      let imageList = [];
      this.props.start();
      let path = "";
      for(let i = 0; i < this.props.level; i++) {
        path = "../testImages_abstract/abstract_000" + (i + 1) + ".jpg";
        imageList.push({path, key: 1523 + i +1});
        imageList.push({path, key: 1523 - i - 1});
      }
      this.props.setImageList(utils.shuffle(imageList));
    }
  }

  render(){
    return !this.props.isStarted && (
      <div className="level-container">
        <input type="number" onChange={this.props.setLevel}/>
        <button onClick={this.startGame()}>START GAME</button>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    test: store.get("test", ""),
    isStarted: store.get("start", ""),
    level: store.get("level", 0),
    timer: store.get("timer", 3)
  };
}

function mapDispatchToProps(dispatch) {
  return{
    setLevel: (e) => dispatch(action("LEVEL", e.target.value)),
    start: function() {
      return dispatch(action("START", true))
    },
    setImageList: function (list) {
      return dispatch(action("IMAGELIST", list))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Level);
