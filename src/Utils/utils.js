import {action} from "../reduxStore/action";

export const utils = {
  testUtil(dispatch) {
    return () => {
      dispatch(action("TEST", 1));
    }
  },
  setLevel(dispatch) {
    return () => {
      dispatch(action("TEST", 1));
    }
  },
  shuffle(array) {
    let currentIndex = array.length;
    let tempValue;
    let randomIndex;

    while(currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempValue;
    }

    return array;
  },
  score(images){
    return e => {
      if(images.size === 2) {
        if(images[0].get("src") === images[1].get("src")) {
          console.log("scoree...")
        }
      } else {
        console.log("you did wrong something")
      }
    }

  }
}
