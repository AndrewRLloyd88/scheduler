import { useState } from "react";

//take in an initial mode (initialmode)
export default function useVisualMode(initialmode) {
  //set the mode state with the initial mode provided
  const [mode, setMode] = useState(initialmode);
  // we will need to keep track of the history of the modes, so we can go backwards.
  // We can store this history as a stateful array called history in our Hook
  const [history, setHistory] = useState([initialmode]);

  //adding the transitition function that will take in a new mode
  const transition = (newmode) => {
    //update the mode state to the newmode value
    setMode(newmode);
    // When transition is called, we need to add the new mode to our history.
    history.push(newmode);
    setHistory(history);
  };

  // back function allows us to go back to the previous mode.
  // When back is called, we should set the mode to the previous item in our history array.
  const back = () => {
    //We need to put a constraint on our back function. It should not allow the user to go back past the initial mode.
    //does our history array contain more than 1 item?
    // our history array will always need to have a length that is greater than 1.
    if (history.length > 1) {
      //remove the very last item from our history array
      history.pop();
      //setHistory to the only item at index 0
      setHistory(history);
      //update our state
      setMode(history[history.length - 1]);
    } else {
      //setMode to mode
      setMode(mode);
    }
  };

  // return an object with a mode property
  //add the transition property to the object that useVisualMode returns
  return { mode, transition, back };
}
