import React from "react"
import {connect} from "react-redux";
import { action } from "../reduxStore/action.js";
import "./picture.scss";
import I from "immutable";

class Picture extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {
    if(this.props.isStarted) {
      let timer = setInterval(this.props.setTimer, 1000);

      this.props.setTimeInterval(timer);
    }
  }

  resetStatus() {
    return () => {
      this.props.resetTimer();
      let timer = setInterval(this.props.setTimer, 1000);
      this.props.setTimeInterval(timer);
      this.props.finishGame();
      this.props.resetLevel();
      this.props.resetImageList();
      this.props.resetSuccessImageMap();
    }
  }

  setChoosenImages(each) {
    return () => {
      const imageList = this.props.choosenImages;
      if(imageList.length == 2) {
        this.props.removeChoosenImages();
      }
      this.props.setChoosenImages({path: each.get("path"), key: each.get("key")})
      this.setScore(each)
    }
  }
  isChoosen(key) {
    const imageList = this.props.choosenImages;
    for(let i = 0; i < imageList.length; i++) {
      if(imageList[i].get("key") === key) {
        return true
      }
    }
    return false;
  }

  setScore(lastSelected) {
    const imageList = this.props.choosenImages;

    if(imageList.length == 1) {
      if(imageList[0].get("path") === lastSelected.get("path")) {
        this.props.setSuccessMap(imageList[0].get("key"), lastSelected.get("key"))
        this.props.setScore(50);
      } else {
        this.props.setScore(-40);
      }
    }
  }

  renderImages() {
    const imageList = this.props.imageList;
    return <div className="image-list" >{imageList.map(each => {
      return <div
        className={`one-image ${this.props.successMap.get(each.get("key")) ? "turn-off" : ""}`}
        key={each.get("key")}
        onClick={this.setChoosenImages(each)}
      ><img className={`${each.get("key")} ${(this.props.timer === 0 && !(this.isChoosen(each.get("key")))) ? "turn-off": ""}`} src={each.get("path")} alt=""/></div>
    })}</div>
  }

  render(){
    const isStarted = this.props.isStarted;
    return isStarted && (
      <div>
        <button onClick={this.resetStatus()}>RESET</button>
        <div className="timer">{this.props.timer}</div>
        <div>{"Score is:" + this.props.score}</div>
        <div className="picture-container">
          {this.renderImages()}
        </div>
      </div>

    )
  }

}

function mapStateToProps(store) {
  return {
    level: store.get("level", 0),
    isStarted: store.get("start", false),
    imageList: store.get("imagelist", []),
    timer: store.get("timer", 10),
    choosenImages: store.get("choosenImages", []),
    score: store.get("score", 0),
    successMap: store.get("successMap", I.Map())
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetLevel: () => dispatch(action("LEVEL", 0)),
    finishGame: function() {
      return dispatch(action("START", false))
    },
    resetImageList: function() {
      return dispatch(action("IMAGELIST", []))
    },
    setTimer: function() {
      return dispatch(action("TIMER"))
    },
    setTimeInterval: function (value) {
      return dispatch(action("TIMEINTERVAL", value))
    },
    resetTimer: function() {
      return dispatch(action("RESETTIMER"))
    },
    setChoosenImages: function(image) {
      return dispatch(action("CHOOSEN-IMAGES", image))
    },
    removeChoosenImages: function() {
      return dispatch(action("REMOVE-CHOOSEN-IMAGES"))
    },
    setScore: function(value) {
      return dispatch(action("SET-SCORE", value))
    },
    setSuccessMap: function(key1, key2) {
      return dispatch(action("SUCCEESS-MAP", {key1, key2}))
    },
    resetSuccessImageMap: function() {
      return dispatch(action("REMOVE-SUCCEESS-MAP"))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Picture);
